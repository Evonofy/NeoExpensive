import { FC } from 'react';

import { Header, Footer } from '../';

export const Layout: FC = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
