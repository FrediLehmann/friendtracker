const path = require("path");

module.exports = {
  i18n: {
    locales: ["default", "en", "de"],
    defaultLocale: "default",
    localePath: path.resolve("./public/locales"),
  },
};
