import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useContext, useContextSelector } from 'use-context-selector';
import { AxiosError } from 'axios';
import React, { useMemo, useState } from 'react';

import { SettingsContext } from '../../../context/SettingsContext';
import { api } from '../../../services/api';
import { User } from '../../../types';
import { refreshTokenExpireTime, accessTokenExpireTime } from '../../../context/AuthContext';
import { StorageContext } from '../../../context/StorageContext';
import { useUser } from '../../../hooks/auth/user';
import { useLogout } from '../../../hooks/auth/useLogout';

const Link = dynamic(() => import('next/link'));

type UserPageProps = {
  username: string;
};

const UserPage: NextPage<UserPageProps> = ({ username }) => {
  const { user } = useUser();
  const { push } = useRouter();
  const { logout } = useLogout();

  const [userData, setUserData] = useState<Array<{
    name: string;
    description: string;
    value: string;
  }> | null>(null);

  const storage = useContext(StorageContext);

  const theme = useContextSelector(SettingsContext, (context) => context.theme);
  const language = useContextSelector(SettingsContext, (context) => context.language);

  const installTheme = useContextSelector(SettingsContext, (context) => context.installTheme);
  const resetDefault = useContextSelector(SettingsContext, (context) => context.resetDefault);
  const installLanguage = useContextSelector(SettingsContext, (context) => context.installLanguage);

  const isPageUser = useMemo(() => {
    return user?.username === username;
  }, [user?.username, username]);

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

      const token = storage.get('@neo:refresh');

      const { data } = await api.post<{ accessToken: string; refreshToken?: string }>('/auth/refresh-token', {
        refresh_token: token,
      });

      const { accessToken, refreshToken } = data;

      storage.set('@neo:access', accessToken, {
        maxAge: accessTokenExpireTime,
      });

      if (refreshToken) {
        storage.set('@neo:refresh', refreshToken, {
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

  function handleShowUserData() {
    if (userData) {
      setUserData(null);
      return;
    }

    const storageArray = Object.entries(storage.getAll());

    const descriptionTable: Record<string, string> = {
      '@neo:access': "makes sure you're authenticated to our server",
      '@neo:refresh': 'keeps you logged in the app',
      '@neo:authorization': "knows wheter you've pressed the neo-expertise oauth button once",
      '@neo:theme': "the current theme you're using",
      '@neo:language': "the current language you're using",
    };

    const formattedCookies = storageArray.map(([name, value]) => ({
      name,
      description: descriptionTable[name] || 'not yet documented',
      value,
    }));

    setUserData(formattedCookies);
  }

  function handleDeleteUserData(name: string) {
    setUserData((data) => {
      const filteredUserData = data?.filter((entry) => entry.name !== name);

      if (!filteredUserData) {
        return data;
      }

      return filteredUserData;
    });

    storage.remove(name);
  }

  async function softLogoutUser() {
    const token = storage.get('@neo:refresh');

    try {
      const { data: refreshToken } = await api.get<{ id: string }>(`/auth/refresh-token/${token}`);

      // call the api to delete refresh token
      if (refreshToken) {
        await api.delete('/auth/refresh-token', {
          data: {
            id: refreshToken.id,
          },
        });
      }
    } catch (error) {
      console.log((error as AxiosError)?.response?.data);
    }

    storage.remove('@neo:refresh');
    storage.remove('@neo:authorization');
  }

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

  async function handleDeleteUser() {
    try {
      await api.delete('/users');
      logout();
      push('/');
    } catch (error) {
      console.log((error as AxiosError)?.response?.data);
    }
  }

  return (
    <div style={{ color: 'black' }}>
      <p style={{ color: 'black' }}>{data?.user.id}</p>
      <h1>this is {isPageUser ? '' : 'not'} your page</h1>

      {!isPageUser && (
        <div>
          <p>not logged in?</p>
          <button onClick={() => push(`/login?return_to=/user/${username}`)}>login now</button>
        </div>
      )}

      {isPageUser && (
        <div>
          <div>
            <Link href={`/user/${data?.user.name}/developer`}>developer settings</Link>
          </div>
          <div>
            <Link href={`/user/${data?.user.name}/sessions`}>see my sessions</Link>
          </div>
          <div>
            <button onClick={resetDefault}>reset to defaults</button>
          </div>
          <div>
            <button onClick={handleDeleteUser}>delete my account</button>
          </div>
          <div>
            <button onClick={logout}>logout</button>
          </div>
          <div>
            <button onClick={handleShowUserData}>{userData ? 'close my data' : 'see my data'}</button>

            <br />
            {userData && <button onClick={softLogoutUser}>delete all stored data but keep me logged in</button>}

            <ul>
              {/* explain why each cookie is needed */}
              {userData && (
                <React.Fragment>
                  <strong>deleting @neo:access and @neo:refresh will log you out</strong>

                  {userData.map(({ name, description, value }) => (
                    <li key={name}>
                      <strong>{name}</strong> {value}
                      <br />
                      <p>description: {description}</p>
                      <button onClick={() => handleDeleteUserData(name!)}>delete</button>
                      <br />
                      <br />
                    </li>
                  ))}
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      )}

      <section>
        <div>
          <h3 style={{ color: 'black' }}>Themes</h3>

          <p style={{ color: 'black' }}>
            current theme: <strong>{theme}</strong>
          </p>
        </div>
        {isPageUser && (
          <div>
            <div>
              <button onClick={() => installTheme({ theme: 'dark' })}>install dark theme</button>
            </div>
            <div>
              <button onClick={() => installTheme({ theme: 'light' })}>install light theme</button>
            </div>
            <div>
              <button onClick={() => installTheme({ theme: 'neon' })}>install neon theme</button>
            </div>
          </div>
        )}
      </section>

      <section>
        <div>
          <h3 style={{ color: 'black' }}>Languages</h3>
          <p style={{ color: 'black' }}>
            current theme: <strong>{language}</strong>
          </p>
        </div>
        {isPageUser && (
          <div>
            <button onClick={() => installLanguage({ language: 'pt-BR' })}>install portuguese language</button>
            <button onClick={() => installLanguage({ language: 'en-US' })}>install english language</button>
          </div>
        )}
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
