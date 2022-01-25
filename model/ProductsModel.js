module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "products",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      images: { type: DataTypes.JSON },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: true }
  );
  return Products;
};
