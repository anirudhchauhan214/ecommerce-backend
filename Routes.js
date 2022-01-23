const express = require("express");

const route = express.Router();

const { validateToken, checkRole } = require("./middleware/AuthMiddleware");
const {
  registerUser,
  signIn,
  getUser,
  updateUsers,
  getSingleUser,
  deleteUser,
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
const { addCart } = require("./controller/CartController");

// Authentication
route.post("/register", registerUser);
route.post("/signin", signIn);

// User Address routes
route.post("/users/address", validateToken, addAddress);
route.get("/users/address", getAddress);

// Users Routes
route.get("/users", validateToken, checkRole, getUser);
route.put("/users/:id", validateToken, checkRole, updateUsers);
route.get("/users/:id", getSingleUser);
route.delete("/users/:id", validateToken, checkRole, deleteUser);

// Products Routes
route.get("/products", validateToken, checkRole, getAllProducts);
route.post("/products", validateToken, checkRole, addProducts);
route.delete("/products/:id", validateToken, checkRole, deleteProduct);
route.put("/products/:id", validateToken, checkRole, updateProduct);
route.get("/products/:id", getSingleProduct);

// Product category routes
route.get("/category", getCategory);
route.post("/category", validateToken, addCategory);
route.get("/category/:id", validateToken, getSingleCategory);
route.delete("/category/:id", validateToken, checkRole, deleteCategory);

route.post("/cart", validateToken, addCart);
module.exports = route;
