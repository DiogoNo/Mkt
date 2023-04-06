import slugify from "slugify"
import Product from "../models/product.js"

export const create = async (req, res) => {
    try {

    } catch (error) {
        return res.status(404).json(error)
    }
}

export const update = async (req, res) => {
    try {

    } catch (error) {
        return res.status(400).json(error)
    }
}

export const remove = async (req, res) => {
    try {
        const { productId } = req.params
        const removed = await Product.findOneAndDelete(productId);
        res.json(removed);
    } catch (error) {

        return res.status(400).json(error)
    }
}

export const list = async (req, res) => {
    try {
        const all = await Product.find({});
        res.json(all)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const read = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        res.json(product)
    } catch (error) {

        return res.status(400).json(error)
    }
}

