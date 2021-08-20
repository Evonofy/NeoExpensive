import { Theme } from './themes/index.js';

/** Global theme */
var theme = new Theme();

/** When localStorage changes, change the theme */
window.addEventListener(
  'storage',
  event => (theme = new Theme(event.newValue))
);

export { theme };
