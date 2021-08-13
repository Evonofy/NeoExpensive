import { FC } from 'react';
import { AppProps } from 'next/app';

import { Theme } from '@contexts';

import { init_i18n } from '@lib';
import { Head, Layout } from '@components';

import './global.scss';

const app: FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  /** Initialize multi-language service */
  init_i18n();
  return (
    <>
      {/** Initialize Theme context */}
      <Theme themeDefault="dark" themes={['dark', 'light', 'rgb', 'contrast']}>
        <Head />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Theme>
    </>
  );
};

export default app;
