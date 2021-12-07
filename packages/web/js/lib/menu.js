import { useDebounce } from '../hooks/useDebounce.js';
import { useSelector } from '../hooks/useSelector.js';
import { useAuth } from '../hooks/useAuth.js';

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

    const isLogged = useAuth();

    userChoices.forEach((choice) => {
      const findChoice = (name) =>
        choice?.querySelector('a')?.innerHTML === name;

      const isProfile = findChoice('Perfil');
      const isExit = findChoice('Sair');

      const isLogin = findChoice('Entrar');
      const isRegister = findChoice('Registrar-se');

      if (isExit) {
        choice.onclick = () => {
          console.log('logout');
          isLogged.clear();

          location.reload(true);
        };
      }

      if ((isProfile || isExit) && !isLogged) {
        choice.style.display = 'none';
      }

      if (isLogged && (isLogin || isRegister)) {
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
