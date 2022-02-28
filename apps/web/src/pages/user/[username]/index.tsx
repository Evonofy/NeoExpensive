import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import { SettingsContext } from '../../../context/SettingsContext';
import { api } from '../../../services/api';
import { User } from '../../../types';
import { AxiosError } from 'axios';

const Link = dynamic(() => import('next/link'));

type UserPageProps = {
  user: User;
};

const UserPage: NextPage<UserPageProps> = () => {
  const { push } = useRouter();

  const installTheme = useContextSelector(SettingsContext, (context) => context.installTheme);
  const installLanguage = useContextSelector(SettingsContext, (context) => context.installLanguage);

  const { data, isLoading } = useQuery<{ user: User }>('fetch-user', async () => {
    (api.defaults.headers as any)['authorization'] = `bearer ${localStorage.getItem('@neo:access')}`;

    try {
      const token = localStorage.getItem('@neo:access');

      if (!token) {
        push('/login');
        return;
      }

      const { data } = await api.get('/users/profile');
      return data;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response?.data.error === 'jwt expired') {
        const { data } = await api.post<{ accessToken: string; refreshToken?: string }>('/auth/refresh-token', {
          refresh_token: localStorage.getItem('@neo:refresh'),
        });

        const { accessToken, refreshToken } = data;

        localStorage.setItem('@neo:access', accessToken);

        if (refreshToken) {
          localStorage.setItem('@neo:refresh', refreshToken);
        }

        (api.defaults.headers as any)['authorization'] = `bearer ${localStorage.getItem('@neo:access')}`;

        const profile = await api.get('/users/profile');

        return profile.data;
      }
    }
  });

  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: 'black' }}>loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <p style={{ color: 'black' }}>{data?.user.id}</p>

      <div>
        <Link href={`/user/${data?.user.name}/sessions`}>see my sessions</Link>
      </div>

      <section>
        <div>
          <h3 style={{ color: 'black' }}>Themes</h3>
        </div>
        <div>
          <button onClick={() => installTheme({ theme: 'dark' })}>install dark theme</button>
        </div>
        <div>
          <button onClick={() => installTheme({ theme: 'light' })}>install light theme</button>
        </div>
        <div>
          <button onClick={() => installTheme({ theme: 'neon' })}>install neon theme</button>
        </div>
      </section>

      <section>
        <div>
          <h3 style={{ color: 'black' }}>Languages</h3>
        </div>
        <div>
          <button onClick={() => installLanguage({ language: 'pt-BR' })}>install portuguese language</button>
          <button onClick={() => installLanguage({ language: 'en-US' })}>install english language</button>
        </div>
      </section>
    </div>
  );
};

export default UserPage;
