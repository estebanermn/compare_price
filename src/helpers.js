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

function higherPrice(price, priceLastRegister) {
  return `El precio ${price} es mayor que ${priceLastRegister}, subio ${
    parseFloat(priceLastRegister.replace(/,/g, "")) +
    parseFloat(price.replace(/,/g, ""))
  } el producto.`;
}

module.exports = {
  isNullOrEmpty,
  replaceSymbols,
  lowerPrice,
  higherPrice,
  parseStringToNumber,
};
