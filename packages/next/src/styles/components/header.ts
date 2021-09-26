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

  svg {
    width: ${props => props.svgWidth};
    height: auto;
  }

  li {
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
    padding: 0.3rem 0;

    transition: background 200ms ease;

    &:hover {
      background: ${({ theme }) => theme.color.accent[200]};
    }

    border-radius: 0.3rem;

    a {
      width: 100%;
      height: 100%;
    }
  }
`;

type XProps = {
  width: string;
};

export const X = styled.a<XProps>`
  width: ${props => props.width};
`;
