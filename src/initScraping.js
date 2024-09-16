const { chromium } = require("playwright");
const { WEB_DOMAIN_NAME } = require("./utils/constants.js");
const helper = require("./utils/helpers.js");
const { getDataFromAudioMusica } = require("./functions/audioMusica.js");
const { getDataFromMusicMarket } = require("./functions/musicMarket.js");

const models = require("./models/association.js");

async function init() {
  const products = await models.Product.findAll({
    where: { isActive: true },
  });

  if (products.length > 0) {
    const listProducts = products.map((p) => p.dataValues);
    console.log("listProducts", listProducts);
    const browser = await chromium.launch({
      headless: true,
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
  }
}

module.exports = {
  init,
};
