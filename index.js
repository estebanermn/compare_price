const sequelize = require("./src/config/database");
const { init } = require("./src/initScraping");

async function main() {
  try {
    console.log("QLQ:", new Date());
    await init();
  } catch (error) {
    console.error("Error al interactuar con la base de datos:", error);
  } finally {
    await sequelize.close();
    console.error("CLOSE BD:");
  }
}

main();
