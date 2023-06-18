import slugify from 'slugify';
import braintree from 'braintree';
import fs from 'fs';
import Product from '../models/product.js';
import Order from '../models/order.js';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_KEY);

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_MERCHANT_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_MERCHANT_ID_PRIVATE_KEY
});

export const create = async (req, res) => {
  try {
    const { fields, files } = req;
    const product = new Product({ ...fields, slug: slugify(fields.name) });
    product.photo.data = fs.readFileSync(files.photo.path);
    product.photo.contentType = files.photo.type;
    await product.save();
    res.json(product);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const { fields, files } = req;
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { ...fields, slug: slugify(fields.name) },
      { new: true }
    )
      .select('-photo')
      .populate('category');

    product.photo.data = fs.readFileSync(files.photo.path);
    product.photo.contentType = files.photo.type;

    await product.save();
    res.json(product);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const remove = async (req, res) => {
  try {
    const { productId } = req.params;
    const removed = await Product.findByIdAndDelete(productId).select('-photo');
    res.json(removed);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Product.find({})
      .select('-photo')
      .populate('category')
      .sort({ createdAt: -1 });
    res.json(all);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select('-photo')
      .populate('category');
    res.json(product);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select('photo');
    if (product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      return res.send(product.photo.data);
    }
    res.json(product);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const productsPagination = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select('-photo')
      .skip((page - 1) * perPage)
      .limit(6)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    })
      .select('-photo')
      .limit(6)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const productsByCategory = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const products = await Product.find({
      _id: { $ne: productId },
      category: categoryId
    })
      .select('-photo')
      .populate('category')
      .limit(3);
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.json(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const processPay = async (req, res) => {
  try {
    const { nonce, cart } = req.body;

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true
        }
      },
      (err, result) => {
        if (result) {
          new Order({
            products: cart,
            payment: result,
            buyer: req.user._id
          }).save();

          const bulkOps = cart.map((item) => {
            return {
              updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -0, sold: +1 } }
              }
            };
          });

          Product.bulkWrite(bulkOps, {});
          res.json({ ok: true });
        } else {
          res.json(500).send(err);
        }
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true }).populate(
      'buyer',
      'email'
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: order.buyer.email,
      subject: 'Status do pedido atualziado',
      html: `<h1>status do pedido atualizado para ${status}</h1>`
    };

    try {
      await sgMail.send(emailData);
    } catch (error) {
      console.log(error);
    }

    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
