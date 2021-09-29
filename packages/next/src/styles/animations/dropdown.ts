import { keyframes } from 'styled-components';

export const hide = keyframes`
  0% {
    opacity: 1;
    z-index: 1;
  }

  99% {
    opacity: 0;
  }

  100% {
    z-index: -1;
  }
`;

export const show = keyframes`
  0% {
    z-index: 1;
  }

  1% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
