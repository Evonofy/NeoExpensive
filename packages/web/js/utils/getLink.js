/**
 *
 * @param {string} route - The route
 * @returns {string} route
 */
export const getLink = route => {
  const baseURL = `/packages/web`;
  const baseGithubURL = `/neo-expensive/packages/web`;

  const isGithub = window.location.host === 'esquemaflorescer.github.io';
  let path = route.toLocaleLowerCase();

  if (isGithub && path === '/') {
    return baseGithubURL;
  } else if (isGithub) {
    return `${baseGithubURL}/pages${path}`;
  } else if (!isGithub && path === '/') {
    return baseURL;
  } else {
    return `${baseURL}/pages${path}`;
  }
};
