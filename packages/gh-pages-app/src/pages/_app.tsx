import { FC, Suspense } from 'react';

import { init_i18n } from '../lib/i18next';

import { AppProps } from 'next/app';
import { Head } from '../components/Head';

const app: FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  init_i18n();

  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  );
};

export default app;
