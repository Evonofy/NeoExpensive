import { FC } from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Search,
  User,
  ShoppingCart
} from 'react-feather';

import { useClamp } from '@hooks';
import { Link } from '@components';
import { Navbar, NavbarItem } from './Navbar';
import { HeaderContainer, X } from '@styles/components/header';

type HeaderProps = {
  rootFontSize: number;
};

export const Header: FC<HeaderProps> = ({ rootFontSize }) => {
  return (
    <HeaderContainer
      blockPadding={useClamp('1rem', '2rem', rootFontSize)}
      sidePadding={useClamp('1rem', '4rem', rootFontSize)}
      svgWidth={useClamp('0.5rem', '2rem', rootFontSize)}
      fontSize={useClamp('0.5rem', '1rem', rootFontSize)}
    >
      <div>
        <Facebook data-icon="facebook" />
        <Instagram />
        <Twitter />
      </div>

      <Navbar {...{ rootFontSize }}>
        <NavbarItem>
          <Link name="info" href="#">
            Informática
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link name="consoles" href="#">
            Consoles
          </Link>
        </NavbarItem>

        <X data-reset width={useClamp('1rem', '2rem', rootFontSize)}>
          <svg
            data-icon="logo"
            width="44"
            height="44"
            viewBox="0 0 44 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.1043 20.532L42.3958 12.6669C43.3306 11.6586 43.3306 10.0086 42.3958 9.00023L35.5972 1.66682C34.6624 0.658473 33.1327 0.658473 32.1979 1.66682L24.9064 9.5319C24.6855 9.77023 24.5495 10.1002 24.5665 10.4486L24.5665 19.6153C24.5665 20.3487 25.0934 20.917 25.7732 20.917L34.2715 20.917C34.5774 20.917 34.8664 20.7887 35.1043 20.532ZM19.0936 9.5319L11.8021 1.66682C10.8673 0.658473 9.33758 0.658473 8.40277 1.66682L1.60416 9.00023C0.669353 10.0086 0.669353 11.6586 1.60416 12.6669L8.89567 20.532C9.11663 20.7703 9.42257 20.917 9.7455 20.8987L18.2438 20.8987C18.9236 20.8987 19.4505 20.3303 19.4505 19.597L19.4505 10.4302C19.4505 10.1002 19.3315 9.78857 19.0936 9.5319ZM8.89568 26.8021L1.60416 34.6672C0.669354 35.6755 0.669354 37.3255 1.60416 38.3339L8.40278 45.6673C9.33759 46.6756 10.8673 46.6756 11.8021 45.6673L19.0936 37.8022C19.3146 37.5638 19.4505 37.2338 19.4335 36.8855L19.4335 27.7187C19.4335 26.9854 18.9066 26.4171 18.2268 26.4171L9.7285 26.4171C9.42257 26.4171 9.13363 26.5454 8.89568 26.8021ZM34.2375 26.4171L25.7392 26.4171C25.0594 26.4171 24.5325 26.9854 24.5325 27.7187V36.8855C24.5325 37.2155 24.6515 37.5639 24.8724 37.8022L32.1809 45.6856C33.1157 46.6939 34.6454 46.6939 35.5802 45.6856L42.3788 38.3522C43.3136 37.3438 43.3136 35.6938 42.3788 34.6855L35.0873 26.8204C34.8664 26.5454 34.5774 26.4171 34.2375 26.4171Z"
              fill="#9A4BB4"
            />
          </svg>
        </X>

        <NavbarItem>
          <Link name="support" href="#">
            Suporte
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link name="about" href="#">
            Quem Somos
          </Link>
        </NavbarItem>
      </Navbar>

      <div>
        <Search />
        <User />
        <ShoppingCart />
      </div>
    </HeaderContainer>
  );
};
