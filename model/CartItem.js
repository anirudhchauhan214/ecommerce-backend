module.exports = (sequelize, DataTypes) => {
  const cartItem = sequelize.define("cartItem", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    quantity: DataTypes.INTEGER,
  });
  return cartItem;
};
