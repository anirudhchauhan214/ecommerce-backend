const connection = require("../db/Connection");
const Products = connection.Products;
const User = connection.Users;
const Category = connection.Category;

const addProducts = async (req, res) => {
  let data = req.body;
  const userId = req.params.userId;
  const paths = await req.files.map((file) => ({ fileName: file.filename, filePath: file.path }));

  try {
    const productData = await Products.create({
      ...data,
      userId,
      categoryId: data.categoryId,
      images: paths,
    });
    const response = {
      status: true,
      message: "Product added successfully!!",
      data: { userId, ...productData.dataValues },
    };
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).send({ status: false, message: err.message });
  }
};

// fetch products with pagination
const getAllProducts = async (req, res) => {
  const limit = req.query.limit ? req.query.limit : 4;
  const offset = req.query.skip ? req.query.skip : 2;

  try {
    const data = await Products.findAndCountAll({
      include: [{ model: connection.Users }],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({ status: true, message: "Products fetched successfully", data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
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
