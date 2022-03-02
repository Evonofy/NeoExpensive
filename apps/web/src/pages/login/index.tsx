import { memo, useCallback } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useLogin } from '../../hooks/auth/useLogin';
const Link = dynamic(() => import('next/link'));
type FormProps = {
  login: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormProps>();
  const { login: loginRequest } = useLogin();
  const { push, query } = useRouter();

  const handleLogin: SubmitHandler<FormProps> = useCallback(
    async ({ login, password }) => {
      const { errors } = await loginRequest({
        login,
        password,
      });

      if (errors) {
        errors.map(({ field, message }) => setError(field, { message }));
        return;
      }

      const clientId = query.client_id;
      const returnTo = query['return_to'];

      if (!returnTo) {
        push('/');
        return;
      }

      if (clientId) {
        push(`${returnTo}&client_id=${clientId}`);
        return;
      }

      push(`${returnTo}`);
      return;
    },
    [loginRequest, query, push, setError]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input
            type="text"
            placeholder="ID, email or username"
            {...register('login', {
              required: true,
            })}
          />
          {errors.login && <span style={{ color: 'red' }}>{errors.login.message}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="password"
            {...register('password', {
              required: true,
            })}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
        </div>

        <button type="submit">submit</button>
      </form>

      <Link href="/">go back</Link>
    </div>
  );
};

export default memo(Login);
