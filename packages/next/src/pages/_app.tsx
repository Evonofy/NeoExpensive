import { FC, useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { Theme } from '@contexts';
import { init_i18n } from '@lib';
import { Head } from '@components';
import Dark from '@styles/themes/dark';
import Global from '@styles/global';

const clampBuilder = () => {};

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
        <Component {...pageProps} {...{ rootFontSize, setRootFontSize }} />
        <Global />
      </Theme>
    </ThemeProvider>
  );
};

export default app;
