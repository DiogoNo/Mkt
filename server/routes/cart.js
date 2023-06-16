import express from 'express';
import { requireSingin, isAdmin } from '../middlewares/auth.js';
import { create } from '../controllers/cart.js';
const router = express.Router();

router.post('/cart', create);

export default router;
