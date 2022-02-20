import { memo } from 'react';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useRegister } from 'hooks/auth/useRegister';
type FormProps = {
  name: string;
  email: string;
  password: string;
};

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormProps>();
  const { register: registerUser } = useRegister();
  const { push } = useRouter();
  const handleLogin: SubmitHandler<FormProps> = useCallback(
    async ({ name, email, password }) => {
      const { errors } = await registerUser({
        name,
        email,
        password,
      });

      if (errors) {
        errors.map(({ field, message }) => setError(field, { message }));
        return;
      }

      push('/');
    },
    [registerUser, setError, push]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input
            type="text"
            placeholder="name"
            {...register('name', {
              required: true,
            })}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
        </div>
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

export default memo(Register);
