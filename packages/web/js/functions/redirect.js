export const redirect = (path, { returnPathOnly = false } = {}) => {
  const isLocalhost = !!window.location.host.split(':');

  const pathPrefix = isLocalhost
    ? 'packages/web'
    : 'neo-expensive/packages/web';

  const host = isLocalhost
    ? 'http://127.0.0.1:5500'
    : 'https://esquemaflorescer.github.io';

  if (returnPathOnly) {
    return `${host}/${pathPrefix}${path}`;
  }

  window.location.href = `${host}/${pathPrefix}${path}`;
};
