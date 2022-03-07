import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { User } from '@src/types/auth';

type FormProps = {
  email: string;
};

export default function ForgotPassword() {
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);
  const [formReady, setFormReady] = useState(false);

  const handleForgotPassword: SubmitHandler<FormProps> = useCallback(
    ({ email }) => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];

      const user = users.find((user) => user.email === email);

      if (!user) {
        formRef.current?.setFieldError('email', 'Could not find a user with that e-mail.');
        return;
      }

      navigate(`/password/redeem?email=${email}`);
    },
    [navigate]
  );

  return (
    <div>
      <h1>forgot your password?</h1>

      <Form ref={formRef} onSubmit={handleForgotPassword}>
        <Input name="email" label="E-mail" placeholder="Enter your e-mail" icon={<FiMail />} onChange={(event) => setFormReady(!!event.target.value)} onFocus={() => formRef.current?.setFieldError('email', '')} onBlur={() => formRef.current?.setFieldError('email', '')} />

        <Button disabled={!formReady} type="submit">
          Send confirmation
        </Button>
      </Form>
    </div>
  );
}
