import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const extractToken = (req) => {
  const { authorization } = req.headers;
  if (authorization) {
    return authorization;
  }
  const { token } = req.cookies;
  return token;
};

export const requireSingin = (req, res, next) => {
  try {
    const token = extractToken(req);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send('Unauthorized');
    } else {
      next();
    }
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
};
