import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ArrowRight } from 'react-feather';

import { Link } from '@components';
import {
  UserDropdownContainer,
  UserInfoContainer,
  Divider
} from '@styles/components/userDropdown';

type UserDropdownProps = {
  headerBlockPadding: string;
  XSizePadding: string;
};

export const UserDropdown: FC<UserDropdownProps> = ({
  headerBlockPadding,
  XSizePadding
}) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeigt] = useState(null);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    setMenuHeigt(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  const calcHeight = (element: any) => {
    const height = element.offsetHeight;
    setMenuHeigt(height);
  };

  type DropdownItemProps = {
    goToMenu?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

  const DropdownItem: FC<DropdownItemProps> = ({
    goToMenu,
    leftIcon,
    rightIcon,
    children
  }) => {
    return (
      <Link
        name={goToMenu || ''}
        href="#"
        className="menu-item"
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-button">{rightIcon}</span>
      </Link>
    );
  };

  return (
    <UserDropdownContainer
      headerBlockPadding={headerBlockPadding}
      XSizePadding={XSizePadding}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <UserInfoContainer>
            <strong>User</strong>

            <img
              src={`https://avatars.dicebear.com/api/jdenticon/seed:${new Date()
                .getTime()
                .toString()}.svg`}
            />

            <ArrowRight size={18} />
          </UserInfoContainer>

          <Divider />
          <DropdownItem goToMenu="settings">Settings</DropdownItem>
          <DropdownItem leftIcon="🦧" goToMenu="animals">
            Animals
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <h6>My Tutorial</h6>
          </DropdownItem>
          <DropdownItem>HTML</DropdownItem>
          <DropdownItem>CSS</DropdownItem>
          <DropdownItem>JavaScript</DropdownItem>
          <DropdownItem>Awesome!</DropdownItem>
          <DropdownItem>Awesome!</DropdownItem>
          <DropdownItem>Awesome!</DropdownItem>
          <DropdownItem>Awesome!</DropdownItem>
          <DropdownItem>Awesome!</DropdownItem>
          <DropdownItem>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </UserDropdownContainer>
  );
};
