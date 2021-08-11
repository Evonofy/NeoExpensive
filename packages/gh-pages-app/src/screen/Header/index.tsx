import { FC, useCallback, useMemo, memo } from 'react';

import { remote } from 'electron';
import os from 'os';

import { useConfig, getWindowBounds } from '@hooks';
import { SVGSolidClose, SVGSolidMaximize, SVGSolidMinus } from '@icons';
import styles from './Header.module.scss';

const Header: FC = (): JSX.Element => {
  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow();

    window.close();
  }, []);

  const handleMaximize = useCallback(() => {
    const window = remote.getCurrentWindow();

    const isMacOs = os.platform() === 'darwin';

    if (isMacOs) {
      return window.setFullScreen(!window.isFullScreen());
    }

    /** get window screen size */
    const { width: currentWidth, height: currentHeight } = window.getBounds();

    /** get user screen size */
    const { width: maxWidth, height: maxHeight } =
      remote.screen.getPrimaryDisplay().workAreaSize;

    const isMaximized =
      currentWidth === maxWidth && currentHeight === maxHeight;

    if (!isMaximized) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }, []);

  const handleMinimize = useCallback(() => {
    const window = remote.getCurrentWindow();

    window.minimize();
  }, []);

  const useMacOSWindowActionButtons = useConfig('useMacOSWindowActionButtons');

  const shouldUseMacOSWindowActions = useMemo(() => {
    return useMacOSWindowActionButtons || os.platform() === 'darwin';
  }, [useMacOSWindowActionButtons]);

  return (
    <>
      <header className={styles.container}>
        <strong>Neo Expensive</strong>

        {shouldUseMacOSWindowActions ? (
          <div data-position="left" className={styles.WindowActions}>
            <button
              className={styles.MacActionButton}
              onClick={handleCloseWindow}
            >
              <SVGSolidClose data-fn="close" width={24} height={24} />
            </button>

            <button className={styles.MacActionButton} onClick={handleMinimize}>
              <SVGSolidMinus data-fn="minimize" width={24} height={24} />
            </button>

            <button className={styles.MacActionButton} onClick={handleMaximize}>
              <SVGSolidMaximize data-fn="maximize" width={24} height={24} />
            </button>
          </div>
        ) : (
          <div data-position="right" className={styles.WindowActions}>
            <button
              className={styles.DefaultActionButton}
              onClick={handleMinimize}
            >
              <SVGSolidMinus data-fn="minimize" width={24} height={24} />
            </button>

            <button
              className={styles.DefaultActionButton}
              onClick={handleMaximize}
            >
              <SVGSolidMaximize data-fn="maximize" width={24} height={24} />
            </button>

            <button
              className={styles.DefaultActionButton}
              onClick={handleCloseWindow}
            >
              <SVGSolidClose data-fn="close" width={24} height={24} />
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default memo(Header);
