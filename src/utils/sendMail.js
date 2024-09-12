require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async function (result) {
  const productHtml = generateProductHTML(result);
  const { data, error } = await resend.emails.send({
    from: "Compare price <onboarding@resend.dev>",
    to: ["estebanermn@gmail.com"],
    subject: "Nuevos precios",
    html: `<strong> ${productHtml}</strong>`,
  });

  if (error) {
    return console.error({ error });
  }
};

function generateProductHTML(productList) {
  return productList
    .map(
      (product) => `
    <div>
      <h2>${product.name}</h2>
      <p>${product.message}</p>
      <a href="${product.url}" target="_blank">Ver producto</a>
    </div>
  `
    )
    .join("");
}

module.exports = {
  sendMail,
};
