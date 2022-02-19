import { memo } from 'react';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLogin } from '../hooks/auth/useLogin';
import { useRouter } from 'next/router';
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
  const { push } = useRouter();
  const handleLogin: SubmitHandler<FormProps> = useCallback(
    async ({ email, password }) => {
      const { errors } = await login({
        email,
        password,
      });

      if (errors) {
        errors.map(({ field, message }) => setError(field, { message }));
      }

      push('/');
    },
    [login, setError, push]
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
    </div>
  );
};

export default memo(Login);
