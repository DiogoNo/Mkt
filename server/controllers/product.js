import slugify from "slugify"
import fs from "fs";
import Product from "../models/product.js"

export const create = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        switch (true) {
            case !name.trim():
                res.json({ error: "Name is required" });
            case !description.trim():
                res.json({ error: "description is required" })
            case !price.trim():
                res.json({ error: "Price is required" })
            case !category.trim():
                res.json({ error: "Category is required" })
            case !quantity.trim():
                res.json({ error: "Quantity is required" })
            case !shipping.trim():
                res.json({ error: "Shipping is required" })
            case photo && photo.size > 100000:
                res.json({ error: "Shipping is required" })
        }

        const product = new Product({ ...req.fields, slug: slugify(name) })

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save()
        res.json(product)

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

