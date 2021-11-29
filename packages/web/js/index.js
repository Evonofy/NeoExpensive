import { Theme } from "./themes/index.js";

/* feed localstorage theme to Theme API */
/** Global theme */
const localTheme = localStorage.getItem("theme");

var theme = new Theme(localTheme);

/** When localStorage changes, change the theme */
window.addEventListener(
  "storage",
  (event) => (theme = new Theme(event.newValue))
);

import { useSelector } from "./hooks/useSelector.js";

const themeSwitcherButtons = useSelector(".theme--switcher--button", true);

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
