import { css } from 'styled-components';

export const scrollbar = css`
  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.color.gray[900]};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    border: 7px solid transparent;
    background-clip: content-box;
    background-color: ${props => props.theme.color.gray[500]};

    &:hover {
      background-color: ${props => props.theme.color.accent[200]};
      cursor: pointer;
    }
  }
`;
