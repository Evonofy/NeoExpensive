import { Theme } from './themes/index.js';
import { Translation } from './translate/index.js';

import { useStorage } from './hooks/useStorage.js';
import { useSelector } from './hooks/useSelector.js';

/* feed localstorage theme to Theme API */
const localTheme = useStorage('theme');
const localLang = useStorage('language');

let theme = new Theme(localTheme);
let lang = new Translation(localLang);

/** When localStorage changes, change the theme */
window.addEventListener('storage', (event) => {
  theme = new Theme(event.newValue);
});

const themeSwitcherButtons = useSelector('.theme--switcher--button', {
  querySelectorAll: true,
});
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

const langSwitcherButtons = useSelector('.lang--switcher--button', {
  querySelectorAll: true,
});
langSwitcherButtons.forEach((button) => {
  /* put the next theme name in the button */
  button.innerHTML = lang.nextLanguage();

  button.onclick = () => {
    useSelector('body').style.top = 0;

    doGTranslate(`pt|${lang.nextLanguage()}`);

    /* go to next lang */
    lang.cycle();

    /* update button name */
    button.innerHTML = lang.nextLanguage();
    return false;
  };
});
