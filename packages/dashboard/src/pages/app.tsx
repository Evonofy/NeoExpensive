import { FC } from 'react';
import { AppProps } from 'next/app';

import { Layout } from '@components';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
