import { FC } from 'react';
import { AppProps } from 'next/app';

import { Theme } from '@contexts';

import { init_i18n } from '@lib';
import { Head } from '@components';

const app: FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  /** Initialize multi-language service */
  init_i18n();

  /** Initialize Theme context */
  return (
    <>
      <Theme themeDefault="dark" themes={['dark', 'light', 'rgb', 'contrast']}>
        <Head /> 
        <Component {...pageProps} />
      </Theme>
    </>
  );
};

export default app;