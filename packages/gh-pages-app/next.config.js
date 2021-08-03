const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

const debug = process.env.NODE_ENV !== 'production'

module.exports = withPWA({
  assetPrefix: !debug ? '/Next-gh-page-example/' : '',
  pwa: {
    dest: "public",
    runtimeCaching,
    register: true,
    sw: "/service-worker.js",
    skipWaiting: true,
  }
})