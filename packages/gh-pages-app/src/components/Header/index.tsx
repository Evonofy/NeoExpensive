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

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div id="menu" className={styles.menu}>
        <div className="social">
          <a href="#facebook">
            <SVGFacebook />
          </a>
          <a href="#instagram">
            <SVGInstagram />
          </a>
          <a href="#twitter">
            <SVGTwitter />
          </a>
        </div>

        <div className="logo">
          <a href="#neo">
            <SVGNeoExpensive />
          </a>
        </div>

        <div className="user">
          <a href="#search">
            <SVGSearch />
          </a>
          <a href="#user">
            <SVGUser />
          </a>
          <a href="#cart">
            <SVGCart />
          </a>
        </div>
      </div>
      <nav></nav>
    </header>
  );
};
