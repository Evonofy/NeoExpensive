import { Theme } from './themes/index.js';
import { useSelector } from './hooks/useSelector.js';

/* feed localstorage theme to Theme API */
const localTheme = localStorage.getItem('theme');

let theme = new Theme(localTheme);
/* put the data-theme as the page loads to stop flickering */

/** When localStorage changes, change the theme */
window.addEventListener(
  'storage',
  (event) => (theme = new Theme(event.newValue))
);

const themeSwitcherButtons = useSelector('.theme--switcher--button', true);

themeSwitcherButtons.forEach((button) => {
  /* put the next theme name in the button */
  button.innerHTML = theme.nextTheme();

  button.onclick = () => {
    /* go to next theme */
    theme.cycle();

    /* update button name */
    button.innerHTML = theme.nextTheme();
  };
});

export { theme };
