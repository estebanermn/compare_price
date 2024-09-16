const sequelize = require("./src/config/database");
var cron = require("node-cron");
const { init } = require("./src/initScraping");
require("dotenv").config();

async function main() {
  try {
    // cron.schedule(process.env.CRON_JOB_SCHEDULE, () => {
    //   console.log("running a task every minute");
    // });
    //await init();
  } catch (error) {
    console.error("Error al interactuar con la base de datos:", error);
  } finally {
    await sequelize.close();
  }
}

main();
