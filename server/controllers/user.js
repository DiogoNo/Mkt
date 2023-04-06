import User from "../models/user.js";

export const list = async (req, res) => {
    try {
        const all = await User.find({});
        res.json(all)
    } catch (error) {
        return res.status(400).json(error)
    }
}