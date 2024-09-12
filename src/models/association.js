const Product = require("./Product");
const ProductScrapingPrice = require("./ProductScrapingPrice");
const ProductError = require("./ProductError");

// Relación de uno a muchos entre Producto y ProductScrapingPrice
Product.hasMany(ProductScrapingPrice);
ProductScrapingPrice.belongsTo(Product);

Product.hasMany(ProductError);
ProductError.belongsTo(Product);

const db = {
  Product,
  ProductScrapingPrice,
  ProductError,
};

module.exports = db;
