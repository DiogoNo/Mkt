import User from '../models/user.js';
import { comparePassword, hashPassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Order from '../models/order.js';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name.trim()) {
      return res.json({ error: 'name is required' });
    }
    if (!email.trim()) {
      return res.json({ error: 'email is required' });
    } else {
      const equalsEmail = await User.findOne({ email });
      if (equalsEmail) {
        return res.json({ error: 'email is taken' });
      }
    }
    if (!password || password.length < 6) {
      return res.json({ error: 'password Invalid' });
    } else {
      const hash = await hashPassword(password);
      const user = await new User({ name, email, password: hash, address: '' }).save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({
        user: { name: user.name, email: user.email, role: user.role, address: user.address },
        token
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const logout = (_, res) => {
  res.clearCookie('token');
  return res.end();
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim()) {
      return res.json({ error: 'email is required' });
    }
    if (!password || password.length < 6) {
      return res.json({ error: 'password Invalid' });
    } else {
      const equalsEmail = await User.findOne({ email });
      if (!equalsEmail) {
        return res.json({ error: 'user not found' });
      }

      const match = await comparePassword(password, equalsEmail.password);
      if (!match) {
        return res.json({ error: 'user not founde' });
      }

      const token = jwt.sign({ _id: equalsEmail._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true, expiresIn: '7d' });
      res.json({
        user: {
          name: equalsEmail.name,
          email: equalsEmail.email,
          role: equalsEmail.role,
          address: equalsEmail.address
        },
        token
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const { name, password, address } = req.body;
    const user = await User.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({ error: 'password Invalid' });
    }
    const hash = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hash || user.password,
        address: address || user.address
      },
      { new: true }
    );
    updated.password = undefined;
    res.json(updated);
  } catch (error) {}
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

export const orders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('products', '-photo')
      .populate('buyer', 'name');
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('products', '-photo')
      .populate('buyer', 'name')
      .sort({ createdAt: '-1' });
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};
