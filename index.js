const { chromium } = require("playwright");
const { objList, WEB_NAMES } = require("./src/constants.js");
const { updateExcelFile } = require("./src/generateExcelFile.js");
const { isNullOrEmpty, replaceSymbols } = require("./src/helpers.js");
const moment = require("moment-timezone");

String.empty = "";

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  var listProduct = [];

  for (let item of objList) {
    let result = String.empty;

    if (item.name === WEB_NAMES.MUSIC_MARKET) {
      result = await getDataFromMusicMarket(page, item);
    } else if (item.name === WEB_NAMES.AUDIO_MUSICA) {
      result = await getDataFromAudioMusica(page, item);
    }

    if (result) listProduct.push(result);
  }

  await context.close();
  await browser.close();

  await updateExcelFile(listProduct);
  // console.log("product", listProduct);
})();

//Methods
async function getDataFromMusicMarket(page, item) {
  const response = await page.goto(item.url, { waitUntil: "load" });
  if (!response.ok())
    return setProduct(
      item.id,
      `Could not enter ${item.name} | ${item.url}`,
      String.empty,
      String.empty
    );

  const name = await page.evaluate(() => {
    const getName = document.querySelector("div.product-main h1");
    return getName ? getName.innerHTML.trim() : String.empty;
  });

  const price = await page.evaluate(() => {
    const getPrice = document.querySelector("div.price--main span");
    return getPrice ? getPrice.textContent.trim() : String.empty;
  });

  return validateSelectors(item.id, name, price, item.url);
}

async function getDataFromAudioMusica(page, item) {
  const response = await page.goto(item.url, { waitUntil: "load" });
  if (!response.ok())
    return setProduct(
      item.id,
      `Could not enter ${item.name} | ${item.url}`,
      String.empty,
      String.empty
    );

  const name = await page.evaluate(() => {
    const getName = document.querySelector(
      "h1.vtex-store-components-3-x-productNameContainer span"
    );
    return getName ? getName.textContent.trim() : String.empty;
  });

  const price = await page.evaluate(() => {
    const items = document.querySelectorAll(
      "span.vtex-product-price-1-x-sellingPriceValue span.vtex-product-price-1-x-currencyContainer span"
    );
    const list = [];
    if (items === null) return String.empty;

    items.forEach((item) => list.push(item.textContent));
    return list.join("");
  });

  return validateSelectors(item.id, name, price, item.url);
}

function setProduct(id, name, price, url) {
  var product = {
    id: id,
    name: name,
    price: replaceSymbols(price),
    url: url,
    createDate: moment().tz("America/Lima").format("YYYY-MM-DD HH:mm:ss"),
  };
  return product;
}

function validateSelectors(id, name, price, url) {
  return isNullOrEmpty(price)
    ? setProduct(id, `Product not found`, String.empty, url)
    : setProduct(id, name, price, url);
}
