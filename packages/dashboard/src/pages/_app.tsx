import { ChakraProvider } from '@chakra-ui/react';
import { init_i18n } from '@lib';
import { dark } from '@styles/themes';
import { AppProps } from 'next/app';
import { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  /** Initialize multi-language service */
  init_i18n();

  return (
    <ChakraProvider theme={dark}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
