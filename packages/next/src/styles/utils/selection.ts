import { css } from 'styled-components';

const translucidAccent = css`
  background: hsla(280, 60%, 50%, 0.2);
`;

export const selection = css`
  ::selection {
    color: ${props => props.theme.color.accent[200]};
    ${translucidAccent}
  }

  ::-webkit-selection {
    color: ${props => props.theme.color.accent[200]};
    ${translucidAccent}
  }
`;
