const path = require("path");

module.exports = {
  i18n: {
    locales: ["default", "en", "de", "uk", "ru"],
    defaultLocale: "default",
    localePath: path.resolve("./public/locales"),
  },
};
