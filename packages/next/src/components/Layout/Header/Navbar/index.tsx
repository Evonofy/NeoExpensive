import { FC, LiHTMLAttributes, useState, Children } from 'react';

import { useClamp } from '@hooks';
import { Link } from '@components';
import { NavbarList } from '@styles/components/header';

type NavbarProps = {
  rootFontSize: number;
};

export const Navbar: FC<NavbarProps> = ({ children, rootFontSize }) => {
  return (
    <nav>
      <NavbarList
        itemWidth={useClamp('4rem', '7rem', rootFontSize)}
        gap={useClamp('0.6rem', '2rem', rootFontSize)}
        fontSize={useClamp('0.7rem', '1rem', rootFontSize)}
      >
        {children}
      </NavbarList>
    </nav>
  );
};

interface NavbarItemProps extends LiHTMLAttributes<HTMLLIElement> {
  href: string;
  name: string;
  tabIndex: number;
  dataSub?: string;
  isIconNav?: boolean;
}

export const NavbarItem: FC<NavbarItemProps> = ({
  children,
  className,
  href,
  name,
  tabIndex,
  dataSub,
  isIconNav
}) => {
  const [open, setOpen] = useState(false);
  const [title, dropdown] = Children.toArray(children);

  return (
    <li data-short={isIconNav} className={className}>
      {isIconNav ? (
        <>
          <Link
            data-appearance
            onClick={() => setOpen(!open)}
            name={name}
            href={href}
            tabIndex={tabIndex}
          >
            {title}
          </Link>

          {open && dropdown}
        </>
      ) : (
        <>
          <Link
            onClick={() => setOpen(!open)}
            name={name}
            href={href}
            data-sub={dataSub}
            tabIndex={tabIndex}
          >
            {title}
          </Link>

          {open && dropdown}
        </>
      )}
    </li>
  );
};
