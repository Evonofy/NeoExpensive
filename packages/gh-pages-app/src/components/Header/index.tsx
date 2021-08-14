import { FC } from 'react';

import {
  SVGFacebook,
  SVGInstagram,
  SVGTwitter,
  SVGNeoExpensive,
  SVGSearch,
  SVGUser,
  SVGCart
} from '@icons';

import { Link } from '../';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div id="menu" className={styles.menu}>
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

      <nav></nav>
    </header>
  );
};
