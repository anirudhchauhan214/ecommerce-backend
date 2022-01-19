module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define(
    "userAddress",
    {
      pincode: DataTypes.INTEGER,
      city: { type: DataTypes.STRING, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: true }
  );
  return UserAddress;
};
