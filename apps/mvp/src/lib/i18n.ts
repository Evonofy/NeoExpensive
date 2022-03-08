import i18next from 'i18next';
import backend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import isDate from 'lodash/isDate';

import { isProd } from './constants';

let hasInit = false;

function createDateFormatOptions(format: string): Intl.DateTimeFormatOptions {
  switch (format) {
    case 'intlDate': {
      // EN returns 3/16/2021, 5:45 PM
      return {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
    }
    case 'intlTime': {
      // EN returns 05:45 PM
      return {
        hour: 'numeric',
        minute: 'numeric',
      };
    }
    default: {
      // EN returns Tuesday, March 16, 2021, 5:45 PM
      return {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
    }
  }
}

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
};

export const initI18n = () => {
  if (!hasInit) {
    hasInit = true;
    i18next
      .use(backend)
      .use(languageDetector)
      .use(initReactI18next)
      .init({
        detection: {
          caches: ['localStorage'],
          lookupCookie: '@neo:langugage',
          lookupLocalStorage: '@neo:langugage',
          order: DETECTION_OPTIONS.order,
        },
        fallbackLng: 'en',
        debug: !isProd,
        react: {
          useSuspense: true,
        },
        interpolation: {
          escapeValue: true,
          format: (value, format, lng) => {
            return isDate(value) && format ? new Intl.DateTimeFormat(lng, createDateFormatOptions(format)).format(value).toString() : value;
          },
        },
      });
  }
};
