module.exports = (sequelize, DataTypes) => {
  const orderItem = sequelize.define("orderItem", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    quantity: DataTypes.INTEGER,
  });
  return orderItem;
};
