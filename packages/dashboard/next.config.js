const { join } = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  optimizeFonts: true,
  sassOptions: {
    includePaths: [join(__dirname, 'src', 'styles')]
  }
};
