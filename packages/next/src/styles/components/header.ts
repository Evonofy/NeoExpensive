import styled, { css } from 'styled-components';

type HeaderContainerProps = {
  blockPadding: string;
  sidePadding: string;
  svgWidth: string;
  fontSize: string;
};

export const HeaderContainer = styled.header<HeaderContainerProps>`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 2px solid ${props => props.theme.color.accent[200]};

  background: ${props => props.theme.color.gray[900]};

  position: relative;

  svg {
    width: ${props => props.svgWidth};
    height: auto;
  }

  li {
    color: ${props => props.theme.color.gray[100]};
    font-size: ${props => props.fontSize};
  }

  ${props =>
    props.blockPadding &&
    css`
      padding-top: ${props.blockPadding};
      padding-bottom: ${props.blockPadding};
    `}

  ${props =>
    props.sidePadding &&
    css`
      padding-left: ${props.sidePadding};
      padding-right: ${props.sidePadding};
    `}

  div {
    display: flex;
    gap: 0.5rem;
  }
`;

type NavbarListProps = {
  itemWidth: string;
  fontSize: string;
  gap: string;
};

export const NavbarList = styled.ul<NavbarListProps>`
  display: flex;
  align-items: center;

  gap: ${props => props.gap};
  font-size: ${props => props.fontSize};

  li {
    width: ${props => props.itemWidth};
    text-align: center;

    cursor: pointer;

    &[data-short='true'] {
      width: auto;
    }

    a {
      border-radius: 0.3rem;
      padding: 0.3rem 0;
      width: 100%;
      height: 100%;
      transition: background 200ms ease;

      &:hover,
      &:focus {
        outline: 0;
        color: #fff;
        background: ${({ theme }) => theme.color.accent[200]};
      }

      &[data-appearance] {
        &:hover,
        &:focus {
          outline: 0;
          color: unset !important;
          background: unset !important;
        }
      }
    }
  }
`;

type XProps = {
  width: string;
};

export const X = styled.a<XProps>`
  width: ${props => props.width};
`;
