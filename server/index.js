import mongoose from 'mongoose';
import auth from './routes/auth.js';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import category from './routes/category.js';
import user from './routes/user.js';
import product from './routes/product.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

const app = express();

//db

mongoose.set('strictQuery', false);
dotenv.config();

mongoose
  .connect(process.env.BASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
  })
  .then(() => console.log('connect'))
  .catch((err) => console.log('foi nao', err));

//middlewares

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

// router

app.use('/api', auth);
app.use('/api', category);
app.use('/api', product);
app.use('/api', user);
app.use(errors());

app.listen(process.env.PORT || '5000', '0.0.0.0', () => {
  console.log('localhost:8000');
});
