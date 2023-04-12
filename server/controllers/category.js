import Category from "../models/category.js"
import slugify from "slugify"
import { validateCreate,validateUpdate } from '../validators/category/categoryValidation.js';

export const create = async (req, res) => {
    try {
        const { name } = req.body;
        const error = await validateCreate({name});
        if (error.length > 0) {
            return res.json({ error });
        }
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (error) {
        return res.status(404).json(error)
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: 'Already exist' });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const update = async (req, res) => {
    try {
        const { name } = req.body
        const { categoryId } = req.params
        const error = await validateUpdate({name});
        if (error.length > 0) {
            return res.json({ error });
        }
        const category = await Category.findByIdAndUpdate(categoryId, {
            name, slug: slugify(name),
        }, { new: true });
        res.json(category);
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const remove = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const removed = await Category.findOneAndDelete(categoryId);
    res.json(removed);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (error) {
    return res.status(400).json(error);
  }
};
