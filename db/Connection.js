const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to db " + process.env.DB_NAME + "!!"))
  .catch((err) => console.log("Error: " + err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("../model/UserModel")(sequelize, DataTypes);
db.Address = require("../model/UserAddressModel")(sequelize, DataTypes);
db.Products = require("../model/ProductsModel")(sequelize, DataTypes);
db.Cart = require("../model/CartModel")(sequelize, DataTypes);
db.Category = require("../model/CategoryModel")(sequelize, DataTypes);

db.Users.hasMany(db.Address, { foreignKey: "userId" });
db.Users.hasMany(db.Products, { foreignKey: "userId" });
db.Users.hasOne(db.Cart, { foreignKey: "userId" });
db.Category.hasMany(db.Products);

db.Address.belongsTo(db.Users, { foreignKey: "userId" });
db.Products.belongsTo(db.Users, { foreignKey: "userId" });
db.Cart.belongsTo(db.Users, { foreignKey: "userId" });
db.Products.belongsTo(db.Category, { foreignKey: "uId" });
db.Cart.belongsTo(db.Products);

try {
  db.sequelize.sync();
} catch (err) {
  throw err;
}

module.exports = db;
