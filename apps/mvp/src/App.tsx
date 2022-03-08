import { FC, Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
// import { useContextSelector } from 'use-context-selector';

import { initI18n } from '@lib/i18n';
import { isServer } from '@lib/constants';
import { queryClient } from '@lib/query-client';

// import { globalStyles, Container } from '@styles/global';

import { AuthProvider } from '@context/auth';
import { ProductsProvider } from '@context/products';
// import { ThemeContext, ThemeProvider } from '@context/theme';

import Router from './router';

if (!isServer) {
  initI18n();
}

export const App: FC = () => {
  // const theme = useContextSelector(ThemeContext, (context) => context.theme);

  // globalStyles();

  localStorage.setItem(
    '@neo:coupon',
    JSON.stringify([
      {
        id: '1',
        title: '10OFF',
        price: 9.99,
      },
      {
        id: '2',
        title: '20OFF',
        price: 19.99,
      },
    ])
  );

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* <ThemeProvider> */}
          <ProductsProvider>
            {/* <Container className={theme}> */}
            <Router />
            {/* </Container> */}
          </ProductsProvider>
          {/* </ThemeProvider> */}
        </AuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
};
