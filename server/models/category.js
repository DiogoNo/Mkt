import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
