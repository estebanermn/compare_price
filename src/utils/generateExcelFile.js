const xlsx = require("xlsx");
const fs = require("fs");
const { sendMail } = require("./sendMail.js");
const {
  isNullOrEmpty,
  lowerPrice,
  parseStringToNumber,
} = require("./helpers.js");

async function updateExcelFile(newData = []) {
  const filePath = "scraped_data.xlsx";
  let wb;

  if (fs.existsSync(filePath)) {
    wb = xlsx.readFile(filePath);
    await validateLastRegister(filePath, newData);
    createSheets(newData, wb, filePath);
  } else {
    wb = xlsx.utils.book_new();
    createSheets(newData, wb, filePath);
  }
}

function createSheets(newData = [], wb, filePath) {
  newData.forEach((item) => {
    const sheetName = `COD${item.id}`;
    // Obtener la hoja de trabajo existente o crear una nueva
    let ws = wb.Sheets[sheetName];
    if (!ws) {
      ws = xlsx.utils.json_to_sheet([]);
      xlsx.utils.book_append_sheet(wb, ws, sheetName);
    }

    // Convertir la hoja a JSON, añadir los nuevos datos y volver a convertirla a hoja
    const existingData = xlsx.utils.sheet_to_json(ws);
    const combinedData = existingData.concat(item);
    ws = xlsx.utils.json_to_sheet(combinedData);

    // Reemplazar la hoja de trabajo en el libro
    wb.Sheets[sheetName] = ws;

    // Escribir el libro actualizado de vuelta al archivo
    xlsx.writeFile(wb, filePath);
  });
}

async function validateLastRegister(filePath, newData) {
  const list = [];
  const wb = xlsx.readFile(filePath);

  newData.forEach((item) => {
    if (isNullOrEmpty(item.price)) {
      console.log("PRODUCT NOT FOUND");
      return;
    }

    const sheetName = `COD${item.id}`;
    const ws = wb.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(ws);

    // Verificar si hay registros
    if (data.length === 0) {
      console.log("Excel file is empty.");
      return;
    }

    const listData = data.filter((item) => item.price !== "");
    const lastRegister = listData[listData.length - 1];
    const priceLastRegister = lastRegister.price;

    if (isNullOrEmpty(priceLastRegister)) {
      console.log("The Column of price is not founded in the last register.");
      return;
    }
    result = createMailMessage(priceLastRegister, item, list);
  });

  if (result.length > 0) {
    await sendMail(result);
  }
}

const createMailMessage = function (priceLastRegister, item, list) {
  const price = parseStringToNumber(item.price);
  const lastPrice = parseStringToNumber(priceLastRegister);

  if (price < lastPrice) {
    list.push({
      name: item.name,
      message: lowerPrice(item.price, priceLastRegister),
      url: item.url,
    });
  }

  return list;
};

module.exports = {
  updateExcelFile,
};
