const connection = require("../db/Connection");
const Cart = connection.Cart;

const addCart = async (req, res) => {
  //   const cartExists = await Cart.findOne({ where: { userId: req.params.userId } });
  //   if (cartExists) {
  //     return res.status(409).json({ status: false, message: "Only one cart is allowed." });
  //   }
  try {
    const cart = await Cart.create({ userId: req.params.userId });
    return res.status(200).json({ status: true, message: "Cart added!!" });
  } catch (err) {
    return res.status(500).json({ status: true, message: err.message });
  }
};

module.exports = { addCart };
