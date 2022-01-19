module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("orders", {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  });
  return Orders;
};
