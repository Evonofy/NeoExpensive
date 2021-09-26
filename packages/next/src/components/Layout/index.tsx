import { FC } from 'react';

import { Header } from './Header';

import { LayoutContainer } from '@styles/components/layout';

type LayoutProps = {
  rootFontSize: number;
};

export const Layout: FC<LayoutProps> = ({ children, rootFontSize }) => {
  return (
    <LayoutContainer>
      <Header {...{ rootFontSize }} />
      {children}
    </LayoutContainer>
  );
};
