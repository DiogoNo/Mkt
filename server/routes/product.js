import express from 'express';
import { requireSingin, isAdmin } from '../middlewares/auth.js';
import { create, update, remove, list, read } from "../controllers/product.js"
const router = express.Router();


router.post('/product', requireSingin, isAdmin, create);
router.put('/product/:productId', requireSingin, isAdmin, update);
router.delete('/product/:productId', requireSingin, isAdmin, remove);
router.get('/product/:slug', read)
router.get('/products', list);


export default router;