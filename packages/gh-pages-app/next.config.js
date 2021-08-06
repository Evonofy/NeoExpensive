const withImages = require('next-images');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');

const debug = process.env.NODE_ENV !== 'production';

const pwaPlugin = withPWA({
  assetPrefix: !debug ? '/Next-gh-page-example/' : '',
  pwa: {
    dest: 'public',
    runtimeCaching,
    register: true,
    sw: '/service-worker.js',
    skipWaiting: true
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
});

const imagePlugin = withImages({
  esModule: true
});

module.exports = withPlugins([pwaPlugin, imagePlugin]);
