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

    &[data-icon="logo"] {
      stroke: none;

      &:hover {
        fill: ${props => props.theme.color.accent[200]};
      }
    }

    &:hover, &:focus {
      cursor: pointer;
      stroke: ${props => props.theme.color.accent[200]};
    }
  }

  ${Fonts}
  ${scrollbar}
  ${selection}
`;
