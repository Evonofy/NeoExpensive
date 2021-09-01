import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Link } from '@components';
import { CSSTransition } from 'react-transition-group';

import styles from './Dropdown.module.scss';

interface DropdownItemProps {
  children: ReactNode | ReactNode[];
  leftIcon?: FC;
  rightIcon?: FC;
}

export const Dropdown: FC = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuheight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  return (
    <ul className={styles.dropdownContainer}>
      <DropdownItem>
        <>level 1</>
        <DropdownItem>level 2</DropdownItem>
        <DropdownItem>level 2</DropdownItem>
        <DropdownItem>
          <>level 2</>
          <DropdownItem>level 3</DropdownItem>
        </DropdownItem>
      </DropdownItem>
      <DropdownItem>
        <>nintendo</>
        <DropdownItem>level 2</DropdownItem>
        <DropdownItem>level 2</DropdownItem>
        <DropdownItem>level 2</DropdownItem>
        <DropdownItem>level 2</DropdownItem>
      </DropdownItem>
    </ul>
  );
};

const DropdownItem: FC<DropdownItemProps> = ({
  children,
  leftIcon,
  rightIcon
}) => {
  let items: [] = [];

  if (Array.isArray(children)) {
    // @ts-ignore
    items = children.map(item => {
      if (children.indexOf(item) === 0) {
        return;
      }

      return item;
    });
  }

  return (
    <>
      {Array.isArray(children) === true ? (
        <>
          <li>
            <Link name="a" url="#" className={styles.menuItem}>
              <span className={styles.iconButton}>{leftIcon}</span>
              {children[0]}
              <span className={styles.iconRight}>{rightIcon}</span>
            </Link>

            <ul>
              {items.map(item => {
                return item;
              })}
            </ul>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link name="a" url="#">
              <span className={styles.iconButton}>{leftIcon}</span>
              {children}
              <span className={styles.iconRight}>{rightIcon}</span>
            </Link>
          </li>
        </>
      )}
    </>
  );
};
