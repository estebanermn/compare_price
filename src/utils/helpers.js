const moment = require("moment-timezone");
const models = require("../models/association");
const { sendMail } = require("./sendMail");

function isNullOrEmpty(str) {
  return !str || str.trim().length === 0;
}

function replaceSymbols(text) {
  return text.replace(/^S\/\.?\s*/, "").trim();
}

function parseStringToNumber(str) {
  const strWithoutCommas = str.replace(/,/g, "");
  const number = parseFloat(strWithoutCommas);
  return number;
}

const lowerPrice = (price, priceLastRegister) =>
  `El precio ${price} es menor que ${priceLastRegister},
   S/${priceLastRegister - price} bajo el producto.`;

async function validateSelectors(id, name, price, url) {
  const priceValue = parseStringToNumber(replaceSymbols(price));

  if (isNullOrEmpty(price))
    await registerProductError(id, `Product not found | ${name}`, url);
  else if (isNaN(priceValue))
    await registerProductError(id, `Price is not a valid number ${name}`, url);
  else if (priceValue >= 0)
    await registerProductScraping(id, name, priceValue, url);
  else
    await registerProductError(
      id,
      `Product not found, maybe the selector changed | ${name}`,
      url
    );

  return;
}

async function registerProductError(id, name, url) {
  const productError = await models.ProductError.create(
    {
      name: name,
      url: url,
      date: moment().tz("America/Lima").format("YYYY-MM-DD HH:mm:ss"),
      ProductId: id,
    },
    { include: models.Product }
  );
}

async function registerProductScraping(id, name, price, url) {
  const item = await models.ProductScrapingPrice.findOne({
    where: { ProductId: id },
    order: [["date", "DESC"]],
  });

  if (price < item.price) {
    const product = {
      id: id,
      name: name,
      url: url,
      price: price,
      message: lowerPrice(price, item.price),
    };

    await sendMail(product);
  }

  await models.ProductScrapingPrice.create(
    {
      name: name,
      url: url,
      price: price,
      date: moment().tz("America/Lima").format("YYYY-MM-DD HH:mm:ss"),
      ProductId: id,
    },
    { include: models.Product }
  );
}

function getDomainName(url) {
  try {
    const nuevaUrl = new URL(url);
    return nuevaUrl.hostname;
  } catch (error) {
    console.error("La URL proporcionada es inválida:", error);
    return null;
  }
}

module.exports = {
  isNullOrEmpty,
  replaceSymbols,
  lowerPrice,
  parseStringToNumber,
  validateSelectors,
  getDomainName,
};
