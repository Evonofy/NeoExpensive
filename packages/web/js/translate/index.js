import { useStorage } from '../hooks/useStorage.js';

function googleTranslateElementInit2() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'pt',
      autoDisplay: false,
    },
    'google_translate_element2'
  );
}

export class Translation {
  /* Current language */
  /* gets the current browser language */
  /** STEPS:
   * * in the cookie -> googletrans=/pt/pt
   *  ! 1. split the `=` -> ['googletrans', '/pt/pt']
   *  ! 2. get the second item in the array
   *  ! 3. split the `/` -> ['', 'pt', 'pt']
   *  ! 4. get the first one -> 'pt'
   *
   * TODO: verify if the first and last ones are the same, if different, get the last one
   * TODO: get the language based on browser preference
   * TODO: get the language based on system preference
   * TODO: get the computer contry based on location
   */
  // language = document.cookie.split('=')[1].split('/')[1];
  language = this.getStorageLang();

  /* the default neo expensive language */
  defaultLanguague = 'pt';

  /* list of all available languages */
  availableLanguages = {
    pt: 'pt',
    en: 'en',
    es: 'es',
    uk: 'uk',
  };

  constructor(lang = this.getStorageLang()) {
    let newLanguage = lang;

    if (!this.availableLanguages[lang]) {
      newLanguage = this.defaultLanguague;
    }

    this.setLanguage(newLanguage);
  }

  setLanguage(language) {
    this.language = language;

    useStorage('language', language);
    document.querySelector('html').setAttribute('lang', language);
  }

  nextLanguage() {
    const langArray = Object.keys(this.availableLanguages);

    const current = langArray.indexOf(
      document.querySelector('html').getAttribute('lang')
    );
    const max = langArray.length;
    let next = current + 1;

    if (next === max) {
      next = 0;
    }

    return langArray[next];
  }

  getStorageLang() {
    return useStorage('language');
  }

  cycle() {
    const nextLang = this.nextLanguage();

    this.setLanguage(nextLang);
  }
}
