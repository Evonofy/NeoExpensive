import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { FiUser, FiMail, FiLock, FiX, FiCheck } from 'react-icons/fi';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { AuthContext } from '@context/auth';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import styles from './styles.module.scss';

type FormProps = {
  /* STEP 1 */
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  /* STEP 1 */

  /* STEP 2 */
  cpf: string;
  birthDate: string;
  /* STEP 2 */

  /* STEP 3 */
  cep: string;
  number: string;
  complement?: string;
  /* STEP 3 */
};

export default function Register() {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const register = useContextSelector(AuthContext, (context) => context.register);

  const [step, setStep] = useState<number>(0);
  const [canProceed, setCanProceed] = useState(false);
  const [passwordsEmpty, setPasswordsEmpty] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleRegister: SubmitHandler<FormProps> = useCallback(
    async (data) => {
      const { name, email, cpf, birthDate, password } = data;

      const { errors } = await register({
        name,
        email,
        cpf,
        birthDate,
        password,
      });

      if (errors) {
        errors.forEach(({ field, message }) => formRef.current?.setFieldError(field, message));
        return;
      }

      navigate('/email/confirmation');
    },
    [navigate, register]
  );

  const checkPasswordsMatch = useCallback(() => {
    const { password, confirmPassword } = formRef.current?.getData() as FormProps;

    const passwordsMatch = password === confirmPassword;

    if (step === 0) {
      if (!password || !confirmPassword) {
        setPasswordsEmpty(true);
        setCanProceed(false);
        return;
      }

      if (passwordsMatch) {
        setCanProceed(true);
        setPasswordsEmpty(false);
        setPasswordsMatch(true);
        return;
      }

      setCanProceed(false);
      setPasswordsEmpty(false);
      setPasswordsMatch(false);
    }
  }, [step]);

  const handleCanProceed = useCallback(() => {
    const { name, email, password, confirmPassword, cpf, birthDate, cep, number } = formRef.current?.getData() as FormProps;

    setCanProceed(false);

    if (step === 0) {
      if (!name || !email || !password || !confirmPassword) {
        setCanProceed(false);
        return;
      }

      setCanProceed(true);
      return;
    }

    if (step === 1) {
      if (!cpf || !birthDate) {
        setCanProceed(false);
        return;
      }

      setCanProceed(true);
      return;
    }

    if (step === 2) {
      if (!cep || !number) {
        setCanProceed(false);
        return;
      }

      setCanProceed(true);
      return;
    }
  }, [step]);

  const handleAddStep = useCallback(() => {
    setCanProceed(false);
    setStep((step) => step + 1);
  }, []);

  const handleRemoveStep = useCallback(() => {
    setCanProceed(true);
    setStep((step) => step - 1);
  }, []);

  return (
    <div className={styles.container} data-active-step={step}>
      <h1>create an account</h1>

      <Form ref={formRef} onSubmit={handleRegister}>
        <div className={`${styles.step} ${styles['step-0']}`}>
          <Input autoFocus required name="name" label="Name" placeholder="john doe" icon={<FiUser />} onChange={handleCanProceed} />
          <Input required name="email" label="E-mail" placeholder="mail@example.com" icon={<FiMail />} onChange={handleCanProceed} />

          <Input
            required
            name="password"
            label="Password"
            placeholder="**************"
            icon={<FiLock />}
            onChange={() => {
              handleCanProceed();
              checkPasswordsMatch();
            }}
          />

          <Input
            required
            name="confirmPassword"
            label="Confirm your password"
            placeholder="**************"
            icon={<FiLock />}
            onChange={() => {
              handleCanProceed();
              checkPasswordsMatch();
            }}
          />

          {passwordsMatch ? (
            passwordsEmpty ? null : (
              <span>
                the password match <FiCheck />
              </span>
            )
          ) : passwordsEmpty ? null : (
            <span>
              the password do not match <FiX />
            </span>
          )}
        </div>

        {/* <div className="step step-1"> */}
        <div className={`${styles.step} ${styles['step-1']}`}>
          <Input required name="cpf" label="CPF" placeholder="000.000.000-00" icon={<FiUser />} onChange={handleCanProceed} />
          <Input required name="birthDate" label="Birth Date" placeholder="24/12/12" icon={<FiUser />} onChange={handleCanProceed} />
        </div>

        <div className={`${styles.step} ${styles['step-2']}`}>
          <Input name="cep" label="CPF" placeholder="046943-293" icon={<FiUser />} onChange={handleCanProceed} />
          <Input name="number" label="Number" placeholder="2" icon={<FiUser />} onChange={handleCanProceed} />
          <Input name="complement" label="Complement" placeholder="apartment 4" icon={<FiUser />} onChange={handleCanProceed} />
        </div>

        <Button disabled={!(step === 2 && canProceed)} type="submit">
          submit form
        </Button>

        <Button disabled={!canProceed || step === 2} onClick={handleAddStep} type="button">
          next
        </Button>

        {step === 2 && <Button type="submit">skip</Button>}

        {step > 0 && (
          <Button onClick={handleRemoveStep} type="button">
            Back
          </Button>
        )}
      </Form>
    </div>
  );
}
