import { FC, ReactNode } from 'react';
import SiteNav, { ContentGroup } from 'react-site-nav';

import { useClamp } from '@hooks';
import { NavbarList } from '@styles/components/header';

type NavbarProps = {
  rootFontSize: number;
};

export const Navbar: FC<NavbarProps> = ({ children, rootFontSize }) => {
  return (
    <nav>
      <NavbarList
        itemWidth={useClamp('4rem', '7rem', rootFontSize)}
        gap={useClamp('0.6rem', '2rem', rootFontSize)}
        fontSize={useClamp('0.7rem', '1rem', rootFontSize)}
      >
        {children}
      </NavbarList>
    </nav>
  );
};

export const NavbarItem: FC = ({ children }) => {
  return <li>{children}</li>;
};
