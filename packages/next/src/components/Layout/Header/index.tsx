import { FC, useEffect } from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Search,
  User,
  ShoppingCart
} from 'react-feather';

import { useClamp } from '@hooks';
import { Link } from '@components';
import { Navbar, NavbarItem } from './Navbar';
import { Dropdown } from './Dropdown';
import { HeaderContainer, X } from '@styles/components/header';

type HeaderProps = {
  rootFontSize: number;
};

export const Header: FC<HeaderProps> = ({ rootFontSize }) => {
  useEffect(() => {
    var menuItems = [].slice.call(document.querySelectorAll('.menu__item a')),
      menuSubs: any = [].slice.call(
        document.querySelectorAll('.dropdown-menu')
      ),
      selectedMenu = undefined,
      subBg: any = document.querySelector('.dropdown__bg'),
      subBgBtm: any = document.querySelector('.dropdown__bg-bottom'),
      subCnt: any = document.querySelector('.dropdown__wrap'),
      header = document.querySelector('header'),
      dropdownContainer: any = document.querySelector('.dropdown'),
      closeDropdownTimeout,
      startCloseTimeout = function () {
        closeDropdownTimeout = setTimeout(() => {
          closeDropdown();
        }, 200);
      },
      stopCloseTimeout = function () {
        clearTimeout(closeDropdownTimeout);
      },
      openDropdown = function (el) {
        dropdownContainer.classList.remove('hide');
        dropdownContainer.classList.add('show');

        console.log(el);
        //- get menu ID
        var menuId = el.getAttribute('data-sub');
        //- get related sub menu
        var menuSub: any = document.querySelector(
          '.dropdown-menu[data-sub="' + menuId + '"]'
        );
        //- get menu sub content
        var menuSubCnt = menuSub.querySelector('.dropdown-menu__content');
        //- get bottom section of current sub
        var menuSubBtm = menuSubCnt
          .querySelector('.bottom-section')
          .getBoundingClientRect();
        //- get height of top section
        var menuSubTop = menuSubCnt
          .querySelector('.top-section')
          .getBoundingClientRect();
        //- get menu position
        var menuMeta = el.getBoundingClientRect();
        //- get sub menu position
        var subMeta = menuSubCnt.getBoundingClientRect();

        //- set selected menu
        selectedMenu = menuId;

        //- Remove active Menu
        menuItems.forEach(el => el.classList.remove('active'));
        //- Set current menu to active
        el.classList.add('active');

        //- Remove active sub menu
        menuSubs.forEach(el => el.classList.remove('active'));
        //- Set current menu to active
        menuSub.classList.add('active');

        const isSmall = window.innerWidth <= 1440;

        const dropdown = {
          opacity: 1,
          left: isSmall
            ? '50%'
            : menuMeta.left - (subMeta.width / 2 - menuMeta.width / 2) + 'px',
          transform: isSmall ? 'translateX(-50%)' : '',
          width: `${subMeta.width}px`,
          height: `${subMeta.height}px`
        };

        //- Set dropdown menu background style to match current submenu style
        subBg.style.opacity = dropdown.opacity;
        subBg.style.left = dropdown.left;
        subBg.style.transform = dropdown.transform;
        subBg.style.width = dropdown.width;
        subBg.style.height = dropdown.height;

        //- Set dropdown menu bottom section background position
        subBgBtm.style.top = menuSubTop.height + 'px';

        //- Set sub menu style
        subCnt.style.opacity = dropdown.opacity;
        subCnt.style.left = dropdown.left;
        subCnt.style.transform = dropdown.transform;
        subCnt.style.width = dropdown.width;
        subCnt.style.height = dropdown.height;

        //- Set current sub menu style
        menuSub.style.opacity = 1;

        header.classList.add('dropdown-active');
      },
      closeDropdown = function () {
        //- Remove active class from all menu items
        menuItems.forEach(el => el.classList.remove('active'));
        //- Remove active class from all sub menus
        menuSubs.forEach(el => {
          el.classList.remove('active');
          el.style.opacity = 0;
        });
        //- set sub menu background opacity
        subBg.style.opacity = 0;
        //- set arrow opacity
        // subArr.style.opacity = 0;

        // unset selected menu
        selectedMenu = undefined;

        header.classList.remove('dropdown-active');
        dropdownContainer.classList.add('hide');
        dropdownContainer.classList.remove('show');
      };

    //- Binding mouse event to each menu items
    menuItems.forEach(el => {
      //- mouse enter event
      el.addEventListener('mouseenter', function () {
        stopCloseTimeout();
        openDropdown(this);
      });

      el.addEventListener('focus', function () {
        stopCloseTimeout();
        openDropdown(this);
      });

      el.addEventListener('blur', () => {
        startCloseTimeout();
      });

      //- mouse leave event
      el.addEventListener('mouseleave', () => {
        startCloseTimeout();
      });
    });

    //- Binding mouse event to each sub menus
    menuSubs.forEach(el => {
      el.addEventListener('click', () => {
        stopCloseTimeout();
        console.log('a');
      });
      el.addEventListener('mouseenter', () => stopCloseTimeout(), false);
      el.addEventListener('mouseleave', () => startCloseTimeout(), false);
    });

    subBg.addEventListener('mouseenter', () => stopCloseTimeout());
    subBg.addEventListener('mouseleave', () => startCloseTimeout());
  }, []);

  return (
    <HeaderContainer
      blockPadding={useClamp('1rem', '1.5rem', rootFontSize)}
      sidePadding={useClamp('1rem', '4rem', rootFontSize)}
      svgWidth={useClamp('0.5rem', '2rem', rootFontSize)}
      fontSize={useClamp('0.5rem', '1rem', rootFontSize)}
    >
      <div>
        <Facebook data-icon="facebook" />
        <Instagram />
        <Twitter />
      </div>

      <Navbar {...{ rootFontSize }}>
        <NavbarItem className="menu__item">
          <Link name="info" href="#" data-sub="info">
            Informática
          </Link>
        </NavbarItem>

        <NavbarItem className="menu__item">
          <Link name="consoles" href="#" data-sub="developer">
            Consoles
          </Link>
        </NavbarItem>

        <X data-reset width={useClamp('1rem', '2rem', rootFontSize)}>
          <svg
            data-icon="logo"
            width="44"
            height="44"
            viewBox="0 0 44 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.1043 20.532L42.3958 12.6669C43.3306 11.6586 43.3306 10.0086 42.3958 9.00023L35.5972 1.66682C34.6624 0.658473 33.1327 0.658473 32.1979 1.66682L24.9064 9.5319C24.6855 9.77023 24.5495 10.1002 24.5665 10.4486L24.5665 19.6153C24.5665 20.3487 25.0934 20.917 25.7732 20.917L34.2715 20.917C34.5774 20.917 34.8664 20.7887 35.1043 20.532ZM19.0936 9.5319L11.8021 1.66682C10.8673 0.658473 9.33758 0.658473 8.40277 1.66682L1.60416 9.00023C0.669353 10.0086 0.669353 11.6586 1.60416 12.6669L8.89567 20.532C9.11663 20.7703 9.42257 20.917 9.7455 20.8987L18.2438 20.8987C18.9236 20.8987 19.4505 20.3303 19.4505 19.597L19.4505 10.4302C19.4505 10.1002 19.3315 9.78857 19.0936 9.5319ZM8.89568 26.8021L1.60416 34.6672C0.669354 35.6755 0.669354 37.3255 1.60416 38.3339L8.40278 45.6673C9.33759 46.6756 10.8673 46.6756 11.8021 45.6673L19.0936 37.8022C19.3146 37.5638 19.4505 37.2338 19.4335 36.8855L19.4335 27.7187C19.4335 26.9854 18.9066 26.4171 18.2268 26.4171L9.7285 26.4171C9.42257 26.4171 9.13363 26.5454 8.89568 26.8021ZM34.2375 26.4171L25.7392 26.4171C25.0594 26.4171 24.5325 26.9854 24.5325 27.7187V36.8855C24.5325 37.2155 24.6515 37.5639 24.8724 37.8022L32.1809 45.6856C33.1157 46.6939 34.6454 46.6939 35.5802 45.6856L42.3788 38.3522C43.3136 37.3438 43.3136 35.6938 42.3788 34.6855L35.0873 26.8204C34.8664 26.5454 34.5774 26.4171 34.2375 26.4171Z"
              fill="#9A4BB4"
            />
          </svg>
        </X>

        <NavbarItem>
          <Link name="support" href="#">
            Suporte
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link name="about" href="#">
            Quem Somos
          </Link>
        </NavbarItem>
      </Navbar>

      <Dropdown rootFontSize={rootFontSize} />

      <div>
        <Search />
        <User />
        <ShoppingCart />
      </div>
    </HeaderContainer>
  );
};
