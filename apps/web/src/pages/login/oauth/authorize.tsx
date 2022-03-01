import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { useCallback, useEffect } from 'react';

import { useUser } from '../../../hooks/auth/user';
import { useQuery } from 'react-query';
import { api } from '../../../services/api';
import { User } from '../../../types';

type AuthorizeProps = {
  user: User | null;
  scope: string;
  clientId: string;
};

type OAuthApp = {
  id: string;
  name: string;
  description: string;
  homepage: string;
  callback: string;
};

const Authorize: NextPage<AuthorizeProps> = ({ scope, user, clientId }) => {
  // hit api and get information about app with this clientId
  const { push } = useRouter();
  const { user: storeUser } = useUser();
  const { data: app, isLoading } = useQuery<OAuthApp>('get-oauth-app', async () => {
    const { data } = await api.get<OAuthApp>(`/oauth/apps/${clientId}`);

    return data;
  });

  const handleAuthorizeApp = useCallback(() => {
    // login user with oauth
    const code = storeUser?.id;

    window.location.href = `${app?.callback}?code=${code}&source=neo`;
    setCookie(undefined, '@neo:authorization', 'true', {
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    });
  }, [app?.callback, storeUser?.id]);

  useEffect(() => {
    if (!user) {
      push(`/login?return_to=/login/oauth/authorize?scope=${scope}&client_id=${clientId}`);

      return;
    }

    const { '@neo:authorization': token } = parseCookies();

    if (token === 'true' && app) {
      const code = user.id;

      window.location.href = `${app.callback}?code=${code}&source=neo`;
    }
  }, [app, clientId, push, scope, user]);

  if (isLoading) {
    return (
      <div>
        <p>is loading...</p>
      </div>
    );
  }

  return (
    <div style={{ color: 'black' }}>
      <div>
        <h3>
          authorize with scope: <strong>{scope}</strong>
        </h3>
        <p>{app?.description}</p>
      </div>

      <div>
        <button onClick={handleAuthorizeApp}>Authorize {app?.name}</button>
        <br />
        <p>
          will redirect to <strong>{app?.homepage}</strong>
        </p>
      </div>
    </div>
  );
};

Authorize.getInitialProps = async (ctx): Promise<AuthorizeProps> => {
  const { '@neo:access': token } = parseCookies(ctx);

  const isLoggedIn = !!token;

  const { scope, client_id: clientId } = ctx.query;

  if (!isLoggedIn) {
    return {
      scope: scope as string,
      clientId: clientId as string,
      user: null,
    };
  }

  (api.defaults.headers as any)['authorization'] = `bearer ${token}`;

  try {
    const { data } = await api.post<{ id: string }>('/users/profile');

    const user = {
      id: data.id,
    } as User;

    return {
      scope: scope as string,
      clientId: clientId as string,
      user,
    };
  } catch (error) {
    return {
      scope: scope as string,
      clientId: clientId as string,
      user: null,
    };
  }
};

export default Authorize;
