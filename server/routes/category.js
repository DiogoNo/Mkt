import express from 'express';
import { requireSingin, isAdmin } from '../middlewares/auth.js';
import { create, update, remove, list, read } from '../controllers/category.js';
const router = express.Router();

router.post('/category', requireSingin, isAdmin, create);
router.put('/category/:categoryId', requireSingin, isAdmin, update);
router.delete('/category/:categoryId', requireSingin, isAdmin, remove);
router.get('/category/:slug', read);
router.get('/categories', list);

export default router;
