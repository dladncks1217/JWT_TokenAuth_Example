module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    nick: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
  });
