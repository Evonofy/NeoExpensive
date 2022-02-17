import { Theme } from '../themes/index.js';
import { Translation } from '../translate/index.js';

import { useElementMap } from '../hooks/useElementMap.js';
import { useSelector } from '../hooks/useSelector.js';

export class Switcher {
  constructor({ themeSwitcher = true, translationSwitcher = true }) {
    let theme = new Theme();
    let translation = new Translation();

    (() => {
      window.onstorage = ({ key, newValue }) => {
        switch (key) {
          case 'theme':
            theme = new Theme(newValue);
            break;

          case 'language':
            translation = new Translation(newValue);
            break;
        }
      };
    })();

    if (themeSwitcher) {
      useElementMap((button) => {
        button.innerHTML = theme.theme;

        button.onclick = () => {
          /* go to next theme */
          theme.cycle();

          /* update button name */
          button.innerHTML = theme.theme;
        };
      }, '.theme--switcher--button');
    }

    if (translationSwitcher) {
      useElementMap((button) => {
        /* put the next theme name in the button */
        button.innerHTML = translation.language;

        button.onclick = () => {
          useSelector('body').style.top = 0;

          doGTranslate(`pt|${translation.nextLanguage()}`);

          /* go to next lang */
          translation.cycle();

          /* update button name */
          button.innerHTML = translation.language;
          return false;
        };
      }, '.lang--switcher--button');
    }
  }
}
