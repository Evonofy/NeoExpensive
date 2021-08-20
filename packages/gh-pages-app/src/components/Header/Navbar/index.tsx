import { FC } from 'react';

import { Link } from '@components';

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

  return (
    <li data-active={active} key={id} className={styles.navbarItem}>
      <Link name={name} url={url}>
        <button>{name}</button>
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
              return <NavbarItem active={true} page={page} />;
            }
          }

          return <NavbarItem page={page} />;
        })}
      </ul>
    </nav>
  );
};
