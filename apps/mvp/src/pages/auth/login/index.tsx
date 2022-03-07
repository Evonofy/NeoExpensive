import { useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'use-context-selector';
import { FiMail, FiLock } from 'react-icons/fi';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { AuthContext } from '@context/auth';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormProps = {
  login: string;
  password: string;
};

export default function Login() {
  const { login: loginRequest } = useContext(AuthContext);
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const handleUserLogin: SubmitHandler<FormProps> = useCallback(
    async ({ login, password }) => {
      const { errors } = await loginRequest({
        login,
        password,
      });

      if (errors) {
        errors.forEach(({ field, message }) => formRef.current?.setFieldError(field, message));
        return;
      }

      navigate('/');
    },
    [loginRequest, navigate]
  );

  return (
    <div>
      <p>login into your accoutn</p>

      <Link to="/">go back</Link>

      <Form ref={formRef} onSubmit={handleUserLogin}>
        <Input required name="login" label="Enter your e-mail" placeholder="E-mail" icon={<FiMail />} />
        <Input required name="password" label="Enter Your password" placeholder="*********" icon={<FiLock />} />

        <Button type="submit">Login into my account</Button>
      </Form>

      <Button disabled type="button">
        Login with NeoExpensive
      </Button>
      <Button disabled type="button">
        Login with Google
      </Button>
    </div>
  );
}
