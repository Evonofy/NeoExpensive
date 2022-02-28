import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '../context/AuthContext';
import { SettingsProvider } from '../context/SettingsContext';

import '@neo/global';

const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <Component {...pageProps} />
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
