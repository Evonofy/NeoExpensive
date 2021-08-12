import styled, { css } from 'styled-components';

import { defaultTheme } from '../../styles/theme';

export const Container = styled.header`
  width: 100%;
  height: 40px;
  position: relative;

  -webkit-user-select: none;
  -webkit-app-region: drag;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid ${props => props.theme.backgrounds.lightest};

  strong {
    font-size: 13px;
    font-weight: 400;
    color: ${props => props.theme.colors.grey};
  }

  svg {
    position: absolute;
    right: 16px;

    path {
      fill: none;
      animation: rgb 4s infinite;
    }
  }

  @keyframes rgb {
    100%,
    0% {
      fill: rgb(255, 0, 0);
    }
    8% {
      fill: rgb(255, 127, 0);
    }
    16% {
      fill: rgb(255, 255, 0);
    }
    24% {
      fill: rgb(127, 255, 0);
    }
    32% {
      fill: rgb(0, 255, 0);
    }
    40% {
      fill: rgb(0, 255, 127);
    }
    48% {
      fill: rgb(0, 255, 255);
    }
    56% {
      fill: rgb(0, 127, 255);
    }
    64% {
      fill: rgb(0, 0, 255);
    }
    72% {
      fill: rgb(127, 0, 255);
    }
    80% {
      fill: rgb(255, 0, 255);
    }
    88% {
      fill: rgb(255, 0, 127);
    }
  }
`;

interface WindowActionsProps {
  position: 'left' | 'right';
  shouldShowIconsOnHover?: boolean;
}

export const WindowActions = styled.div<WindowActionsProps>`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;

  ${props =>
    props.position === 'left'
      ? css`
          left: 16px;
        `
      : css`
          right: 16px;
        `};
  ${props =>
    props.shouldShowIconsOnHover &&
    css`
      &:hover svg {
        display: block;
      }
    `}
`;

interface MacActionButtonProps {
  color: 'close' | 'minimize' | 'maximize';
}

const colors = {
  close: defaultTheme.colors.red,
  minimize: defaultTheme.colors.yellow,
  maximize: defaultTheme.colors.green
};

export const MacActionButton = styled.button<MacActionButtonProps>`
  background: ${props => colors[props.color]};
  -webkit-app-region: no-drag;
  border: 0;
  width: 12px;
  height: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  & + button {
    margin-left: 8px;
  }

  svg {
    width: 8px;
    height: 8px;
    opacity: 0.9;
    display: none;
  }

  &:hover svg {
    display: block;
  }

  &:active {
    opacity: 0.6;
  }

  &:focus {
    outline: 0;
  }
`;

interface DefaultActionButton {
  role: 'close' | 'minus' | 'fullscreen';
}

export const DefaultActionButton = styled.button<DefaultActionButton>`
  background: transparent;
  -webkit-app-region: no-drag;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.grey};

  & + button {
    margin-left: 12px;
  }

  &:hover svg {
    color: ${props => props.theme.colors.white};
  }

  &:active {
    opacity: 0.6;
  }

  &:focus {
    outline: 0;
  }

  ${props =>
    props.role === 'close'
      ? css`
          svg {
            width: 22px !important;
            height: 22px !important;
          }
        `
      : css`
          svg {
            width: 16px;
            height: 16px;
          }
        `}
`;
