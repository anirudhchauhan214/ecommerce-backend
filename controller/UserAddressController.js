const connection = require("../db/Connection");
const Address = connection.Address;
const User = connection.Users;
const { Op } = require("sequelize");

const addAddress = async (req, res) => {
  const userData = req.body;
  const { userId } = req.params;

  if (
    userData.city == "" ||
    userData.state == "" ||
    userData.country == "" ||
    userData.pincode == "" ||
    userData.city == null ||
    userData.state == null ||
    userData.country == null ||
    userData.pincode == null
  ) {
    return res.send({ status: false, message: "Please fill all the details!!!" });
  }
  try {
    const alreadyExists = await Address.findOne({
      where: {
        [Op.and]: [
          { pincode: userData.pincode },
          { city: userData.city },
          { state: userData.state },
        ],
      },
    });

    if (alreadyExists) {
      return res.status(409).json({ status: false, message: "Can not add same location twice!!" });
    }
    const data = await Address.create({ ...userData, userUserId: userId });

    return res
      .status(200)
      .json({ status: true, message: "Address added successfully!!", data: data.dataValues });
  } catch (err) {
    throw err;
  }
};

const getAddress = async (req, res) => {
  try {
    const address = await Address.findAll({ include: User });
    return res
      .status(200)
      .json({ status: true, message: "Addresses fetched successfully!!", data: address });
  } catch (err) {
    throw err;
  }
};

module.exports = { addAddress, getAddress };
