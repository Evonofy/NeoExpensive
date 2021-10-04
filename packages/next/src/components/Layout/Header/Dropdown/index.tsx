import { FC } from 'react';

import { useClamp } from '@hooks';
import { Button } from '@components';
import { DropdownContainer, Info } from '@styles/components/dropdown';

interface DropdownProps {
  rootFontSize: number;
}

export const DropdownScript = () => {
  var menuItems = [].slice.call(document.querySelectorAll('.menu__item a')),
    menuSubs: any = [].slice.call(document.querySelectorAll('.dropdown-menu')),
    selectedMenu = undefined,
    subBg: any = document.querySelector('.dropdown__bg'),
    subBgBtm: any = document.querySelector('.dropdown__bg-bottom'),
    subCnt: any = document.querySelector('.dropdown__wrap'),
    header = document.querySelector('header'),
    dropdownContainer: any = document.querySelector('.dropdown'),
    infoDropdownLinks = document.querySelectorAll('#info a'),
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

    if (el.attributes['data-sub'].value === 'info') {
      infoDropdownLinks.forEach(link => {
        link.addEventListener('focus', function () {
          stopCloseTimeout();
          openDropdown(el);
        });
      });
    }

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
    el.addEventListener('focus', () => {
      stopCloseTimeout();
    });
    el.addEventListener('mouseenter', () => stopCloseTimeout(), false);
    el.addEventListener('mouseleave', () => startCloseTimeout(), false);
  });
  subBg.addEventListener('mouseenter', () => stopCloseTimeout());
  subBg.addEventListener('mouseleave', () => startCloseTimeout());
};

export const Dropdown: FC<DropdownProps> = ({ rootFontSize }) => {
  return (
    <DropdownContainer className="dropdown">
      <div className="dropdown__bg">
        <div className="dropdown__bg-bottom"></div>
      </div>

      <section className="dropdown__wrap">
        <Info
          titleSize={useClamp('0.6rem', '1.1rem', rootFontSize)}
          className="dropdown-menu"
          id="info"
          data-sub="info"
        >
          <div className="dropdown-menu__content">
            <div className="top-section">
              <div className="card">
                <img src="https://raw.githubusercontent.com/EsquemaFlorescer/neo-expensive/main/packages/web/images/info.svg" />
                <h2>Peças (HARDWARE)</h2>
                <ul>
                  <li>
                    <a tabIndex={2} href="#">
                      Processadores
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Placas De Vídeo
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Placas mãe
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Memórias
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Disco rígido hd/ssd
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      fontes
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card">
                <img
                  src="https://raw.githubusercontent.com/EsquemaFlorescer/neo-expensive/main/packages/web/images/platforms.svg"
                  alt=""
                />
                <h2>Periféricos e Acessórios</h2>
                <ul>
                  <li>
                    <a tabIndex={2} href="#">
                      Fones de Ouvido
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Teclados
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Mouses
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Controles
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bottom-section">
              <a href="#pcs">Computadores Montados</a>

              <Button rootFontSize={rootFontSize} variant="primary">
                Monte seu pc
              </Button>
            </div>
          </div>
        </Info>

        <div className="dropdown-menu" id="developer" data-sub="developer">
          <div className="dropdown-menu__content">
            <div className="top-section">dwad34433423434w34adwa</div>
            <div className="bottom-section">
              dswadaw23423423423423423423423waedwa
            </div>
          </div>
        </div>
      </section>
    </DropdownContainer>
  );
};
