module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "cart",
    {
      id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    },
    { timestamps: true }
  );
  return Cart;
};
