import translations from '../public/locales/en/translation.json';

const keys: string[] = [];

type TranslationRecord = {
  // eslint-disable-next-line no-unused-vars
  [P in string]: string | TranslationRecord;
};

const _traverseTranslations = (obj: TranslationRecord, path: string[]) => {
  Object.keys(obj).forEach((key) => {
    if (key.startsWith('_')) {
      return;
    }
    const objOrString = obj[key];
    if (typeof objOrString === 'string') {
      keys.push([...path, key].join('.'));
    } else {
      _traverseTranslations(objOrString, [...path, key]);
    }
  });
};

export const traverseTranslations = () => {
  // @ts-ignore
  _traverseTranslations(translations, []);
  return keys;
};
