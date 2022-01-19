module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "products",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      brand: { type: DataTypes.INTEGER, allowNull: false },
      images: { type: DataTypes.BLOB("long"), allowNull: false },
    },
    { timestamps: true }
  );
  return Products;
};
