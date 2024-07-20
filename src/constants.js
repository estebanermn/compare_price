const WEB_NAMES = Object.freeze({
  MUSIC_MARKET: "musicmarket",
  AUDIO_MUSICA: "audiomusica",
});

const URLS = Object.freeze({
  BATERIA_ELECTRONICA_NUX_DUM_210:
    "https://musicmarket.com.pe/products/bateria-electronica-nux-dm-210",
  BATERIA_ELECTRONICA_NUX_DUM_8:
    "https://musicmarket.com.pe/products/bateria-electronica-nux-dm-8",
  GUITARRA_ELECTRICA_PRS_SE_SILVER_SKY_OVERLAND_GRAY:
    "https://www.audiomusica.com.pe/guitarra-electrica-prs-se-silver-sky-overland-gray/p",
});

const firstWeb = {
  id: "1",
  name: WEB_NAMES.MUSIC_MARKET,
  url: URLS.BATERIA_ELECTRONICA_NUX_DUM_210,
};

const secondtWeb = {
  id: "2",
  name: WEB_NAMES.MUSIC_MARKET,
  url: URLS.BATERIA_ELECTRONICA_NUX_DUM_8,
};

const thirdWeb = {
  id: "3",
  name: WEB_NAMES.AUDIO_MUSICA,
  url: URLS.GUITARRA_ELECTRICA_PRS_SE_SILVER_SKY_OVERLAND_GRAY,
};

const objList = [firstWeb, secondtWeb, thirdWeb];

module.exports.objList = objList;
module.exports.WEB_NAMES = WEB_NAMES;
