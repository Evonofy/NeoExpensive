import { FC } from 'react';
import { AppProps } from 'next/app';

import { Theme } from '@contexts';

import { init_i18n } from '@lib';
import { Head } from '@components';
// import { Header } from '@screen';

import isElectron from 'is-electron';

import './global.scss';

const app: FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  /** Initialize multi-language service */
  // init_i18n();
  console.log('_-------------------');
  console.log(isElectron());
  console.log('_-------------------');
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
