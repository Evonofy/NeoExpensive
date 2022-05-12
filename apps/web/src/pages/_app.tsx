import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { StorageProvider } from '../context/StorageContext';
import { AuthProvider } from '../context/AuthContext';
import { SettingsProvider } from '../context/SettingsContext';

import 'normalize.css';
import '../styles/global.scss';

const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // console.log('Hold Up!');
  // console.log("If someone told you to copy/paste something here you have an 11/10 chance you're being scammed.");
  // console.log('Pasting anything in here could give attackers access to your Discord account.');
  // console.log('Unless you understand exactly what you are doing, close this window and stay safe.');
  // console.log('If you do understand exactly what you are doing, you should come work with us https://neo-florescence.github.io/neo-expertise/jobs');

  return (
    <QueryClientProvider client={queryClient}>
      <StorageProvider>
        <AuthProvider>
          <SettingsProvider>
            <Component {...pageProps} />
          </SettingsProvider>
        </AuthProvider>
      </StorageProvider>
    </QueryClientProvider>
  );
};

export default App;
