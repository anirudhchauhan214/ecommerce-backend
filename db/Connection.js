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
db.Orders = require("../model/OrdersModel")(sequelize, DataTypes);

db.Users.hasMany(db.Address);
db.Users.hasMany(db.Products);
db.Users.hasOne(db.Cart);
db.Users.hasMany(db.Orders);

db.Address.belongsTo(db.Users);
db.Products.belongsTo(db.Users);
db.Cart.belongsTo(db.Users);
db.Orders.belongsTo(db.Users);

db.sequelize.sync({ force: true });

module.exports = db;
