import { createGlobalStyle } from 'styled-components';

import { scrollbar } from './utils/scrollbar';
import { selection } from './utils/selection';
import { Fonts } from './fonts/fonts';

export const gray = {
  hue: 200,
  saturation: 8
};

export const accent = {
  hue: 280,
  saturation: 50
};

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: ${props => props.theme.font.montserrat};
  }

  html {
    scroll-behavior: smooth;
  }

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
    
    color: ${props => props.theme.color.gray[100]};
    background: ${props => props.theme.color.gray[800]};
  }

  :focus {
    outline: 0;
  }

  ul {
    list-style: none;
  }

  button {
    background: transparent;
    border: 0;
    padding: 0;
  }

  a, button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  [data-logo] {
    padding: 0 clamp(0.5rem, 1vw, 2rem);
    display: inline;
  }

  [data-reset] {
    margin: 0;
    padding: 0;

    color: inherit;
    background: transparent;

    display: grid;
    place-items: center;
  }

  svg {
    stroke: ${props => props.theme.color.gray[100]};
    transition: all 200ms;

    /* make facebook logo visually balanced */
    &[data-icon="facebook"] {
      margin-right: -4px;
    }

    &:hover:not([data-icon="logo"]), &:focus:not([data-icon="logo"]) {
      cursor: pointer;
      stroke: ${props => props.theme.color.accent[200]};
    }
    
    &[data-icon="logo"] {
      stroke: none;

      &:hover {
        path {
          fill: ${props => props.theme.color.accent[300]};
        }
      }
    }
  }

  :root {
  --bg:  #242526;
  --bg-accent: #484a4d;
  --text-color: #dadce1;
  --nav-size: 72px;
  --border: 1px solid #474a4d;
  --border-radius: 8px;
  --speed: 500ms; 
}

.menu {
  width: 100%;
  flex-direction: column;
  padding: 1rem 0px;
}

.menu-item {
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  transition: background var(--speed);
  padding: 0.5rem;
}

.menu-item .icon-button {
  margin-right: 0.5rem;
}


.menu-item .icon-button:hover {
  filter: none;
}

.menu-item:hover {
  background-color: #525357;
}

.icon-right {
  margin-left: auto;
}

/* CSSTransition classes  */
.menu-primary-enter {
  position: absolute;
  transform: translateX(-110%);
}
.menu-primary-enter-active {
  transform: translateX(0%);
  transition: all var(--speed) ease;
}
.menu-primary-exit {
  position: absolute;
}
.menu-primary-exit-active {
  transform: translateX(-110%);
  transition: all var(--speed) ease;
}


.menu-secondary-enter {
  transform: translateX(110%);
}
.menu-secondary-enter-active {
  transform: translateX(0%);
  transition: all var(--speed) ease;
}
.menu-secondary-exit {

}
.menu-secondary-exit-active {
  transform: translateX(110%);
  transition: all var(--speed) ease;
}

  ${Fonts}
  ${scrollbar}
  ${selection}
`;
