const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductScrapingPrice = sequelize.define("ProductScrapingPrice", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
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

module.exports = ProductScrapingPrice;
