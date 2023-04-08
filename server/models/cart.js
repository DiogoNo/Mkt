import mongoose from 'mongoose';
import User from './user.js';

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: User
    },
    products: [],
    price: {
      type: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
