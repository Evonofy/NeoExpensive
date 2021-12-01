const { join } = require("path");

const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const pwa = withPWA({
  pwa: {
    dest: "public",
    // disable: process.env.NODE_ENV === 'development',
    // register: true,
    // scope: '/',
    // sw: 'service-worker.js',
  },
  reactStrictMode: true,
  optimizeFonts: true,
  swcMinify: true,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [join(__dirname, "src", "styles")],
  },
});

/** @type {import('next').NextConfig} */
module.exports = withPlugins([pwa]);
