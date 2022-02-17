import type { FC } from 'react';
import type { AppProps } from 'next/app';

import '@neo/global';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
