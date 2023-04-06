import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
    },
    category: {
        type: ObjectId,
        ref: "Categoty",
        required: true,
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }


}, { timestamps: true });

export default mongoose.model("Product", productSchema);
