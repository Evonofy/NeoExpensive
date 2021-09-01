import { FC } from 'react';

import {
  SVGFacebook,
  SVGInstagram,
  SVGTwitter,
  SVGNeoExpensive,
  SVGSearch,
  SVGUser,
  SVGCart,
  SVGComputer,
  SVGController,
  SVGUserAdd,
  SVGUsers
} from '@icons';
import { Link } from '@components';
import { Navbar, NavbarItem } from './Navbar';
import { Dropdown, DropdownItem } from './Navbar/Dropdown';

import pages from './pages.json';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.menu}>
        <div className="social">
          <Link name="Facebook" url="#facebook">
            <SVGFacebook />
          </Link>
          <Link name="Instagram" url="#instagram">
            <SVGInstagram />
          </Link>
          <Link name="Twitter" url="#twitter">
            <SVGTwitter />
          </Link>
        </div>

        <div className="logo">
          <Link name="Neo Expensive" url="#">
            <SVGNeoExpensive />
          </Link>
        </div>

        <div className="user">
          <Link name="Search" url="#search">
            <SVGSearch />
          </Link>
          <Link name="user" url="#user">
            <SVGUser />
          </Link>
          <Link name="cart" url="#cart">
            <SVGCart />
          </Link>
        </div>
      </div>

      <Navbar>
        <ul>
          <NavbarItem title="Informática" icon={SVGComputer}>
            <Dropdown>a</Dropdown>
          </NavbarItem>
          <NavbarItem title="Informática" icon={SVGComputer} />
          <NavbarItem title="Informática" icon={SVGComputer} />
          <NavbarItem title="Informática" icon={SVGComputer} />
        </ul>
      </Navbar>
    </header>
  );
};
