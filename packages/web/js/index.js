import { Switcher } from './lib/switcher.js';

import { useDebounce } from './hooks/useDebounce.js';
import { useSelector } from './hooks/useSelector.js';

/* initialize the Theme and Translation switchers */
new Switcher({
  themeSwitcher: true,
  translationSwitcher: true,
});

/* get input search el */
const itemSearchInput = useSelector('#item--search--input');

const handleSearchInput = (event) => {
  console.log(event);
};

itemSearchInput.addEventListener('keyup', useDebounce(handleSearchInput, 300));
