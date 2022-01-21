module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM("1", "2"), allowNull: false, defaultValue: "1" },
    },
    { timestamps: true }
  );
  return Users;
};
