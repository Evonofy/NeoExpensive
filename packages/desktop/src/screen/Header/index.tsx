import React, { useCallback, useMemo, memo } from 'react';
import { FiX, FiMinus, FiMaximize2, FiSquare } from 'react-icons/fi';
import { remote } from 'electron';
import os from 'os';
import { useConfig } from '../../hooks/useConfig';
import {
  Container,
  WindowActions,
  MacActionButton,
  DefaultActionButton
} from './styles';

const Header: React.FC = () => {
  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow();

    window.close();
  }, []);

  const handleMaximize = useCallback(() => {
    const window = remote.getCurrentWindow();

    const isMacSystem = os.platform() === 'darwin';
    if (isMacSystem) {
      return window.setFullScreen(!window.isFullScreen());
    }

    const { width: currentWidth, height: currentHeight } = window.getBounds();

    const {
      width: maxWidth,
      height: maxHeight
    } = remote.screen.getPrimaryDisplay().workAreaSize;

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
    <Container>
      <strong>Neo Expensive</strong>
      <svg
        width="16"
        height="16"
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M830.028 441.286L1006.99 264.402C1029.67 241.724 1029.67 204.615 1006.99 181.937L841.991 17.0082C819.303 -5.6694 782.179 -5.66943 759.493 17.0082L582.536 193.894C577.173 199.254 573.873 206.676 574.286 214.51V420.67C574.286 437.163 587.072 449.947 603.571 449.947H809.816C817.24 449.947 824.252 447.059 830.028 441.286ZM441.465 193.894L264.508 17.0082C241.821 -5.66943 204.697 -5.6694 182.01 17.0082L17.015 181.937C-5.67167 204.615 -5.6717 241.724 17.015 264.402L193.972 441.286C199.335 446.648 206.759 449.947 214.597 449.533H420.84C437.339 449.533 450.128 436.751 450.128 420.258V214.098C450.128 206.676 447.239 199.667 441.465 193.894ZM193.972 582.302L17.015 759.186C-5.67167 781.864 -5.67167 818.973 17.015 841.651L182.01 1006.58C204.697 1029.26 241.821 1029.26 264.508 1006.58L441.465 829.696C446.828 824.334 450.128 816.912 449.715 809.079V602.918C449.715 586.425 436.926 573.641 420.427 573.641L214.184 573.644C206.759 573.644 199.747 576.529 193.972 582.302ZM808.99 573.644L602.748 573.641C586.249 573.641 573.46 586.425 573.46 602.918V809.079C573.46 816.5 576.349 824.334 581.709 829.696L759.08 1006.99C781.765 1029.67 818.889 1029.67 841.578 1006.99L1006.57 842.065C1029.26 819.388 1029.26 782.279 1006.57 759.601L829.615 582.714C824.252 576.529 817.24 573.641 808.99 573.644Z"
          fill="#8B46A3"
        />
      </svg>

      {shouldUseMacOSWindowActions ? (
        <WindowActions position="left" shouldShowIconsOnHover>
          <MacActionButton color="close" onClick={handleCloseWindow}>
            <FiX strokeWidth="4px" />
          </MacActionButton>
          <MacActionButton color="minimize" onClick={handleMinimize}>
            <FiMinus strokeWidth="3px" />
          </MacActionButton>
          <MacActionButton color="maximize" onClick={handleMaximize}>
            <FiMaximize2 strokeWidth="3px" />
          </MacActionButton>
        </WindowActions>
      ) : (
        <WindowActions position="right">
          <DefaultActionButton role="minus" onClick={handleMinimize}>
            <FiMinus />
          </DefaultActionButton>
          <DefaultActionButton role="fullscreen" onClick={handleMaximize}>
            <FiSquare />
          </DefaultActionButton>
          <DefaultActionButton role="close" onClick={handleCloseWindow}>
            <FiX />
          </DefaultActionButton>
        </WindowActions>
      )}
    </Container>
  );
};

export default memo(Header);
