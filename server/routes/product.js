import express from 'express';
import { requireSingin, isAdmin } from '../middlewares/auth.js';
import {
  create,
  update,
  remove,
  list,
  read,
  photo,
  filteredProducts
} from '../controllers/product.js';
import formidable from 'express-formidable';
const router = express.Router();

router.post('/product', requireSingin, isAdmin, formidable(), create);
router.put('/product/:productId', requireSingin, isAdmin, formidable(), update);
router.delete('/product/:productId', requireSingin, isAdmin, remove);
router.get('/product/:slug', read);
router.get('/products', list);
router.get('/product/photo/:productId', photo);
router.post('/products-filtered', filteredProducts);

export default router;
