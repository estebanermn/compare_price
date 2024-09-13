const { chromium } = require("playwright");
const { WEB_DOMAIN_NAME } = require("./src/utils/constants.js");
const helper = require("./src/utils/helpers.js");
const { updateExcelFile } = require("./src/utils/generateExcelFile.js");

const { getDataFromAudioMusica } = require("./src/functions/audioMusica.js");
const { getDataFromMusicMarket } = require("./src/functions/musicMarket.js");

const sequelize = require("./src/config/database");
const models = require("./src/models/association.js");

async function main() {
  try {
    const products = await models.Product.findAll({
      where: { isActive: true },
    });
    const listProducts = products.map((p) => p.dataValues);

    const browser = await chromium.launch({
      headless: false,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    for (let item of listProducts) {
      if (helper.getDomainName(item.url) === WEB_DOMAIN_NAME.MUSIC_MARKET) {
        await getDataFromMusicMarket(page, item);
      } else if (
        helper.getDomainName(item.url) === WEB_DOMAIN_NAME.AUDIO_MUSICA_COM_PE
      ) {
        await getDataFromAudioMusica(page, item);
      }
    }

    await context.close();
    await browser.close();

    //await updateExcelFile(listProduct);
  } catch (error) {
    console.error("Error al interactuar con la base de datos:", error);
  } finally {
    await sequelize.close();
  }
}

main();
