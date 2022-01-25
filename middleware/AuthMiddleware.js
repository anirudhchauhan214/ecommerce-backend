const jwt = require("jsonwebtoken");
const db = require("../db/Connection");
const { deleteImg, uploadImg } = require("../helper/Util");
const Products = db.Products;
const multer = require("multer");

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: "1h",
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, process.env.JWT_KEY, options);
        // pass back the decoded token to the request object
        req.params.userId = result.userId;
        req.params.role = result.role;
        // call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        return res.status(401).send({ error: err.message });
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401,
      };
      res.status(401).send(result);
    }
  },

  checkRole: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: "1h",
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, process.env.JWT_KEY, options);
        // pass back the decoded token to the request object
        req.params.role = result.role;
        if (result.role == 1) {
          return res.status(401).json({ status: false, message: "Unauthorized User!!" });
        }
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        return res.status(401).send({ error: err.message });
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401,
      };
      res.status(401).send(result);
    }
  },

  productValidation: async (req, res, next) => {
    const data = req.body;
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
      deleteImg(req.files);
      return res.status(404).send({ status: false, message: "Please fill the form correctly!!" });
    }
    const query = await Products.findOne({
      where: { title: data.title, price: data.price, userId: req.params.userId },
    });

    if (query) {
      deleteImg(req.files);
      return res
        .status(409)
        .json({ status: false, message: "Product with same name already exists!!" });
    }
    next();
  },

  uploadFile: (req, res, next) => {
    const upload = uploadImg.array("img");

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ status: false, message: err.message });
      } else if (err) {
        return res.status(400).json({ status: false, message: err.message });
      }
      next();
    });
  },
};
