const sequelize = require("./src/config/database");
const models = require("./src/models/association");

async function createTables() {
  // Sincronizar la base de datos
  await sequelize.sync({ force: true });

  console.log("Base de datos conectada y modelos sincronizados");

  const product1 = await models.Product.create({
    name: "bateria-electronica-nux-dm-210",
    url: "https://musicmarket.com.pe/products/bateria-electronica-nux-dm-210",
  });

  const product2 = await models.Product.create({
    name: "bateria-electronica-nux-dm-8",
    url: "https://musicmarket.com.pe/products/bateria-electronica-nux-dm-8",
  });

  const product3 = await models.Product.create({
    name: "guitarra-electrica-prs-silver-sky-dead-spec-moc-sand-satin-limited-edition",
    url: "https://www.audiomusica.com.pe/guitarra-electrica-prs-silver-sky-dead-spec-moc-sand-satin-limited-edition/p",
  });

  const product4 = await models.Product.create({
    name: "guitarra-electrica-prs-ce24-semi-hollow-faded-gray-black",
    url: "https://www.audiomusica.com.pe/guitarra-electrica-prs-ce24-semi-hollow-faded-gray-black/p",
  });
}

createTables();
