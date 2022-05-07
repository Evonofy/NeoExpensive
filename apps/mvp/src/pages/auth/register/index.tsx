import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { FiUser, FiMail, FiLock, FiX, FiCheck } from 'react-icons/fi';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import UndrawAbstract from '../../../images/pages/login-register/undraw_abstract.svg';
import NeoDPad from '../../../images/general/logos/neo-dpad-logo.svg';

import { AuthContext } from '@context/auth';
import { Input } from '@components/Input';
import { CpfInput } from '@components/Input/cpf';
import { CepInput } from '@components/Input/cep';
import { Link } from '@components/Link';
import { Button } from '@components/Button';
import { styled } from '@src/styles/stitches.config';

import styles from './styles.module.scss';

export const Container = styled('div');

export const Margin = styled('section', {
  margin: '12px 0',
});

export const SpecialLink = styled('span', {
  backgroundImage: 'linear-gradient($accent100, $accent200);',
  backgroundSize: '0% 2px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  transition: 'all 200ms',
  width: 'max-content',

  '&:hover': {
    backgroundSize: '100% 2px',
  },
});

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
    setStep((step) => step + 1);
    setCanProceed(false);
  }, []);

  const handleRemoveStep = useCallback(() => {
    setCanProceed(true);
    setStep((step) => step - 1);
  }, []);

  return (
    <Container className={`${styles.container} register--body`} data-active-step={step}>
      <section className="register--body--wrapper">
        <section className="register--illustration">
          <img src={UndrawAbstract} alt="" className="register--illustration--image" />
          <h1 className="register--illustration--header">Entre para a Neo Expertise</h1>
          <p className="register--illustration--paragraph">Aproveite milhares de ofertas, preços baixos e a melhor experiência.</p>
          <SpecialLink className="register--form--heading--link">
            <Link href="/login">
              <p className="register--form--heading--paragraph">Já tem uma conta? Login</p>
            </Link>
          </SpecialLink>
        </section>

        <section className="register--form--wrapper">
          <Form ref={formRef} onSubmit={handleRegister} className="register--form">
            <div className="register--form--heading">
              <div className="register--form--heading--image">
                <img src={NeoDPad} alt="Neo DPad Logo" />
              </div>

              <h1 className="register--form--heading--header">Explore a Neo Expertise</h1>
            </div>

            <div className={`${styles.step} ${styles['step-0']}`}>
              <Margin>
                <Input autoFocus required name="name" label="Enter your name" placeholder="john doe" icon={<FiUser />} onChange={handleCanProceed} />
              </Margin>

              <Margin>
                <Input required name="email" label="Enter your e-mail" placeholder="support@neo-expertise.com" icon={<FiMail />} onChange={handleCanProceed} />
              </Margin>

              <Margin>
                <Input
                  required
                  type="password"
                  name="password"
                  label="Enter your password"
                  placeholder="**************"
                  icon={<FiLock />}
                  onChange={() => {
                    handleCanProceed();
                    checkPasswordsMatch();
                  }}
                />
              </Margin>

              <Margin>
                <Input
                  required
                  type="password"
                  name="confirmPassword"
                  label="Confirm your password"
                  placeholder="**************"
                  icon={<FiLock />}
                  onChange={() => {
                    handleCanProceed();
                    checkPasswordsMatch();
                  }}
                />
              </Margin>

              {passwordsMatch ? (
                passwordsEmpty ? null : (
                  <span style={{ color: '#AAEECD', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiCheck />
                    the password match
                  </span>
                )
              ) : passwordsEmpty ? null : (
                <span style={{ color: '#FF5C5C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiX />
                  the password do not match
                </span>
              )}
            </div>

            <div className={`${styles.step} ${styles['step-1']}`}>
              <Margin>
                <CpfInput required name="cpf" label="CPF" placeholder="000.000.000-00" icon={<FiUser />} onChange={handleCanProceed} />
              </Margin>

              <Margin>
                <Input required type="date" name="birthDate" label="Birth Date" placeholder="24/12/12" icon={<FiUser />} onChange={handleCanProceed} />
              </Margin>
            </div>

            <div className={`${styles.step} ${styles['step-2']}`}>
              <Margin>
                <CepInput name="cep" label="CPF" placeholder="046943-293" icon={<FiUser />} onChange={handleCanProceed} />
              </Margin>

              <Margin>
                <Input name="number" label="Number" placeholder="2" icon={<FiUser />} onChange={handleCanProceed} />
              </Margin>

              <Margin>
                <Input optional name="complement" label="Complement" placeholder="apartment 4" icon={<FiUser />} onChange={handleCanProceed} />
              </Margin>
            </div>
          </Form>

          <Margin style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="outlined" noload disabled={step === 0} onClick={handleRemoveStep} type="button">
                  Back
                </Button>
                <Button variant="outlined" noload disabled={!canProceed || step === 2} onClick={handleAddStep} type="button">
                  next
                </Button>
              </div>

              <Margin>
                {step === 2 && (
                  <Button disabled={!(step === 2 && canProceed)} type="submit" onClick={() => formRef.current?.submitForm()}>
                    Create my account
                  </Button>
                )}
              </Margin>
            </div>
          </Margin>
        </section>
      </section>
    </Container>
  );
}
