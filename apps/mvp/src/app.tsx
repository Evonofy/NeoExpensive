import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './main.css';
import { Pages } from './routes';
import { Header } from './components/header';
import { Footer } from './components/footer';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<h1>loadidng..</h1>}>
        <Header />

        <Pages />

        <Footer />
      </Suspense>
    </QueryClientProvider>
  );
};
