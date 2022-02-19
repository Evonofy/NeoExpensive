import { QueryClient, QueryClientProvider } from 'react-query';
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import '@neo/global';

const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
