import { css } from 'styled-components';

export const Fonts = css`
  h1,
  h2,
  h3 {
    font-weight: 700;
    color: ${props => props.theme.color.gray[100]};
  }

  h1 {
    font-family: ${props => props.theme.font.bebas};
  }

  h2,
  h3 {
    font-family: ${props => props.theme.font.montserrat};
  }

  li,
  a,
  p,
  small {
    color: ${props => props.theme.color.gray[200]};
    font-family: ${props => props.theme.font.josefin};
  }
`;
