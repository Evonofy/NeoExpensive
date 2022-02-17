import { Menu } from './lib/menu.js';

import { useFetch } from './hooks/useFetch.js';
import { Switcher } from './lib/switcher.js';

/* initialize the Theme and Translation switchers */
new Switcher({
  themeSwitcher: true,
  translationSwitcher: true,
});

/* initialize the Menu */
new Menu({
  hamburger: true,
  search: true,
});
