import { FC } from 'react';

import { SVGNeoExpensive } from '@icons';

import styles from '@styles/splash.module.scss';

const Splash: FC = (): JSX.Element => {
  return (
    <div className={styles.splash}>
      <SVGNeoExpensive
        className={styles.icon}
        height={96}
        width={96}
        viewBox={`0 0 ${256} ${256}`}
        fill={null}
      />

      <div className={styles.tip}>
        <h6>Did you know?</h6>
        <small>We founded this because fuck it</small>
      </div>
    </div>
  );
};

export default Splash;
