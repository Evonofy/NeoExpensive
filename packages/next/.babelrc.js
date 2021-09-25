const env = require('./env-config');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['transform-define', env],
    'inline-react-svg',
    ['styled-components', { ssr: true }]
  ]
};
