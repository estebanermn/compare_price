const { validateSelectors } = require("../utils/helpers.js");

async function getDataFromMusicMarket(page, item) {
  const url = item.url;
  const response = await page.goto(url, { waitUntil: "load" });
  if (!response.ok())
    return validateSelectors(
      item.id,
      `Could not enter ${item.name} | ${url}`,
      String.empty,
      url
    );

  const name = await page.evaluate(() => {
    const getName = document.querySelector("div.product-main h1");
    return getName ? getName.innerHTML.trim() : String.empty;
  });

  const price = await page.evaluate(() => {
    const getPrice = document.querySelector("div.price--main span.money");
    return getPrice ? getPrice.textContent.trim() : String.empty;
  });
  console.log("::", `${name} - ${price}`);
  return await validateSelectors(item.id, name, price, url);
}

module.exports = {
  getDataFromMusicMarket,
};
