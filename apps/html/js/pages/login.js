const form = document.querySelector('.login--form');

const isDev = window.location.origin === 'http://localhost:3000';

const apiURL = isDev
  ? 'http://localhost:3333'
  : 'https://neo-expertise-api.herokuapp.com';

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target));
  try {
    const response = await fetch(`${apiURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: formData.email,
        password: formData.password,
      }),
    });
    const data = await response.json();
    const { error, user, accessToken, refreshToken } = data;

    if (error === 'Could not find user with that login.') {
      alert('Não consegui achar um usuário com esse e-mail :(.');
      return;
    } else if (error === 'Invalid password.') {
      alert('Senha inválida.');
      return;
    }

    localStorage.setItem('@neo:access', accessToken);
    localStorage.setItem('@neo:refresh', refreshToken);
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );

    const isDev2 = window.location.origin === 'http://localhost:3000';

    if (isDev2) {
      window.location.href = `${window.location.origin}/index.html`;
    } else {
      window.location.href = `${window.location.origin}neo-expertise/old/index.html`;
    }
  } catch (error) {
    console.error(error);
  }
});
