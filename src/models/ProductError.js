const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductError = sequelize.define("ProductError", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = ProductError;
