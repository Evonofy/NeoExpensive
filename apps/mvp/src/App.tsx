import { FC, Suspense } from 'react';
import { useContextSelector } from 'use-context-selector';

import { initI18n } from '@lib/i18n';
import { isServer } from '@lib/constants';

import { globalStyles, Container } from '@styles/global';

import { AuthProvider } from '@context/auth';
import { ThemeContext, ThemeProvider } from '@context/theme';

import { Router } from './router';

if (!isServer) {
  initI18n();
}

export const App: FC = () => {
  const theme = useContextSelector(ThemeContext, (context) => context.theme);

  globalStyles();

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <AuthProvider>
        <ThemeProvider>
          <Container className={theme}>
            <Router />
          </Container>
        </ThemeProvider>
      </AuthProvider>
    </Suspense>
  );
};
