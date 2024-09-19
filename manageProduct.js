require("colors");
const models = require("./src/models/association");

const { inquirerMenu, pausa, leerInput } = require("./src/utils/inquirer");

const main = async () => {
  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const inputProduct = await leerInput("Ingrese el Producto: ");
        const inputUrl = await leerInput("Ingrese la Url: ");

        const product = await models.Product.create({
          name: inputProduct,
          url: inputUrl,
        });
        console.log(`Se registro el producto: ${product.dataValues} `);
        break;

      case "2":
        const list = await models.Product.findAll();
        console.log(list.map((i) => i.dataValues));
        break;
    }

    await pausa();
  } while (opt !== "0");
};

main();
