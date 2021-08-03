const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

const debug = process.env.NODE_ENV !== 'production'

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching
  }
})

// module.exports = {
//   assetPrefix: !debug ? '/Next-gh-page-example/' : '',
// }
