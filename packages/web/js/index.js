import { Theme } from './themes/index.js';

/** Global theme */
const localTheme = localStorage.getItem('theme');

var theme = new Theme(localTheme);

/** When localStorage changes, change the theme */
window.addEventListener(
  'storage',
  event => (theme = new Theme(event.newValue))
);

export { theme };
