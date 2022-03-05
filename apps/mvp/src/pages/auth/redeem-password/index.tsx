import { useCallback, useRef, useState } from 'react';
import { FiLock, FiX, FiCheck } from 'react-icons/fi';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormProps = {
  password: string;
  confirmPassword: string;
};

export default function RedeemPassword() {
  const formRef = useRef<FormHandles>(null);
  const [passwordsEmpty, setPasswordsEmpty] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const checkPasswordsMatch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { password, confirmPassword } = formRef.current?.getData() as FormProps;

    const passwordsMatch = password === confirmPassword;

    if (!password || !confirmPassword) {
      setPasswordsEmpty(true);
      return;
    }

    if (passwordsMatch) {
      setPasswordsMatch(true);
      return;
    }

    setPasswordsEmpty(false);
    setPasswordsMatch(false);
  }, []);

  const handleRedeemPassword: SubmitHandler<FormProps> = useCallback(({ password, confirmPassword }) => {
    console.log({
      password,
      confirmPassword,
    });
  }, []);

  return (
    <div>
      <h1>set a new password</h1>

      <Form ref={formRef} onSubmit={handleRedeemPassword}>
        <Input required name="password" label="Password" placeholder="**************" icon={<FiLock />} onChange={checkPasswordsMatch} />
        <Input required name="confirmPassword" label="Confirm your password" placeholder="**************" icon={<FiLock />} onChange={checkPasswordsMatch} />

        {passwordsMatch ? (
          passwordsEmpty ? null : (
            <span>
              the password match <FiCheck />
            </span>
          )
        ) : (
          <span>
            the password do not match <FiX />
          </span>
        )}

        <Button disabled={!passwordsMatch} type="submit">
          Create new password
        </Button>
      </Form>
    </div>
  );
}
