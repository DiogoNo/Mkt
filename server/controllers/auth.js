import User from '../models/user.js';
import { comparePassword, hashPassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
      const user = await new User({ name, email, password: hash }).save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({
        user: { name: user.name, email: user.email, role: user.role, address: user.address },
        token
      });
    }
  } catch (err) {
    console.log(err);
  }
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
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};
