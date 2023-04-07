import User from "../models/user.js";
import { hashPassword } from "../helpers/auth.js";
import jwt from 'jsonwebtoken';
import { validateLoginFields,validateRegisterFields } from '../validators/auth/authValidation.js';
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const error = await validateRegisterFields({ name, email, password });
        if (error.length > 0) {
            return res.json({ error });
        }
        const hash = await hashPassword(password);
        const user = await new User({ name, email, password: hash }).save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ user: { name: user.name, email: user.email, role: user.role, address: user.address }, token });
      } catch (err) {
        console.log(err);
      }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const error = await validateLoginFields({ email, password });
      if (error.length > 0) {
        return res.json({ error });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ user: { name: user.name, email: user.email, role: user.role, address: user.address }, token });
    } catch (err) {
      console.log(err);
    }
  };

export const secret = async (req, res) => {
    res.json({ currentUser: req.user })
}


