import type { NextPage } from 'next';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useLogin } from '../hooks/auth/useLogin';
import { useUser } from '../hooks/auth/user';

type FormProps = {
  password: string;
};

const RecoverPasswordPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormProps>();
  const { login } = useLogin();
  const { user } = useUser();
  const { push } = useRouter();

  const handleRecoverPassword: SubmitHandler<FormProps> = useCallback(
    async ({ password }) => {
      const setNewPasswordRequest = await import('../services/auth').then((module) => module.setNewPasswordRequest);

      const { '@neo:access': token } = parseCookies();

      const { errors } = await setNewPasswordRequest({
        accessToken: token!,
        password,
      });

      if (errors) {
        errors.map(({ field, message }) =>
          setError(field, {
            message,
          })
        );

        return;
      }

      console.log('what1');
      if (user) {
        await login({
          email: user.email,
          password,
        });
      }
      console.log('what');
      push('/');
      return;
    },
    [login, push, setError, user]
  );

  return (
    <div>
      {isSubmitSuccessful ? (
        <p style={{ color: 'black' }}>redirecting you in 3...2..1</p>
      ) : (
        <form onSubmit={handleSubmit(handleRecoverPassword)}>
          <input type="text" placeholder="type a new password" {...register('password')} />
          {errors.password && <span style={{ color: 'red' }}>your time has expired, please make another attempt to redeem password</span>}

          <button type="submit">Use new password</button>
        </form>
      )}
    </div>
  );
};

export default RecoverPasswordPage;
