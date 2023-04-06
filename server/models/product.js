import mongoose from "mongoose";
import category from "./category.js";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: category
    },
    price: {
        type: Number,
    },

}, { timestamps: true });

export default mongoose.model("Cart", productSchema);
