const connection = require("../db/Connection");
const Cart = connection.Cart;
const Products = connection.Products;

const addToCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  const data = req.body;
  try {
    const cartData = await Cart.create({
      productId,
      quantity: data.quantity,
      userId,
    });
    return res.status(200).json({ status: true, message: "Added to cart" });
  } catch (err) {
    throw err;
  }
};

const getCart = async (req, res) => {
  try {
    const data = await Cart.findAll({
      where: { userId: req.params.userId },
      include: Products,
    });
    return res.json({ data });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const deleteFromCart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.params.userId;
  const query = await Cart.findOne({ where: { productId, userId } });

  if (!query) {
    return res.status(404).json({ status: false, message: "Product not found!!!" });
  }

  try {
    const remCart = await Cart.destroy({ where: { productId, userId } });
    return res.status(200).json({ status: true, message: "Product removes successfully!!" });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const emptyCart = async (req, res) => {
  const query = await Cart.findOne({ where: { userId } });

  if (!query) {
    return res.status(404).json({ status: false, message: "Cart not found!!" });
  }

  try {
    const empty = await CartItems.destroy({ where: { cartId } });
    return res.status(200).json({ status: true, message: "Cart empty!!" });
  } catch (err) {
    return res.status(500).json({ status: err.message });
  }
};

module.exports = { addToCart, getCart, deleteFromCart, emptyCart };
