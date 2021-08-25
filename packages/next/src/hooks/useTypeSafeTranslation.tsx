import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

/** Reference Translation */
import translations from '@locales/en/translation.json';
import { Paths } from '../types/utils';

export type TranslationKeys = Paths<typeof translations>;

export interface DateTranslationType {
  time?: Date;
  date?: Date;
}

type Response = {
  translated: (
    string: TranslationKeys,
    options?: DateTranslationType
  ) => TranslationKeys;
};

export const useTypeSafeTranslation = (): Response => {
  const { t: translate } = useTranslation();

  /**
   * Just tells you what keys there are inside the translation file.
   */

  return {
    translated: (string: TranslationKeys, options?: DateTranslationType) =>
      translate(string, options)
  };
};
