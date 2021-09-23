import { Theme } from './themes/index.js';

/** Global theme */
const localTheme = localStorage.getItem('theme');

var theme = new Theme(localTheme);

/** When localStorage changes, change the theme */
window.addEventListener(
  'storage',
  event => (theme = new Theme(event.newValue))
);

export { theme };

var menuItems = [].slice.call(document.querySelectorAll('.menu__item')),
  menuSubs = [].slice.call(document.querySelectorAll('.dropdown-menu')),
  selectedMenu = undefined,
  subBg = document.querySelector('.dropdown__bg'),
  subBgBtm = document.querySelector('.dropdown__bg-bottom'),
  subCnt = document.querySelector('.dropdown__wrap'),
  header = document.querySelector('header'),
  closeDropdownTimeout,
  startCloseTimeout = function () {
    closeDropdownTimeout = setTimeout(() => closeDropdown(), 200);
  },
  stopCloseTimeout = function () {
    clearTimeout(closeDropdownTimeout);
  },
  openDropdown = function (el) {
    //- get menu ID
    var menuId = el.getAttribute('data-sub');
    //- get related sub menu
    var menuSub = document.querySelector(
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
  };

//- Binding mouse event to each menu items
menuItems.forEach(el => {
  //- mouse enter event
  el.addEventListener(
    'mouseenter',
    function () {
      stopCloseTimeout();
      openDropdown(this);
    },
    false
  );

  //- mouse leave event
  el.addEventListener('mouseleave', () => startCloseTimeout(), false);
});

//- Binding mouse event to each sub menus
menuSubs.forEach(el => {
  el.addEventListener('click', () => stopCloseTimeout(), false);
  el.addEventListener('mouseenter', () => stopCloseTimeout(), false);
  el.addEventListener('mouseleave', () => startCloseTimeout(), false);
});

subBg.addEventListener('mouseenter', () => stopCloseTimeout());
subBg.addEventListener('mouseleave', () => startCloseTimeout());
