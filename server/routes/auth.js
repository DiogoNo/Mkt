import express from 'express';
import { login, register, secret } from '../controllers/auth.js';
import { requireSingin, isAdmin } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/auth-check', requireSingin, (req, res) => {
  res.json({ ok: true });
});

router.get('/secret', requireSingin, isAdmin, secret);

export default router;
