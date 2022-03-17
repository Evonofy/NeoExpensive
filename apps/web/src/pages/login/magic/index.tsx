import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { api } from '../../../services/api';

type FormProps = {
  login: string;
};

const MagicLinkLogin: NextPage = () => {
  const { register, handleSubmit } = useForm<FormProps>();
  const [isMessageSent, setIsMessageSent] = useState(false);

  // get the query props
  const handleMagicLinkAuth: SubmitHandler<FormProps> = useCallback(async ({ login }) => {
    try {
      await api.post('/users/login/magic', {
        login,
      });

      setIsMessageSent(true);
    } catch (error) {
      setIsMessageSent(false);
    }
  }, []);

  return (
    <div style={{ color: 'black' }}>
      <p>passwordless authentication</p>

      {isMessageSent ? (
        <h1>we sent you an email</h1>
      ) : (
        <form onSubmit={handleSubmit(handleMagicLinkAuth)}>
          <input placeholder="ID, E-mail, Username" type="text" {...register('login')} />
          <button type="submit">send me an email</button>
        </form>
      )}
    </div>
  );
};

export default MagicLinkLogin;
