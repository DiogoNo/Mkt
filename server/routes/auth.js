import express from 'express';
import {
  login,
  register,
  secret,
  logout,
  profileUpdate,
  orders,
  allOrders
} from '../controllers/auth.js';
import { requireSingin, isAdmin } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/auth-check', requireSingin, (req, res) => {
  res.json({ ok: true });
});
router.get('/admin-check', requireSingin, isAdmin, (req, res) => {
  res.json({ ok: true });
});
router.put('/profile', profileUpdate);
router.get('/secret', requireSingin, isAdmin, secret);
router.get('/orders', requireSingin, orders);
router.get('/all-orders', requireSingin, isAdmin, allOrders);
export default router;
