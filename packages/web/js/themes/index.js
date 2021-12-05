import { useStorage } from '../hooks/useStorage.js';

export class Theme {
  /** Current theme */
  theme = this.getStorageTheme();

  /** Theme that will be used as callback */
  defaultTheme = 'dark';

  /** List of all the themes available */
  availableThemes = {
    light: 'light',
    dark: 'dark',
    rgb: 'rgb',
  };

  constructor(theme = this.getStorageTheme()) {
    let newTheme = theme;

    /** If the theme isn't on the available themes list with pattern matching */
    if (!this.availableThemes[theme]) {
      newTheme = this.defaultTheme;
    }

    this.setTheme(newTheme);
  }

  /** Just set theme in localStorage and body */
  setTheme(theme) {
    this.theme = theme;

    useStorage('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  nextTheme() {
    const themeArray = Object.keys(this.availableThemes);

    const current = themeArray.indexOf(
      document.body.getAttribute('data-theme')
    );
    const max = themeArray.length;
    let next = current + 1;

    /** If next item reaches the max of the array, set it to the first array item */
    if (next === max) next = 0;

    return themeArray[next];
  }

  getStorageTheme() {
    return useStorage('theme');
  }

  /** This will cycle through all themes */
  cycle() {
    const nextTheme = this.nextTheme();

    this.setTheme(nextTheme);
  }
}
