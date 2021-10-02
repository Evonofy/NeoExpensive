import styled, { css } from 'styled-components';

type UserDropdownProps = {
  headerBlockPadding: string;
  XSizePadding: string;
};

export const UserDropdownContainer = styled.div<UserDropdownProps>`
  position: absolute;
  ${props => css`
    top: ${`calc(((${props.headerBlockPadding} * 0.5) + ${props.XSizePadding}) * 2)`};
  `}
  right: 0;
  background-color: ${props => props.theme.color.gray[900]};
  border: var(--border);
  border-radius: 0.4rem;
  overflow: hidden;
  padding: 0 1rem;
  cursor: default;

  transition: height var(--speed) ease;

  div {
    gap: 0;
    width: 220px;
    row-gap: 1rem;
  }
`;

export const UserInfoContainer = styled.section`
  padding: 1rem;

  background: ${props => props.theme.color.gray[700]};

  width: 100%;

  display: grid;
  grid-template-areas: 'img . user . arrow';
  grid-template-columns: 50px 20px auto 50px auto;

  border-radius: 8px;

  align-items: center;

  strong {
    grid-area: user;
    font-size: 18px;
    font-weight: bold;
  }

  img {
    grid-area: img;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  svg {
    grid-area: arrow;
  }
`;

export const Divider = styled.hr`
  height: 2px;
  border-color: ${props => props.theme.color.gray[700]};
`;
