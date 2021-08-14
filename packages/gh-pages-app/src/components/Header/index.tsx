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
      <div id="menu"></div>
      <SVGFacebook color="blue" strokeWidth="4px" width={70} />
      <SVGInstagram color="purple" strokeWidth="5px" width={70} />
      <SVGTwitter color="purple" strokeWidth="5px" width={70} />
      <SVGNeoExpensive color="blue" />
      <SVGSearch color="blue" />
      <SVGUser />
      <SVGCart />
    </header>
  );
};
