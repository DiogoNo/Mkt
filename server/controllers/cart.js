import Cart from '../models/cart.js';

export const create = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.json({
        error: 'User not exist'
      });
    }
    const cart = await new Cart({ user: user }).save();
    res.json(cart);
  } catch (error) {
    return res.status(404).json(error);
  }
};
