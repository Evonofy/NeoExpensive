const prod = process.env.NODE_ENV === 'production';
const url = process.env.BACKEND_API_URL;

module.exports = {
  'process.env.BACKEND_URL': prod ? '/Next-gh-page-example' : '',
  'process.env.BACKEND_API_URL': url
};
