export class Theme {
  /** Current theme */
  theme;

  /** Theme that will be used as callback */
  defaultTheme = "dark";

  /** List of all the themes available */
  availableThemes = {
    light: "light",
    dark: "dark",
    rgb: "rgb",
  };

  nextTheme() {
    const themeArray = Object.keys(this.availableThemes);

    const current = themeArray.indexOf(
      document.body.getAttribute("data-theme")
    );
    const max = themeArray.length;
    let next = current + 1;

    /** If next item reaches the max of the array, set it to the first array item */
    if (next === max) next = 0;

    return themeArray[next];
  }

  constructor(theme) {
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

    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }

  /** This will cycle through all themes */
  cycle() {
    const nextTheme = this.nextTheme();

    this.setTheme(nextTheme);
  }
}
