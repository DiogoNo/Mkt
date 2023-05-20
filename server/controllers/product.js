import slugify from 'slugify';
import fs from 'fs';
import Product from '../models/product.js';

export const create = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        res.json({ error: 'Name is required' });
      case !description.trim():
        res.json({ error: 'description is required' });
      case !price.trim():
        res.json({ error: 'Price is required' });
      case !category.trim():
        res.json({ error: 'Category is required' });
      case !quantity.trim():
        res.json({ error: 'Quantity is required' });
      case !shipping.trim():
        res.json({ error: 'Shipping is required' });
      case photo && photo.size > 100000:
        res.json({ error: 'Shipping is required' });
    }

    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        res.json({ error: 'Name is required' });
      case !description.trim():
        res.json({ error: 'description is required' });
      case !price.trim():
        res.json({ error: 'Price is required' });
      case !category.trim():
        res.json({ error: 'Category is required' });
      case !quantity.trim():
        res.json({ error: 'Quantity is required' });
      case !shipping.trim():
        res.json({ error: 'Shipping is required' });
      case photo && photo.size > 100000:
        res.json({ error: 'Shipping is required' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    )
      .select('-photo')
      .populate('category');

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

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
      .limit(10)
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
  } catch (error) {
    res.status(400).json(error);
  }
};
