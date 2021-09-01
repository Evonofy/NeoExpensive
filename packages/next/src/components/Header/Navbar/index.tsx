import { FC, RefAttributes } from 'react';
import { IconProps } from 'phosphor-react';

import { Link } from '@components';

import styles from './Navbar.module.scss';

interface NavbarItemProps {
  title: string;
  icon?: FC<IconProps & RefAttributes<SVGSVGElement>>;
}

export const Navbar: FC = ({ children }) => {
  return <nav className={styles.navbarContainer}>{children}</nav>;
};

export const NavbarItem: FC<NavbarItemProps> = ({ icon, children, title }) => {
  let active = true;
  return (
    <li data-active={active} key={title} className={styles.navbarItem}>
      <Link name={title} url={'#'}>
        {icon}
        {title}
      </Link>
      {children}
    </li>
  );
};
