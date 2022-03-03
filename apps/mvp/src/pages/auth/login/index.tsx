import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';

import { AuthContext } from '@context/auth';

export default function Login() {
  const loginRequest = useContextSelector(AuthContext, (context) => context.login);

  const handleUserLogin = useCallback(async () => {
    const { errors } = await loginRequest({
      login: 'test@test.com',
      password: '123',
    });

    console.log(errors);
  }, [loginRequest]);

  return (
    <div>
      <p>login into your accoutn</p>
      <button onClick={handleUserLogin}></button>

      <Link to="/">go back</Link>
    </div>
  );
}
