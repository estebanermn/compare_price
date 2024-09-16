const { Sequelize } = require("sequelize");

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "/home/estebanermn/my-project/compare_price/database.sqlite", // Archivo SQLite
  logging: false, // Deshabilitar el log de consultas SQL en consola
});

module.exports = sequelize;
