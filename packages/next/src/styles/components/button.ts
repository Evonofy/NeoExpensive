import styled, { css, keyframes } from 'styled-components';

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  
  to {
    opacity: 1;
    transform: translateX(-50%);  
  }
`;

const buttonMark = (variant: 'primary' | 'secondary' | 'tertiary') => {
  return css`
    &::after {
      content: '';
      position: absolute;

      left: 50%;
      bottom: -0.5rem;
      transform: translateX(-100%);

      width: 1.25rem;
      height: clamp(0.08rem, 1vw, 0.15rem);

      background: ${({ theme }) => theme.color.accent[200]};

      ${props =>
        variant === 'tertiary' &&
        css`
          background: ${props.theme.color.gray[500]};
        `}

      border-radius: 0.2rem;

      animation: ${appear} 200ms forwards;
    }
  `;
};

type ButtonContainerProps = {
  blockPadding: string;
  sidePadding: string;
  variant: 'primary' | 'secondary' | 'tertiary';
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: ${props => props.blockPadding} ${props => props.sidePadding};

  border-radius: 0.2rem;

  position: relative;

  font-weight: bold;

  color: ${props => props.theme.color.gray[100]};

  transition: all 200ms;

  &:focus {
    outline: 0;
    border: 0;
    ${buttonMark('primary')}
  }

  ${props =>
    props.variant === 'primary' &&
    css`
      background: ${props.theme.color.accent[200]};

      &:hover {
        background: ${props.theme.color.accent[100]} !important;
      }

      &:focus {
        color: ${props.theme.color.gray[200]} !important;
        background: ${props.theme.color.accent[300]} !important;
      }

      &:disabled {
        background: ${props.theme.color.accent[300]};
      }
    `}

  ${props =>
    props.variant === 'secondary' &&
    css`
      background: transparent;
      border: 2px solid ${props.theme.color.accent[200]};

      &:hover {
        border-color: ${props.theme.color.accent[100]};
      }

      &:disabled {
        color: ${props.theme.color.gray[200]};
        border-color: ${props.theme.color.accent[300]};
      }
    `}

  ${props =>
    props.variant === 'tertiary' &&
    css`
      background: ${props.theme.color.gray[500]};

      &:hover {
        border-color: ${props.theme.color.accent[100]};
      }

      &:focus {
        ${buttonMark('tertiary')}
      }

      &:disabled {
        color: ${props.theme.color.gray[200]};
        border-color: ${props.theme.color.accent[300]};
      }
    `}
`;
