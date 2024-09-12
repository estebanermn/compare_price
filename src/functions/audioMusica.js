const { validateSelectors } = require("../utils/helpers.js");

async function getDataFromAudioMusica(page, item) {
  const url = item.url;
  const response = await page.goto(url, { waitUntil: "load" });
  if (!response.ok())
    return validateSelectors(
      item.id,
      `Could not enter ${item.name} | ${url}`,
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

  return await validateSelectors(item.id, name, price, url);
}

module.exports = {
  getDataFromAudioMusica,
};
