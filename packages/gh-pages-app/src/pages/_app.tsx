import { FC } from 'react';
import { AppProps } from 'next/app';

import { init_i18n } from '@lib';
import { Head } from '@components';

const app: FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  /** Initialize multi-language service */
  init_i18n();

  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  );
};

export default app;
