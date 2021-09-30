import styled, { css } from 'styled-components';

import { hide, show } from '../animations/dropdown';

export const DropdownContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 100%;

  &.show {
    animation: ${show} 0.25s ease;
  }

  &.hide {
    animation: ${hide} 0.25s ease;
    z-index: -1;
  }

  .dropdown__bg {
    position: absolute;
  }

  .dropdown__bg {
    /* z-index: -1; */
    background: ${props => props.theme.color.gray[700]};
    opacity: 0;
    position: absolute;
    border-radius: 5px;
    overflow: hidden;
    transition: 0.25s ease;
  }

  .dropdown__bg-bottom {
    background-color: ${props => props.theme.color.gray[900]};
    position: absolute;
    width: 100%;
    left: 0;
    top: 300px;
    height: 700px;
    transition: 0.3s ease;
  }

  .dropdown__wrap {
    overflow: hidden;
    position: absolute;
    transition: 0.25s ease;
    z-index: 1;
  }

  .dropdown-menu__content {
    position: absolute;
    opacity: 0;
    transition: 0.25s ease;
    min-width: 200px;
  }

  .dropdown-menu.active .dropdown-menu__content {
    opacity: 1;
  }

  .top-section,
  .bottom-section {
    z-index: 50;
    padding: 2rem;
  }

  .bottom-section {
    width: 100%;
  }

  /* 
  ============ INFO DROPDOWN ============
*/

  #developer .dropdown-menu__content {
    width: 400px;
  }
`;

interface InfoDropdownProps {
  titleSize: string;
}

export const Info = styled.div<InfoDropdownProps>`
  .dropdown-menu__content {
    width: 640px;

    row-gap: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .top-section {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .card {
      width: 100%;
      display: grid;

      grid-template-areas:
        'img title'
        'img description';
      grid-template-columns: min-content auto;
      grid-template-rows: min-content;
      row-gap: 0.4rem;

      h1 {
        grid-area: title;
      }

      h2 {
        font-size: ${props => props.titleSize};
      }

      ul {
        display: flex;

        flex-direction: column;
        row-gap: 0.2rem;
        grid-area: description;

        li {
          width: 100%;
          text-align: left;

          &:hover {
            a {
              color: ${props => props.theme.color.gray[100]};
            }
          }

          a {
            color: ${props => props.theme.color.gray[300]};
            font-size: calc(${props => props.titleSize} * 0.9);

            &:focus {
              color: ${props => props.theme.color.gray[100]};
            }
          }
        }
      }

      img {
        width: clamp(0.8rem, 5vw, 50px);
        height: auto;

        padding: 0.6rem;
        border-radius: 0.4rem;
        border: 1px solid ${props => props.theme.color.gray[200]};
        background: ${props => props.theme.color.gray[700]};
        grid-area: img;
      }
    }
  }

  .bottom-section {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    color: ${props => props.theme.color.gray[100]};

    button {
      color: ${props => props.theme.color.gray[100]};
      background: ${props => props.theme.color.accent[200]};

      &:hover {
        background: ${props => props.theme.color.accent[300]};
      }
    }

    a {
      ${props => css`
        position: relative;

        &::after {
          content: '';

          position: absolute;

          background: ${props.theme.color.gray[200]};

          width: 0%;
          height: 2px;
          border-radius: 2px;

          left: 0;

          bottom: -0.2rem;
          transition: all 200ms;
        }

        &:hover,
        &:focus {
          outline: 0;
          color: ${props.theme.color.gray[100]};

          &::after {
            width: 100%;
          }
        }
      `}
    }
  }
`;

export const Developer = styled.div`
  .dropdown_menu__content {
    width: 400px;
  }
`;
