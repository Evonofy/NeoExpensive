import { useDebounce } from '../hooks/useDebounce.js';
import { useSelector } from '../hooks/useSelector.js';
import { useFetch } from '../hooks/useFetch.js';
import { useAuth } from '../hooks/useAuth.js';
import { redirect } from '../functions/redirect.js';

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
    /* fetch all items, store on cache */

    const auth = useAuth();

    if (!auth) {
      // reload the page
      return;
    }

    const { token } = auth;

    /* search script */
    /* get input search el */
    const itemSearchInput = useSelector('header input', {
      querySelectorAll: true,
    });

    const handleSearchInput = async (event) => {
      const name = event.target.value;
      /* retrieve new items and use old ones from cache */
      /* call search fetch api here */
      const { data } = await useFetch.get(`/item?name=${name}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const { items } = data;
      console.log(items);
    };

    itemSearchInput.forEach((input) => {
      input.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          /* redirect to catalog page */
          redirect(`/pages/items/?=${event.target.value}`);
        }
      });

      input.addEventListener('keyup', useDebounce(handleSearchInput, 300));
    });
  };

  // createSearchElement = (item) => {
  //   const
  // }

  constructor({ hamburger = true, search = false }) {
    if (hamburger) {
      this.hamburger();
    }

    if (search) {
      this.search();
    }
  }
}
