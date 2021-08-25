import { FC } from 'react';
import {
  useTypeSafeTranslation,
  TranslationKeys,
  DateTranslationType
} from '@hooks';

export type TranslationProps = {
  text: TranslationKeys;
  options?: DateTranslationType;
};

export const Translate: FC<TranslationProps> = ({
  text,
  options
}): JSX.Element => {
  /**
   * Returns a component that translates your text.
   */

  const { translated } = useTypeSafeTranslation();
  const translatedText = translated(text, options);

  return <>{translatedText}</>;
};

export interface ComplexTranslateProps {
  text: TranslationKeys;
  children: (data: { translatedText: TranslationKeys }) => JSX.Element;
}

export const ComplexTranslate: FC<ComplexTranslateProps> = ({
  children,
  text
}) => {
  const { translated } = useTypeSafeTranslation();
  const translatedText = translated(text);

  return <>{children({ translatedText })}</>;
};
