import express from 'express';
import { requireSingin, isAdmin } from '../middlewares/auth.js';
import {
  create,
  update,
  remove,
  list,
  read,
  photo,
  filteredProducts,
  productsCount,
  productsPagination,
  productsSearch,
  productsByCategory,
  getToken,
  processPay,
  changeStatus
} from '../controllers/product.js';
import formidable from 'express-formidable';
import { Joi, celebrate } from 'celebrate';
import { productSchema } from './schemaValidations/products.js';
const router = express.Router();

router.post('/product', requireSingin, isAdmin, formidable(), productSchema(), create);
router.put(
  '/product/:productId',
  requireSingin,
  isAdmin,
  formidable(),
  celebrate(
    {
      body: Joi.object().keys({
        fields: {
          name: Joi.string().required(),
          descrption: Joi.required(),
          price: Joi.number().required(),
          category: Joi.required(),
          quantity: Joi.number().required()
        }
      })
    },
    { abortEarly: false }
  ),
  update
);
router.delete('/product/:productId', requireSingin, isAdmin, remove);
router.get('/product/:slug', read);
router.get('/products', list);
router.get('/product/photo/:productId', photo);
router.post('/products-filtered', filteredProducts);
router.get('/products-count', productsCount);
router.get('/products/:page', productsPagination);
router.get('/products/search/:keyword', productsSearch);
router.get('/products/:productId/:categoryId', productsByCategory);

router.get('/braintree/token', getToken);
router.post('/braintree/payment', requireSingin, processPay);
router.put('/order-status/:orderId', requireSingin, isAdmin, changeStatus);

export default router;
