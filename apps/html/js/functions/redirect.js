export const redirect = (path, { returnPathOnly = false } = {}) => {
  const isGithubPages =
    window.location.origin === 'https://esquemaflorescer.github.io/';

  const pathPrefix = isGithubPages
    ? 'neo-expensive/packages/web'
    : 'packages/web';

  const host = isGithubPages
    ? 'https://esquemaflorescer.github.io'
    : window.location.origin;

  if (returnPathOnly) {
    return `${host}/${pathPrefix}${path}`;
  }

  window.location.href = `${host}/${pathPrefix}${path}`;
};
