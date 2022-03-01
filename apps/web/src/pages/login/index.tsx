import { memo, useCallback } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useLogin } from '../../hooks/auth/useLogin';
const Link = dynamic(() => import('next/link'));
type FormProps = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormProps>();
  const { login } = useLogin();
  const { push, query } = useRouter();

  const handleLogin: SubmitHandler<FormProps> = useCallback(
    async ({ email, password }) => {
      const { errors } = await login({
        email,
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

      push(`${returnTo}&client_id=${clientId}`);
    },
    [login, query, push, setError]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input
            type="text"
            placeholder="email"
            {...register('email', {
              required: true,
            })}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
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
