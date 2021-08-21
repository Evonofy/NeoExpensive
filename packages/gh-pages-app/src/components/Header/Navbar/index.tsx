import { FC, RefAttributes } from 'react';
import { IconProps } from 'phosphor-react';

import { Link } from '@components';
import { SVGComputer, SVGController, SVGUserAdd, SVGUsers } from '@icons';

import styles from './Navbar.module.scss';

interface Page {
  id: number;
  name: string;
  url: string;
}

interface NavbarItemProps {
  page: Page;
  active?: boolean;
}

interface NavbarProps {
  pages: Page[];
}

export const NavbarItem: FC<NavbarItemProps> = ({ page, active = false }) => {
  const { id, name, url } = page;

  let icon: IconProps & RefAttributes<SVGSVGElement>;

  switch (url) {
    case 'info':
      icon = <SVGComputer />;
      break;

    case 'platforms':
      icon = <SVGController />;
      break;

    case 'support':
      icon = <SVGUserAdd />;
      break;

    case 'about':
      icon = <SVGUsers />;
      break;
  }

  return (
    <li data-active={active} key={id} className={styles.navbarItem}>
      <Link name={name} url={url}>
        {icon}
        {name}
      </Link>
    </li>
  );
};

export const Navbar: FC<NavbarProps> = ({ pages }) => {
  return (
    <nav className={styles.navbarContainer}>
      <ul>
        {pages.map(page => {
          if (typeof window !== 'undefined') {
            const currentPage = window.location.href.split('/')[4];
            const isCurrentPage = currentPage === page.name;

            if (isCurrentPage) {
              return <NavbarItem key={page.id} active={true} page={page} />;
            }
          }

          return <NavbarItem key={page.id} page={page} />;
        })}
      </ul>
    </nav>
  );
};
