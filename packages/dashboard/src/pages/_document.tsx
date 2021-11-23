import { ColorModeScript } from '@chakra-ui/react';
import { Default } from '@styles/themes/default';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          <ColorModeScript initialColorMode={Default.config.initialColorMode} />

          <NextScript />
        </Head>
        <body>
          <Main />
        </body>
      </Html>
    );
  }
}
