import express from 'express';
import { requireSingin, isAdmin } from '../middlewares/auth.js';
import { create, update, remove, list, read, productsByCategory } from '../controllers/category.js';
import { Joi, celebrate } from 'celebrate';
const router = express.Router();

router.post(
  '/category',
  requireSingin,
  isAdmin,
  celebrate(
    {
      body: Joi.object().keys({ name: Joi.string().required() })
    },
    { abortEarly: false }
  ),
  create
);
router.put(
  '/category/:categoryId',
  requireSingin,
  isAdmin,
  celebrate(
    {
      body: Joi.object().keys({ name: Joi.string().required(), categoryId: Joi.required() })
    },
    { abortEarly: false }
  ),
  update
);
router.delete('/category/:categoryId', requireSingin, isAdmin, remove);
router.get('/category/:slug', read);
router.get('/categories', list);
router.get('/products-category/:slug', productsByCategory);

export default router;
