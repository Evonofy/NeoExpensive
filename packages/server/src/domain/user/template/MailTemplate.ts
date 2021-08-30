interface iconsProps {
  icon: 'alert' | 'danger' | 'success';
}

export const BaseMailTemplate = (email: string, { icon }: iconsProps) => {
  let img = '';
  switch (icon) {
    case 'alert':
      img = `
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32.7497 8.33325H67.2497L91.6663 32.7499V67.2499L67.2497 91.6666H32.7497L8.33301 67.2499V32.7499L32.7497 8.33325Z" stroke="#F5FA24" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M50 33.3333V49.9999" stroke="#F5FA24" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M50 66.6667H50.0417" stroke="#F5FA24" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      break;

    case 'danger':
      img = './check.svg';
      break;

    case 'success':
      img = `
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M91.6664 46.167V50.0003C91.6612 58.9854 88.7518 67.7281 83.3719 74.9246C77.992 82.1211 70.43 87.3857 61.8137 89.9333C53.1973 92.4808 43.9883 92.1749 35.56 89.0611C27.1317 85.9473 19.9357 80.1924 15.0453 72.6548C10.155 65.1171 7.83214 56.2006 8.42333 47.235C9.01452 38.2694 12.488 29.735 18.3258 22.9048C24.1636 16.0746 32.0529 11.3144 40.8171 9.33427C49.5813 7.35412 58.7508 8.26007 66.958 11.917" stroke="#13DF4C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M91.6667 16.6667L50 58.3751L37.5 45.8751" stroke="#13DF4C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `;
      break;
  }
  console.log(process.env.APP_URL);
  return `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      html,
      body,
      main,
      section {
        width: 100%;
        height: 100%;
      }

      main {
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: flex-start;
      }

      nav {
        width: 100%;

        background: #000;
        display: flex;
        justify-content: center;

        padding: 1rem;
      }

      nav a {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      nav img {
        width: 30%;
        transition: all 200ms;
      }

      section {
        background: #151515;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      section svg {
        width: 40%;
        margin-bottom: 1rem;
      }

      section article {
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: space-between;

        width: 100%;
      }

      h1 {
        font-weight: 800;
        color: #dedede;
        margin-bottom: 0.4rem;
        font-size: clamp(1rem, 0.7973rem + 2.1622vw, 3.5rem);;
      }

      p {
        text-align: center;
        color: #dedede;
        font-weight: lighter;
        margin: 0.6rem 0;
        font-size: clamp(0.4rem, 0.5514rem + 0.5189vw, 1rem);
      }

      button {
        cursor: pointer;
        outline: 0;
        border: 0;
        border-radius: 6px;
        margin: 1rem;
        color: #dedede;
        font-weight: bold;
        background: #8B46A3;
        padding: 0.6rem 2rem;
        transition: all 200ms;
      }

      button:hover {
        filter: brightness(130%);
      }

      @media (max-width: 500px) {
        nav img {
          width: 50%;
        }
      }
    </style>
    <main>
      <nav>
        <a href=${process.env.APP_URL}>
          <img src="https://raw.githubusercontent.com/AtomicFeasT/neo-expensive/main/packages/web/images/evo-logo.svg" />
        </a>
      </nav>

      <section>
        ${img}

        <article>
          ${email}
        </article>
      </section>
    </main>
  `;
};
