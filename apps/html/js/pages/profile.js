import { useSelector } from '../hooks/useSelector.js';

const userName = useSelector('.profile--name span');
const userImg = useSelector('.profile--avatar img');

const loggedIn = !!localStorage.getItem('user');
const user = JSON.parse(localStorage.getItem('user'));

if (!loggedIn) {
  const isDev = window.location.origin === 'http://localhost:3000';

  if (isDev) {
    window.location.href = `${window.location.origin}/pages/login/index.html`;
  } else {
    window.location.href = `${window.location.origin}/old/pages/login/index.html`;
  }
} else {
  userName.innerHTML = user.name;

  /* just change the img src */
  userImg.src = `https://avatars.dicebear.com/api/identicon/${user.id}.svg`;
}

const isDev = window.location.origin === 'http://localhost:3000';

const apiURL = isDev
  ? 'http://localhost:3333'
  : 'https://neo-expensive-api.herokuapp.com';

const main = async () => {
  try {
    const response = await fetch(`${apiURL}/users/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: localStorage.getItem('@neo:access'),
      }),
    });
    const data = await response.json();
    const { user } = data;
    localStorage.setItem('user', JSON.stringify(user));
    userName.innerHTML = user.name;

    /* just change the img src */
    userImg.src = user.avatarUrl;
  } catch (error) {
    console.log(error);
    // const response = await fetch(`${apiURL}/users/refresh-token`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     refresh_token: localStorage.getItem('@neo:refresh'),
    //   }),
    // });
    // const data = await response.json();

    // const { refreshToken, accessToken } = data;

    // localStorage.setItem('@neo:access', accessToken);
    // localStorage.setItem('@neo:refresh', refreshToken);

    // window.location.reload();
  }
};

main();
