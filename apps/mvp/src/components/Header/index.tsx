import React, { memo, FC } from 'react';
import { useContext } from 'use-context-selector';

import { AuthContext } from '@context/auth';
import { Link } from '@components/Link';

import DesktopTower from '../../images/components/header/submenus/desktop-tower.svg';
import GameController from '../../images/components/header/submenus/game-controller.svg';
import Question from '../../images/components/header/submenus/question.svg';
import UsersThree from '../../images/components/header/submenus/users-three.svg';
import Headphones from '../../images/components/header/submenus/headphones.svg';

import Nintendo from '../../images/components/header/submenus/nintendo.svg';
import Playstation from '../../images/components/header/submenus/play-station.svg';
import Xbox from '../../images/components/header/submenus/xbox.svg';

import Palette from '../../images/components/header/user-controls/palette.svg';
import Flag from '../../images/components/header/user-controls/flag.svg';
import UserRectangle from '../../images/components/header/user-controls/user-rectangle.svg';
import User from '../../images/components/header/user-controls/user.svg';
import SignIn from '../../images/components/header/user-controls/sign-in.svg';
import UserPlus from '../../images/components/header/user-controls/user-plus.svg';
import SignOut from '../../images/components/header/user-controls/sign-out.svg';

const Header: FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <React.Fragment>
      <header className="hamburger--header">
        <div className="hamburger--header--items">
          <button className="hamburger--header--button">
            <span className="hamburger--header--button--span"></span>
          </button>

          <nav className="hamburger--nav">
            <ul className="hamburger--nav--list">
              <div className="hamburger--nav--list--wrapper">
                <img className="hamburger--nav--list--wrapper--image" src={DesktopTower} alt="" />
                <li className="hamburger--nav--item">
                  <Link href="/products" className="hamburger--nav--item--link">
                    Informática
                  </Link>
                </li>
              </div>

              <div className="hamburger--nav--list--wrapper">
                <img className="hamburger--nav--list--wrapper--image" src={GameController} alt="" />
                <li className="hamburger--nav--item">
                  <Link href="/consoles" className="hamburger--nav--item--link">
                    Console
                  </Link>
                </li>
              </div>

              <div className="hamburger--nav--list--wrapper">
                <img className="hamburger--nav--list--wrapper--image" src={Question} alt="" />
                <li className="hamburger--nav--item">
                  <Link href="/support" className="hamburger--nav--item--link">
                    Suporte
                  </Link>
                </li>
              </div>

              <div className="hamburger--nav--list--wrapper">
                <img className="hamburger--nav--list--wrapper--image" src={UsersThree} alt="" />
                <li className="hamburger--nav--item">
                  <Link href="/about" className="hamburger--nav--item--link">
                    Quem Somos
                  </Link>
                </li>
              </div>

              <hr className="hamburger--nav--list--hr" />

              <div className="hamburger--nav--list--wrapper">
                <img className="hamburger--nav--list--wrapper--image" src={Palette} alt="" />
                <li className="hamburger--nav--item">
                  <button className="hamburger--nav--item--button">RGB</button>
                </li>
              </div>
              <div className="hamburger--nav--list--wrapper">
                <img className="hamburger--nav--list--wrapper--image" src={Flag} alt="" />
                <li className="hamburger--nav--item">
                  <button className="hamburger--nav--item--button">Inglês</button>
                </li>
              </div>

              {user && (
                <div className="hamburger--nav--list--wrapper profile-item">
                  <img className="hamburger--nav--list--wrapper--image" src={User} alt="" />
                  <li className="hamburger--nav--item">
                    <Link href="/profile" className="hamburger--nav--item--button">
                      Perfil
                    </Link>
                  </li>
                </div>
              )}

              {!user && (
                <div className="hamburger--nav--list--wrapper login-item">
                  <img className="hamburger--nav--list--wrapper--image" src={SignIn} alt="" />
                  <li className="hamburger--nav--item">
                    <Link href="/login" className="hamburger--nav--item--button">
                      Entrar
                    </Link>
                  </li>
                </div>
              )}

              {!user && (
                <div className="hamburger--nav--list--wrapper register-item">
                  <img className="hamburger--nav--list--wrapper--image" src={UserPlus} alt="" />
                  <li className="hamburger--nav--item">
                    <Link href="/register" className="hamburger--nav--item--button">
                      Registrar-se
                    </Link>
                  </li>
                </div>
              )}

              {user && (
                <div className="hamburger--nav--list--wrapper logout-item">
                  <img className="hamburger--nav--list--wrapper--image" src={SignOut} alt="" />
                  <li className="hamburger--nav--item">
                    <button onClick={() => logout()} className="hamburger--nav--item--button">
                      Sair
                    </button>
                  </li>
                </div>
              )}
            </ul>
          </nav>

          <Link href="/products" className="hamburger--header--items--logo" data-reset>
            <svg width="44" height="44" viewBox="0 0 44 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="X"
                d="M35.1043 20.532L42.3958 12.6669C43.3306 11.6586 43.3306 10.0086 42.3958 9.00023L35.5972 1.66682C34.6624 0.658473 33.1327 0.658473 32.1979 1.66682L24.9064 9.5319C24.6855 9.77023 24.5495 10.1002 24.5665 10.4486L24.5665 19.6153C24.5665 20.3487 25.0934 20.917 25.7732 20.917L34.2715 20.917C34.5774 20.917 34.8664 20.7887 35.1043 20.532ZM19.0936 9.5319L11.8021 1.66682C10.8673 0.658473 9.33758 0.658473 8.40277 1.66682L1.60416 9.00023C0.669353 10.0086 0.669353 11.6586 1.60416 12.6669L8.89567 20.532C9.11663 20.7703 9.42257 20.917 9.7455 20.8987L18.2438 20.8987C18.9236 20.8987 19.4505 20.3303 19.4505 19.597L19.4505 10.4302C19.4505 10.1002 19.3315 9.78857 19.0936 9.5319ZM8.89568 26.8021L1.60416 34.6672C0.669354 35.6755 0.669354 37.3255 1.60416 38.3339L8.40278 45.6673C9.33759 46.6756 10.8673 46.6756 11.8021 45.6673L19.0936 37.8022C19.3146 37.5638 19.4505 37.2338 19.4335 36.8855L19.4335 27.7187C19.4335 26.9854 18.9066 26.4171 18.2268 26.4171L9.7285 26.4171C9.42257 26.4171 9.13363 26.5454 8.89568 26.8021ZM34.2375 26.4171L25.7392 26.4171C25.0594 26.4171 24.5325 26.9854 24.5325 27.7187V36.8855C24.5325 37.2155 24.6515 37.5639 24.8724 37.8022L32.1809 45.6856C33.1157 46.6939 34.6454 46.6939 35.5802 45.6856L42.3788 38.3522C43.3136 37.3438 43.3136 35.6938 42.3788 34.6855L35.0873 26.8204C34.8664 26.5454 34.5774 26.4171 34.2375 26.4171Z"
                fill="#9A4BB4"
              />
            </svg>
          </Link>

          <Link href="/cart" className="hamburger--header--items-cart" data-reset>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.9375 35.9375H13.6364L8.18782 5.97049C8.12236 5.61047 7.93262 5.28485 7.65169 5.05039C7.37075 4.81593 7.01644 4.6875 6.65052 4.6875H3.125" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M15.625 43.75C17.7824 43.75 19.5312 42.0011 19.5312 39.8438C19.5312 37.6864 17.7824 35.9375 15.625 35.9375C13.4676 35.9375 11.7188 37.6864 11.7188 39.8438C11.7188 42.0011 13.4676 43.75 15.625 43.75Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35.9375 43.75C38.0949 43.75 39.8438 42.0011 39.8438 39.8438C39.8438 37.6864 38.0949 35.9375 35.9375 35.9375C33.7801 35.9375 32.0312 37.6864 32.0312 39.8438C32.0312 42.0011 33.7801 43.75 35.9375 43.75Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12.2159 28.125H36.7385C37.4704 28.125 38.179 27.8681 38.7409 27.3992C39.3027 26.9303 39.6822 26.2791 39.8131 25.559L42.1875 12.5H9.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="hamburger--header--search">
          <label className="hamburger--header--search--label">
            <input className="hamburger--header--search--label--input" type="text" placeholder=" " />
            <span className="hamburger--header--search--label--text">Pesquise Por Produtos!</span>
          </label>

          <button className="hamburger--header--search--button" data-reset>
            <svg className="hamburger--header--search--svg" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.6562 39.0625C31.7172 39.0625 39.0625 31.7172 39.0625 22.6562C39.0625 13.5953 31.7172 6.25 22.6562 6.25C13.5953 6.25 6.25 13.5953 6.25 22.6562C6.25 31.7172 13.5953 39.0625 22.6562 39.0625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M34.2566 34.2579L43.7489 43.7502" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      <header className="desktop--header">
        <div className="social--icons">
          <Link data-reset href="https://www.facebook.com/Neo-Expensive-102995498833851/" target="_blank" rel="noreferrer">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 43.75C35.3553 43.75 43.75 35.3553 43.75 25C43.75 14.6447 35.3553 6.25 25 6.25C14.6447 6.25 6.25 14.6447 6.25 25C6.25 35.3553 14.6447 43.75 25 43.75Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32.8125 17.1877H29.6875C28.4443 17.1877 27.252 17.6816 26.3729 18.5607C25.4939 19.4398 25 20.632 25 21.8752V43.7502" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.75 28.1252H31.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link data-reset href="https://www.instagram.com/neo_expensive/" target="_blank" rel="noreferrer">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 32.8125C29.3147 32.8125 32.8125 29.3147 32.8125 25C32.8125 20.6853 29.3147 17.1875 25 17.1875C20.6853 17.1875 17.1875 20.6853 17.1875 25C17.1875 29.3147 20.6853 32.8125 25 32.8125Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
              <path
                d="M33.5938 7.03125H16.4062C11.2286 7.03125 7.03125 11.2286 7.03125 16.4062V33.5938C7.03125 38.7714 11.2286 42.9688 16.4062 42.9688H33.5938C38.7714 42.9688 42.9688 38.7714 42.9688 33.5938V16.4062C42.9688 11.2286 38.7714 7.03125 33.5938 7.03125Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link data-reset href="https://twitter.com/ExpensiveNeo" target="_blank" rel="noreferrer">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.37502 39.0625C9.37502 39.0625 17.1875 37.5 18.75 32.8125C18.75 32.8125 6.25002 28.125 9.37502 10.9375C9.37502 10.9375 15.625 18.75 25 20.3125V17.1881C25.0002 15.3931 25.6184 13.6529 26.7506 12.26C27.8829 10.8672 29.4602 9.90661 31.2173 9.53985C32.9744 9.17309 34.8043 9.42249 36.3991 10.2461C37.994 11.0697 39.2567 12.4174 39.9749 14.0624L46.875 14.0625L40.625 20.3125C40.625 31.25 32.8125 42.1875 18.75 42.1875C12.5 42.1875 9.37502 39.0625 9.37502 39.0625Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <nav className="desktop--nav">
          <ul role="list" className="dropdown">
            <li className="dropdown--item">
              <Link className="dropdown--item--link" href="/items">
                Informática
              </Link>

              <ul className="dropdown--submenu">
                <div className="dropdown--submenu--wrapper">
                  <div className="dropdown--submenu--item--wrapper">
                    <div className="dropdown--submenu--title">
                      <img className="dropdown--submenu--title--image" src={DesktopTower} alt="" />
                      <li className="dropdown--submenu--item">
                        <Link href="/hardware" className="dropdown--submenu--link">
                          Peças (Hardware)
                        </Link>
                      </li>
                    </div>

                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Processadores
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Placas de Vídeo
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Placas-Mãe
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Memórias
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Disco Rígido HD/SSD
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Fontes
                      </Link>
                    </li>
                  </div>

                  <div className="dropdown--submenu--item--wrapper">
                    <div className="dropdown--submenu--title">
                      <img className="dropdown--submenu--title--image" src={Headphones} alt="" />
                      <li className="dropdown--submenu--item">
                        <Link href="#" className="dropdown--submenu--link">
                          Periféricos E Acessórios
                        </Link>
                      </li>
                    </div>

                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Fones de Ouvido
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Teclados
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Mouses
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item">
                      <Link href="#" className="dropdown--submenu--link">
                        Controles
                      </Link>
                    </li>
                  </div>
                </div>

                <div className="dropdown--submenu--section">
                  <p className="dropdown--submenu--section--paragraph">Procure Pelo Seu Computador Gamer Aqui!</p>
                  <Link href="#" className="dropdown--submenu--section--cta">
                    Computadores Montados
                  </Link>
                </div>
              </ul>
            </li>

            <li className="dropdown--item margin-right">
              <Link className="dropdown--item--link" href="/consoles">
                Console
              </Link>

              <ul className="dropdown--submenu">
                <div className="dropdown--submenu--wrapper">
                  <div className="dropdown--submenu--item--wrapper">
                    <img className="dropdown--submenu--title--image" src={Xbox} alt="" />

                    <div className="dropdown--submenu--title">
                      <li className="dropdown--submenu--item--console">
                        <Link href="#" className="dropdown--submenu--link dropdown--submenu--title--link">
                          Xbox
                        </Link>
                      </li>
                    </div>

                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Consoles
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Acessórios
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Jogos
                      </Link>
                    </li>
                  </div>

                  <div className="dropdown--submenu--item--wrapper">
                    <img className="dropdown--submenu--title--image" src={Playstation} alt="" />

                    <div className="dropdown--submenu--title">
                      <li className="dropdown--submenu--item--console">
                        <Link href="#" className="dropdown--submenu--link dropdown--submenu--title--link">
                          PlayStation
                        </Link>
                      </li>
                    </div>

                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Consoles
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Acessórios
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Jogos
                      </Link>
                    </li>
                  </div>

                  <div className="dropdown--submenu--item--wrapper">
                    <img className="dropdown--submenu--title--image" src={Nintendo} alt="" />

                    <div className="dropdown--submenu--title">
                      <li className="dropdown--submenu--item--console">
                        <Link href="#" className="dropdown--submenu--link dropdown--submenu--title--link">
                          Nintendo
                        </Link>
                      </li>
                    </div>

                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Consoles
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Acessórios
                      </Link>
                    </li>
                    <li className="dropdown--submenu--item dropdown--submenu--align--center">
                      <Link href="#" className="dropdown--submenu--link">
                        Jogos
                      </Link>
                    </li>
                  </div>
                </div>
              </ul>
            </li>

            <Link data-reset href="/">
              <svg className="XLogo" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                {' '}
                <path
                  className="X"
                  d="M40.5287 21.5472L49.1692 12.9102C50.2769 11.8029 50.2769 9.99092 49.1692 8.88356L41.1128 0.830519C40.005 -0.27684 38.1923 -0.27684 37.0847 0.830519L28.4441 9.46745C28.1823 9.72912 28.0212 10.0916 28.0413 10.4741V20.5405C28.0413 21.3459 28.6657 21.9699 29.4713 21.9699H39.5418C39.9044 21.9699 40.2468 21.8291 40.5287 21.5472ZM21.5559 9.46745L12.9153 0.830519C11.8077 -0.27684 9.995 -0.27684 8.88719 0.830519L0.830751 8.88356C-0.276917 9.99092 -0.276917 11.8029 0.830751 12.9102L9.47131 21.5472C9.73308 21.809 10.0956 21.9699 10.4784 21.9498H20.5488C21.3544 21.9498 21.9789 21.3258 21.9789 20.5203V10.454C21.9789 10.0916 21.8378 9.74926 21.5559 9.46745ZM9.47131 28.4326L0.830751 37.0696C-0.276917 38.177 -0.276917 39.9889 0.830751 41.0961L8.88719 49.1493C9.995 50.2567 11.8077 50.2567 12.9153 49.1493L21.5559 40.5124C21.8177 40.2506 21.9789 39.8882 21.9587 39.5057V29.4392C21.9587 28.6339 21.3343 28.0098 20.5287 28.0098H10.4582C10.0956 28.0098 9.75323 28.1508 9.47131 28.4326ZM39.5015 28.0098H29.431C28.6254 28.0098 28.001 28.6339 28.001 29.4392V39.5057C28.001 39.8681 28.142 40.2506 28.4038 40.5124L37.0645 49.1695C38.1722 50.2768 39.9849 50.2768 41.0927 49.1695L49.1491 41.1163C50.2568 40.0091 50.2568 38.197 49.1491 37.0898L40.5085 28.4527C40.2468 28.1507 39.9044 28.0098 39.5015 28.0098Z"
                  fill="#8B46A3"
                />
              </svg>
            </Link>

            <li className="navigation--item margin-left">
              <Link className="dropdown--item--link" href="/support/">
                Suporte
              </Link>
            </li>
            <li className="navigation--item">
              <Link href="/about">Quem Somos</Link>
            </li>
          </ul>
        </nav>

        <div className="user--controls">
          <div className="user--controls--header--search">
            <button className="user--controls--header--search--button" data-reset>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6562 39.0625C31.7172 39.0625 39.0625 31.7172 39.0625 22.6562C39.0625 13.5953 31.7172 6.25 22.6562 6.25C13.5953 6.25 6.25 13.5953 6.25 22.6562C6.25 31.7172 13.5953 39.0625 22.6562 39.0625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M34.2566 34.2579L43.7489 43.7502" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="user--controls--header--search--data">
              <label className="user--controls--header--search--data--label">
                <input id="item--search--input" className="user--controls--header--search--data--label--input" type="text" placeholder=" " />
                <span className="user--controls--header--search--data--label--text">Pesquise Por Seu Produto!</span>
              </label>
            </div>
          </div>

          <div className="user--controls--customer">
            <button className="user--controls--customer--button" data-reset>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 31.25C31.9036 31.25 37.5 25.6536 37.5 18.75C37.5 11.8464 31.9036 6.25 25 6.25C18.0964 6.25 12.5 11.8464 12.5 18.75C12.5 25.6536 18.0964 31.25 25 31.25Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                <path
                  d="M6.05249 42.1857C7.97351 38.8606 10.7357 36.0996 14.0616 34.18C17.3876 32.2605 21.1601 31.25 25.0002 31.25C28.8403 31.25 32.6128 32.2606 35.9386 34.1803C39.2645 36.0999 42.0267 38.8609 43.9476 42.1861"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="user--controls--customer--choices">
              <div className="user--controls--customer--choices--item">
                <img className="user--controls--customer--choices--icon" src={Palette} alt="Theme Changer Palette" />
                <button className="user--controls--customer--choices--button theme--switcher--button">Claro</button>
              </div>

              <div className="user--controls--customer--choices--item">
                <img className="user--controls--customer--choices--icon" src={Flag} alt="Change Language Flag" />
                <button className="user--controls--customer--choices--button lang--switcher--button notranslate">Inglês</button>
              </div>

              {user && (
                <div className="user--controls--customer--choices--item profile-item">
                  <img className="user--controls--customer--choices--icon" src={UserRectangle} alt="Sign Out Button" />
                  <Link href="/profile" className="user--controls--customer--choices--link">
                    Perfil
                  </Link>
                </div>
              )}

              {!user && (
                <div className="user--controls--customer--choices--item login-item">
                  <img className="user--controls--customer--choices--icon" src={SignIn} alt="Sign In Button" />
                  <Link href="/login" className="user--controls--customer--choices--link">
                    Entrar
                  </Link>
                </div>
              )}

              {!user && (
                <div className="user--controls--customer--choices--item register-item">
                  <img className="user--controls--customer--choices--icon" src={UserPlus} alt="Register Button" />
                  <Link href="/register" className="user--controls--customer--choices--link">
                    Registrar-se
                  </Link>
                </div>
              )}

              {user && (
                <div className="user--controls--customer--choices--item logout-item">
                  <img className="user--controls--customer--choices--icon" src={SignOut} alt="Sign Out Button" />
                  <button onClick={() => logout()} className="user--controls--customer--choices--link">
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>

          <Link href="/checkout" id="cart" data-reset>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.9375 35.9375H13.6364L8.18782 5.97049C8.12236 5.61047 7.93262 5.28485 7.65169 5.05039C7.37075 4.81593 7.01644 4.6875 6.65052 4.6875H3.125" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M15.625 43.75C17.7824 43.75 19.5312 42.0011 19.5312 39.8438C19.5312 37.6864 17.7824 35.9375 15.625 35.9375C13.4676 35.9375 11.7188 37.6864 11.7188 39.8438C11.7188 42.0011 13.4676 43.75 15.625 43.75Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35.9375 43.75C38.0949 43.75 39.8438 42.0011 39.8438 39.8438C39.8438 37.6864 38.0949 35.9375 35.9375 35.9375C33.7801 35.9375 32.0312 37.6864 32.0312 39.8438C32.0312 42.0011 33.7801 43.75 35.9375 43.75Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12.2159 28.125H36.7385C37.4704 28.125 38.179 27.8681 38.7409 27.3992C39.3027 26.9303 39.6822 26.2791 39.8131 25.559L42.1875 12.5H9.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </header>
    </React.Fragment>
  );
};

export default memo(Header);
