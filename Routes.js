const express = require("express");

const route = express.Router();

const {
  validateToken,
  checkRole,
  productValidation,
  uploadFile,
} = require("./middleware/AuthMiddleware");
const {
  registerUser,
  signIn,
  getUser,
  updateUsers,
  getSingleUser,
  deleteUser,
  forgetPass,
  updatePassword,
} = require("./controller/UserController");

const {
  getAllProducts,
  deleteProduct,
  addProducts,
  updateProduct,
  getSingleProduct,
} = require("./controller/ProductController");

const {
  getCategory,
  addCategory,
  getSingleCategory,
  deleteCategory,
} = require("./controller/CategoryController");

const { addAddress, getAddress } = require("./controller/UserAddressController");
const { addToCart, getCart, deleteFromCart, emptyCart } = require("./controller/CartController");

// Authentication
route.post("/register", registerUser);
route.post("/signin", signIn);

// User Address routes
route.post("/users/address", validateToken, addAddress);
route.get("/users/address", getAddress);

// Users Routes
route.get("/users", validateToken, checkRole, getUser);
route.put("/users/", validateToken, checkRole, updateUsers);
route.get("/users/:id", getSingleUser);
route.delete("/users/:id", validateToken, checkRole, deleteUser);
route.post("/users/reset-password", validateToken, forgetPass);
route.put("/users/update-password", validateToken, updatePassword);

// Products Routes
route.get("/products", validateToken, checkRole, getAllProducts);
route.post("/products", validateToken, checkRole, uploadFile, productValidation, addProducts);
route.delete("/products/:id", validateToken, checkRole, deleteProduct);
route.put("/products/:id", validateToken, checkRole, updateProduct);
route.get("/products/:id", getSingleProduct);

// Product category routes
route.get("/category", getCategory);
route.post("/category", validateToken, addCategory);
route.get("/category/:id", validateToken, getSingleCategory);
route.delete("/category/:id", validateToken, checkRole, deleteCategory);

// Cart routes
route.post("/cart/add/:productId", validateToken, addToCart);
route.get("/cart", validateToken, getCart);
route.delete("/cart/remove/:id", validateToken, deleteFromCart);
route.delete("/cart/:id", emptyCart);

module.exports = route;
