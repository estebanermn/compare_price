const { Sequelize } = require("sequelize");

// Configuración de la base de datos SQLite
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "/home/estebanermn/my-project/compare_price/database.sqlite", // Archivo SQLite
//   logging: false,
// });

const sequelize = new Sequelize("compare_price", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
