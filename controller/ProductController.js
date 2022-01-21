const connection = require("../db/Connection");
const Products = connection.Products;
const User = connection.Users;
const Category = connection.Category;

const addProducts = async (req, res) => {
  let data = req.body;
  const userId = req.params.userId;

  if (
    data.title == "" ||
    data.title == null ||
    data.description == null ||
    data.price == null ||
    data.description == "" ||
    data.price == "" ||
    data.categoryId == null ||
    data.categoryId == ""
  ) {
    return res.status(404).send({ status: false, message: "Please fill the form correctly!!" });
  }

  try {
    const query = await Products.findAll({
      where: { title: data.title, price: data.price, userUserId: userId },
    });
    if (query.length > 0) {
      return res
        .status(409)
        .json({ status: false, message: "Product with same name already exists!!" });
    }

    const productData = await Products.create({ ...data, userUserId: userId });
    const response = {
      status: true,
      message: "Product added successfully!!",
      data: { userId: userId, ...productData.dataValues },
    };
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).send({ status: false, message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  const data = await Products.findAll({ include: [{ model: connection.Users }] });
  return res.status(200).json({ status: true, message: "Products fetched successfully", data });
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Products.findOne({
      where: { id },
      include: [{ model: User }, { model: Category }],
    });
    if (product) {
      return res.status(200).json({
        status: true,
        message: "Product fetched successfully!!",
        data: product.dataValues,
      });
    } else {
      return res.status(404).json({ status: false, message: "Product not found!" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const productExists = await Products.findOne({ where: { id } });
    if (productExists) {
      const deleteProduct = await Products.destroy({ where: { id } });
      return res.status(200).json({ status: true, message: "Product deleted successfully!!" });
    } else {
      return res.status(404).json({ status: true, message: "Product Not Found !!" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    if (
      data.title == "" ||
      data.title == null ||
      data.description == null ||
      data.description == "" ||
      data.price == null ||
      data.price == "" ||
      data.category == null ||
      data.category == ""
    ) {
      return res.status(404).send({ status: false, message: "Please fill the form correctly!!" });
    } else {
      const updatedProduct = await Products.update(data, { where: { id } });
      const productData = await Products.findOne({ where: { id } });
      return res.status(200).json({
        status: true,
        message: "Product updated successfully!!",
        data: productData.dataValues,
      });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { addProducts, deleteProduct, getAllProducts, updateProduct, getSingleProduct };
