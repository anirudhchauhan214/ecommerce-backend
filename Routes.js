const express = require("express");

const route = express.Router();

const { validateToken } = require("./middleware/Middleware");

module.exports = route;
