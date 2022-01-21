const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../db/Connection");
const User = connection.Users;

const registerUser = async (req, res) => {
  let data = req.body;
  const phone = req.body.phone.toString();

  if (
    data.name == "" ||
    data.name == null ||
    data.email == null ||
    data.password == null ||
    data.email == "" ||
    data.password == "" ||
    data.phone == null ||
    data.phone == "" ||
    data.address == null ||
    data.address == ""
  ) {
    return res.status(404).send({ status: false, message: "Please fill the form correctly!!" });
  }

  const query = await User.findAll({ where: { email: data.email, name: data.name } });
  const hashPass = await bcrypt.hash(data.password, 10);

  try {
    if (query.length === 0) {
      const userData = await User.create({
        ...data,
        phone,
        password: hashPass,
      });
      const response = { status: true, message: "User registered successfully!!", data: userData };
      return res.status(200).json(response);
    } else {
      return res.status(409).send({ status: false, message: "User already exists!" });
    }
  } catch (err) {
    return res.status(404).send({ status: false, message: err.message });
  }
};

const signIn = async (req, res) => {
  const data = req.body;

  if (data.email == null || data.password == null || data.email == "" || data.password == "") {
    return res.status(3).send({ status: false, message: "Email and Password are required!!" });
  }
  const userExists = await User.findOne({ where: { email: data.email } });
  try {
    if (userExists) {
      const hashPass = await bcrypt.compare(data.password, userExists.dataValues.password);
      if (hashPass) {
        const token = jwt.sign(userExists.dataValues, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({ status: true, message: "Sign in success!!", token });
      } else if (!hashPass) {
        return res.status(401).json({ status: false, message: "Password is invalid!!" });
      }
    } else if (!userExists) {
      return res.status(404).json({ status: false, message: "User not found!!" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: connection.Products },
        { model: connection.Orders },
        { model: connection.Address },
        { model: connection.Cart },
      ],
    });
    return res.status(200).json({ status: true, message: "Users fetched successfully!!", users });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const updateUsers = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const existingUser = await User.findOne({ where: { email: data.email, name: data.name } });

  try {
    const user = await User.findOne({ where: { userId: id } });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    } else if (user) {
      if (
        data.name == "" ||
        data.name == null ||
        data.email == null ||
        data.email == "" ||
        data.phone == null ||
        data.phone == "" ||
        data.address == null ||
        data.address == ""
      ) {
        return res.status(404).send({ status: false, message: "Please fill the form correctly!!" });
      } else if (existingUser) {
        return res
          .status(409)
          .send({ status: "Another user with same email and name already exists!" });
      } else {
        const updatedUser = await User.update(data, { where: { userId: id } });
        const userData = await User.findOne({ where: { userId: id } });
        return res.status(200).json({
          status: true,
          message: "User updated successfully!!",
          data: userData.dataValues,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await User.findOne({
      where: { userId: id },
      include: [
        { model: connection.Products },
        { model: connection.Orders },
        { model: connection.Address },
        { model: connection.Cart },
      ],
    });
    return res.status(200).json({ status: true, message: "User fetched successfully!!", users });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userExists = await User.findOne({ where: { userId: id } });
    if (userExists) {
      const deleteUser = await User.destroy({ where: { userId: id } });
      return res.status(200).json({ status: true, message: "user deleted successfully!!" });
    } else {
      return res.status(404).json({ status: true, message: "User Not Found !!" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

module.exports = { registerUser, signIn, getUser, updateUsers, getSingleUser, deleteUser };
