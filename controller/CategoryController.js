const connection = require("../db/Connection");
const Category = connection.Category;
const Products = connection.Products;

const getCategory = async (req, res) => {
  try {
    const data = await Category.findAll({ include: [{ model: Products }] });
    return res
      .status(200)
      .json({ status: true, message: "Categories Fetched Successfully.", data });
  } catch (err) {
    throw err;
  }
};

const getSingleCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Category.findOne({ where: { id }, include: Products });
    if (!data) {
      return res.status(404).json({ status: false, message: "Category not found!!" });
    }
    return res.status(200).json({ status: true, message: "Category fetched successfully!!", data });
  } catch (err) {
    throw err;
  }
};

const addCategory = async (req, res) => {
  const data = req.body;
  const userId = req.params.userId;

  if (data.title == "" || data.title == null) {
    return res.status(404).json({ status: false, message: "Please enter a title" });
  }

  try {
    const alreadyExists = await Category.findAll({ where: { title: data.title } });
    if (alreadyExists.length > 0) {
      return res.status(409).json({
        status: false,
        message: "Category name already exists!! Try with different title",
      });
    } else {
      const category = await Category.create({ ...data, userId });
      return res.status(200).json({ status: true, message: "Category added successfully!!" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const categoryExists = await Category.findOne({ where: { id } });
    if (categoryExists) {
      const deleteCategory = await Category.destroy({ where: { id } });
      return res.status(200).json({ status: true, message: "Category deleted successfully!!" });
    } else {
      return res.status(404).json({ status: true, message: "User Not Found !!" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

module.exports = { getCategory, addCategory, getSingleCategory, deleteCategory };
