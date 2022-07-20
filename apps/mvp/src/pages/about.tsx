import React from 'react';
import type { FC } from 'react';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { api } from '@/services/api';

import VideoGameNight from '../images/pages/about-us/undraw_video_game_night.svg';
import TeamWork from '../images/pages/about-us/undraw_team_work.svg';
import Business from '../images/pages/about-us/undraw_business.svg';
import WorkingLate from '../images/pages/about-us/undraw_working_late.svg';

import User from '@/components/about/user';

export const userValidator = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),

  name: z.string(),
  email: z.string(),
  username: z.string(),
  role: z.string(),
  github: z.string(),
  imgUrl: z.string(),
});

const usersValidator = z.array(userValidator);

const getContributors = () => {
  return useQuery(
    ['contributors'],
    async () => {
      const data = await api<z.infer<typeof usersValidator>>('/users?contributor=true');

      return usersValidator.parse(data);
    },
    {
      onError: (error) => console.error(`[react-query/contributors] ERROR \t`, error),
    }
  );
};

const about: FC = () => {
  const { data: contributors, isLoading } = getContributors();

  return (
    <React.Fragment>
      <main className="about--us--main">
        <div className="aboutus--wrapper">
          <section className="aboutus--section--left">
            <img src={VideoGameNight} alt="" className="aboutus--section--left--image--logo" />
          </section>
          <section className="aboutus--section--right">
            <svg
              className="aboutus--section--right--image--logo"
              width="699"
              height="204"
              viewBox="0 0 699 204"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M91.91 100.21L20.8 20.13L20.93 98H14.69V3.75H15.08L86.19 84.48L86.06 5.7H92.17V100.21H91.91ZM121.585 5.7H178.525V11.81H127.955V48.47H173.455V54.58H127.955V91.89H180.345V98H121.585V5.7ZM198.762 51.98C198.762 45.48 199.975 39.4133 202.402 33.78C204.829 28.06 208.209 23.0333 212.542 18.7C216.875 14.28 221.859 10.8567 227.492 8.43C233.212 5.91666 239.322 4.65999 245.822 4.65999C252.322 4.65999 258.432 5.91666 264.152 8.43C269.872 10.8567 274.899 14.28 279.232 18.7C283.565 23.0333 286.945 28.06 289.372 33.78C291.885 39.4133 293.142 45.48 293.142 51.98C293.142 58.48 291.885 64.59 289.372 70.31C286.945 75.9433 283.565 80.9267 279.232 85.26C274.899 89.5933 269.872 92.9733 264.152 95.4C258.432 97.8267 252.322 99.04 245.822 99.04C239.322 99.04 233.212 97.87 227.492 95.53C221.859 93.19 216.875 89.8967 212.542 85.65C208.209 81.4033 204.829 76.42 202.402 70.7C199.975 64.98 198.762 58.74 198.762 51.98ZM205.262 52.11C205.262 57.7433 206.302 63.03 208.382 67.97C210.462 72.91 213.365 77.2433 217.092 80.97C220.819 84.6967 225.109 87.6433 229.962 89.81C234.902 91.89 240.145 92.93 245.692 92.93C251.412 92.93 256.742 91.89 261.682 89.81C266.622 87.6433 270.955 84.6967 274.682 80.97C278.409 77.2433 281.312 72.91 283.392 67.97C285.559 63.03 286.642 57.7 286.642 51.98C286.642 46.3467 285.559 41.06 283.392 36.12C281.312 31.0933 278.409 26.7167 274.682 22.99C270.955 19.1767 266.622 16.1867 261.682 14.02C256.742 11.8533 251.455 10.77 245.822 10.77C240.102 10.77 234.772 11.8967 229.832 14.15C224.892 16.3167 220.559 19.3067 216.832 23.12C213.192 26.9333 210.332 31.3533 208.252 36.38C206.259 41.32 205.262 46.5633 205.262 52.11Z"
                fill="white"
              />
              <path
                d="M97.75 182.7V197H38.13V120H96.32V134.3H55.84V151.02H91.59V164.88H55.84V182.7H97.75ZM238.716 120C245.536 120 251.439 121.137 256.426 123.41C261.486 125.683 265.373 128.91 268.086 133.09C270.799 137.27 272.156 142.22 272.156 147.94C272.156 153.587 270.799 158.537 268.086 162.79C265.373 166.97 261.486 170.197 256.426 172.47C251.439 174.67 245.536 175.77 238.716 175.77H223.206V197H205.386V120H238.716ZM237.726 161.25C243.079 161.25 247.149 160.113 249.936 157.84C252.723 155.493 254.116 152.193 254.116 147.94C254.116 143.613 252.723 140.313 249.936 138.04C247.149 135.693 243.079 134.52 237.726 134.52H223.206V161.25H237.726ZM344.498 182.7V197H284.878V120H343.068V134.3H302.588V151.02H338.338V164.88H302.588V182.7H344.498ZM429.297 120V197H414.667L376.277 150.25V197H358.677V120H373.417L411.697 166.75V120H429.297ZM472.815 198.32C466.728 198.32 460.825 197.513 455.105 195.9C449.458 194.213 444.911 192.05 441.465 189.41L447.515 175.99C450.815 178.41 454.738 180.353 459.285 181.82C463.831 183.287 468.378 184.02 472.925 184.02C477.985 184.02 481.725 183.287 484.145 181.82C486.565 180.28 487.775 178.263 487.775 175.77C487.775 173.937 487.041 172.433 485.575 171.26C484.181 170.013 482.348 169.023 480.075 168.29C477.875 167.557 474.868 166.75 471.055 165.87C465.188 164.477 460.385 163.083 456.645 161.69C452.905 160.297 449.678 158.06 446.965 154.98C444.325 151.9 443.005 147.793 443.005 142.66C443.005 138.187 444.215 134.153 446.635 130.56C449.055 126.893 452.685 123.997 457.525 121.87C462.438 119.743 468.415 118.68 475.455 118.68C480.368 118.68 485.171 119.267 489.865 120.44C494.558 121.613 498.665 123.3 502.185 125.5L496.685 139.03C489.571 134.997 482.458 132.98 475.345 132.98C470.358 132.98 466.655 133.787 464.235 135.4C461.888 137.013 460.715 139.14 460.715 141.78C460.715 144.42 462.071 146.4 464.785 147.72C467.571 148.967 471.788 150.213 477.435 151.46C483.301 152.853 488.105 154.247 491.845 155.64C495.585 157.033 498.775 159.233 501.415 162.24C504.128 165.247 505.485 169.317 505.485 174.45C505.485 178.85 504.238 182.883 501.745 186.55C499.325 190.143 495.658 193.003 490.745 195.13C485.831 197.257 479.855 198.32 472.815 198.32ZM517.661 120H535.481V197H517.661V120ZM627.355 120L594.025 197H576.425L543.205 120H562.455L585.885 175L609.645 120H627.355ZM693.404 182.7V197H633.784V120H691.974V134.3H651.494V151.02H687.244V164.88H651.494V182.7H693.404Z"
                fill="white"
              />
              <path
                d="M178.709 152.739L193.571 137.211C195.476 135.22 195.476 131.963 193.571 129.972L179.714 115.493C177.809 113.502 174.691 113.502 172.786 115.493L157.924 131.021C157.474 131.492 157.196 132.144 157.231 132.831V150.929C157.231 152.377 158.305 153.499 159.691 153.499H177.012C177.636 153.499 178.224 153.246 178.709 152.739ZM146.076 131.021L131.214 115.493C129.309 113.502 126.191 113.502 124.286 115.493L110.429 129.972C108.524 131.963 108.524 135.22 110.429 137.211L125.291 152.739C125.741 153.21 126.364 153.499 127.023 153.463H144.344C145.73 153.463 146.804 152.341 146.804 150.893V132.795C146.804 132.144 146.561 131.528 146.076 131.021ZM125.291 165.118L110.429 180.647C108.524 182.638 108.524 185.895 110.429 187.886L124.286 202.365C126.191 204.356 129.309 204.356 131.214 202.365L146.076 186.837C146.526 186.366 146.804 185.714 146.769 185.027V166.928C146.769 165.48 145.695 164.358 144.309 164.358H126.988C126.364 164.358 125.776 164.612 125.291 165.118ZM176.943 164.358H159.621C158.236 164.358 157.162 165.48 157.162 166.928V185.027C157.162 185.678 157.404 186.366 157.855 186.837L172.751 202.401C174.656 204.392 177.774 204.392 179.679 202.401L193.536 187.922C195.442 185.932 195.442 182.674 193.536 180.683L178.675 165.155C178.224 164.612 177.636 164.358 176.943 164.358Z"
                fill="#8B46A3"
              />
            </svg>
            <p className="aboutus--section--paragraph">
              A Neo Expertise foi criada para satisfazer suas necessidades e lhe entregar produtos de{' '}
              <span className="aboutus--section--span">Hardware</span>,{' '}
              <span className="aboutus--section--span">Consoles</span> e{' '}
              <span className="aboutus--section--span">Jogos</span> com o comprometimento de oferecê-los com a{' '}
              <span className="aboutus--section--span">maior qualidade possível.</span>
            </p>
          </section>
        </div>

        <div className="aboutus--section--divider--wrapper">
          <hr className="aboutus--section--divider" />
        </div>

        <div className="aboutus--wrapper">
          <section className="aboutus--section--left">
            <h2 className="aboutus--section--h2">Sobre Nós</h2>
            <p className="aboutus--section--paragraph">
              Fomos criados com a intenção de{' '}
              <span className="aboutus--section--span">competirmos no mercado contra os maiores e-commerces</span>{' '}
              relacionados a Hardware no Brasil.
            </p>
            <h1 className="aboutus--section--h1">A sua loja de hardware e jogos está aqui!</h1>
          </section>
          <section className="aboutus--section--right">
            <img src={TeamWork} alt="" className="aboutus--section--right--image--logo" />
          </section>
        </div>

        <div className="aboutus--section--divider--wrapper">
          <hr className="aboutus--section--divider" />
        </div>

        <div className="aboutus--wrapper">
          <section className="aboutus--section--left">
            <img src={Business} alt="" className="aboutus--section--right--image--logo" />
          </section>
          <section className="aboutus--section--right">
            <h2 className="aboutus--section--h2">Valores</h2>
            <p className="aboutus--section--paragraph">
              Prezamos por nossas maiores virtudes e nos comprometeremos em todos{' '}
              <span className="aboutus--section--span">pequenos detalhes</span>, que não só constituirão um site
              deslumbrante mas uma <span className="aboutus--section--span">experiência magnifíca.</span>
            </p>
          </section>
        </div>

        <div className="aboutus--section--divider--wrapper">
          <hr className="aboutus--section--divider" />
        </div>

        <div className="aboutus--wrapper">
          <section className="aboutus--section--left">
            <h2 className="aboutus--section--h2">O Que Fazemos</h2>
            <p className="aboutus--section--paragraph">
              Nós como um grupo nos empenhamos em um site que transmitisse{' '}
              <span className="aboutus--section--span">profissionalidade e simplicidade</span> e sempre estaremos
              dispostos em <span className="aboutus--section--span">melhorá-lo continuamente.</span>
            </p>
          </section>
          <section className="aboutus--section--right">
            <img src={WorkingLate} alt="" className="aboutus--section--right--image--logo" />
          </section>
        </div>

        <div className="aboutus--section--divider--wrapper">
          <hr className="aboutus--section--divider" />
        </div>

        {!!contributors && isLoading ? (
          'loading contributors...'
        ) : (
          <div className="aboutus--section--center">
            <h2 className="aboutus--section--center--h2">Desenvolvedores</h2>

            <div className="aboutus--section--profile--wrapper">
              {contributors?.map((user) => (
                <User key={user.id} {...user} />
              ))}
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export default about;
