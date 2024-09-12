function getDomineName(url) {
  try {
    const nuevaUrl = new URL(url);
    return nuevaUrl.hostname;
  } catch (error) {
    console.error("La URL proporcionada es inválida:", error);
    return null;
  }
}

console.log(
  getDomineName(
    "https://musicmarket.com.pe/?gclid=CjwKCAjwooq3BhB3EiwAYqYoEuDypZilTcWb1YJ1dMT1pyqbf5kE_8Fcf9X85sLf_L3m60LOWRaAkRoCM54QAvD_BwE"
  )
);
