import { useCallback, useRef, useState } from 'react';
import { FiMail } from 'react-icons/fi';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormProps = {
  email: string;
};

export default function ForgotPassword() {
  const formRef = useRef<FormHandles>(null);
  const [formReady, setFormReady] = useState(false);

  const handleForgotPassword: SubmitHandler<FormProps> = useCallback(({ email }) => {
    console.log({
      email,
    });
  }, []);

  return (
    <div>
      <h1>forgot your password?</h1>

      <Form ref={formRef} onSubmit={handleForgotPassword}>
        <Input name="email" label="E-mail" placeholder="Enter your e-mail" icon={<FiMail />} onChange={(event) => setFormReady(!!event.target.value)} />

        <Button disabled={!formReady} type="submit">
          Send confirmation
        </Button>
      </Form>
    </div>
  );
}
