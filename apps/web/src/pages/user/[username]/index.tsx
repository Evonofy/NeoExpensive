import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useContextSelector } from 'use-context-selector';
import { parseCookies, setCookie } from 'nookies';

import { SettingsContext } from '../../../context/SettingsContext';
import { api } from '../../../services/api';
import { User } from '../../../types';
import { AxiosError } from 'axios';
import { refreshTokenExpireTime, accessTokenExpireTime } from '../../../context/AuthContext';
import { useEffect } from 'react';

const Link = dynamic(() => import('next/link'));

type UserPageProps = {
  username: string;
};

const UserPage: NextPage<UserPageProps> = ({ username }) => {
  const { asPath, push } = useRouter();

  const theme = useContextSelector(SettingsContext, (context) => context.theme);
  const language = useContextSelector(SettingsContext, (context) => context.language);

  const installTheme = useContextSelector(SettingsContext, (context) => context.installTheme);
  const resetDefault = useContextSelector(SettingsContext, (context) => context.resetDefault);
  const installLanguage = useContextSelector(SettingsContext, (context) => context.installLanguage);

  useEffect(() => {
    const { '@neo:access': token } = parseCookies();

    if (!token) {
      push(`/login?return_to=${asPath}`);
    }
  }, [asPath, push]);

  const { data, isLoading, error } = useQuery<{ user: User }>('fetch-user', async () => {
    try {
      const { data: user } = await api.post<User>('/users/username', {
        username,
      });

      return {
        user,
      };
    } catch (error) {
      const { response } = error as AxiosError;

      if (response?.data.error !== 'jwt expired') {
        push('/login');
      }

      const { '@neo:refresh': token } = parseCookies();

      const { data } = await api.post<{ accessToken: string; refreshToken?: string }>('/auth/refresh-token', {
        refresh_token: token,
      });

      const { accessToken, refreshToken } = data;

      setCookie(undefined, '@neo:access', accessToken, {
        maxAge: accessTokenExpireTime,
      });

      if (refreshToken) {
        setCookie(undefined, '@neo:refresh', refreshToken, {
          maxAge: refreshTokenExpireTime,
        });
      }

      (api.defaults.headers as any)['authorization'] = `bearer ${accessToken}`;
      const profile = await api.get('/users/profile');

      const { data: user } = await api.get<User>(`/users/${profile.data.id}`);

      return {
        user,
      };
    }
  });

  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: 'black' }}>loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>without data</p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ color: 'black' }}>{data?.user.id}</p>

      <div>
        <Link href={`/user/${data?.user.name}/sessions`}>see my sessions</Link>
      </div>

      <div>
        <button onClick={resetDefault}>reset to defaults</button>
      </div>

      <section>
        <div>
          <h3 style={{ color: 'black' }}>Themes</h3>

          <p style={{ color: 'black' }}>
            current theme: <strong>{theme}</strong>
          </p>
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
          <p style={{ color: 'black' }}>
            current theme: <strong>{language}</strong>
          </p>
        </div>
        <div>
          <button onClick={() => installLanguage({ language: 'pt-BR' })}>install portuguese language</button>
          <button onClick={() => installLanguage({ language: 'en-US' })}>install english language</button>
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<UserPageProps> = async () => {
  const { data: users } = await api.get<User[]>('/users');

  return {
    fallback: false,
    paths: users.map(({ username }) => ({
      params: {
        username,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps<UserPageProps, UserPageProps> = async ({ params }) => {
  if (!params) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { username } = params;

  return {
    props: {
      username: username,
    },
  };
};

export default UserPage;
