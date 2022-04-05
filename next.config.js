const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  i18n,
  eslint: {
    dirs: ["components", "hooks", "icons", "pages", "routes", "store", "utils"],
  },
};

module.exports = nextConfig;
