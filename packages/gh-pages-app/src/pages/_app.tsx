import { FC } from 'react';

import { AppProps } from 'next/app';
import { Head } from '../components/Head';

const app: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  );
};

export default app;
