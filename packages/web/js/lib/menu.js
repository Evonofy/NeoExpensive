import { useDebounce } from '../hooks/useDebounce.js';
import { useSelector } from '../hooks/useSelector.js';

export class Menu {
  hamburger = () => {
    /* hamburger script */
    /* hide profile when not logged in */
    /* TODO: check if user if logged in */
    const userChoices = useSelector(
      '.user--controls--customer--choices--item',
      {
        querySelectorAll: true,
      }
    );

    userChoices.forEach((choice) => {
      const findChoice = (name) =>
        choice?.querySelector('a')?.innerHTML === name;

      const isProfile = findChoice('Perfil');
      const isExit = findChoice('Sair');

      if (isProfile || isExit) {
        choice.style.display = 'none';
      }
    });

    const hamburgerButton = useSelector('.hamburger--header--button');

    if (hamburgerButton) {
      hamburgerButton.onclick = () => {
        document.body.classList.toggle('nav--open');
      };
    }
  };

  search = () => {
    /* search script */
    /* get input search el */
    const itemSearchInput = useSelector('header input', {
      querySelectorAll: true,
    });

    const handleSearchInput = (event) => {
      console.log(event.target.value);
    };

    itemSearchInput.forEach((input) => {
      input.addEventListener('keyup', useDebounce(handleSearchInput, 300));
    });
  };

  constructor({ hamburger = true, search = false }) {
    if (hamburger) {
      this.hamburger();
    }

    if (search) {
      this.search();
    }
  }
}
