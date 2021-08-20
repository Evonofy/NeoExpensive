/**
 *
 * @param {string} route - The route
 * @returns {string} route
 */
export const getLink = route => {
  const isGithub = window.location.host === 'esquemaflorescer.github.io';
  let path = route.toLocaleLowerCase();

  if (isGithub) {
    return `/neo-expensive/packages/web/pages${path}`;
  } else if (path === '/') {
    return `/packages/web`;
  } else {
    return `/packages/web/pages${path}`;
  }
};
