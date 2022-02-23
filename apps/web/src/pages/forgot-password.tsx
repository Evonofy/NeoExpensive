import type { NextPage } from 'next';
import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';

import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';

type FormProps = {
  email: string;
};

const ForgotPasswordPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormProps>();
  const forgotPassword = useContextSelector(AuthContext, (context) => context.forgotPassword);
  const handleForgotPassword: SubmitHandler<FormProps> = useCallback(
    async ({ email }) => {
      const { errors } = await forgotPassword({
        email,
      });

      if (errors) {
        errors.map(({ field, message }) =>
          setError(field, {
            message,
          })
        );
        return;
      }
    },
    [setError, forgotPassword]
  );

  return (
    <div>
      {isSubmitSuccessful ? (
        <div>
          <p style={{ color: 'black' }}>we sent you an email</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleForgotPassword)}>
          <input type="text" placeholder="your email" {...register('email')} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}

          <button type="submit">submit</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
