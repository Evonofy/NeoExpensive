import { FC, useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { Theme } from '@contexts';
import { init_i18n } from '@lib';
import { Head, Layout } from '@components';
import Global from '@styles/global';
import Dark from '@styles/themes/dark';

const app: FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const [rootFontSize, setRootFontSize] = useState(16);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initalRootFontSize = Number(
        getComputedStyle(document.querySelector('html')).fontSize.slice(0, -2)
      );
      setRootFontSize(initalRootFontSize);
    }
  }, []);

  /** Initialize multi-language service */
  init_i18n();
  return (
    <ThemeProvider theme={Dark}>
      {/** Initialize Theme context */}
      <Theme themeDefault="dark" themes={['dark', 'light', 'rgb', 'contrast']}>
        <Head />
        <Layout {...{ rootFontSize, setRootFontSize }}>
          <Component {...pageProps} {...{ rootFontSize, setRootFontSize }} />
        </Layout>
        <Global />
      </Theme>
    </ThemeProvider>
  );
};

export default app;
