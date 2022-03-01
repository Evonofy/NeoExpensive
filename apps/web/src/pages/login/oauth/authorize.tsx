import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { useCallback, useEffect, useState } from 'react';

import { useUser } from '../../../hooks/auth/user';
import { api } from '../../../services/api';

type OAuthApp = {
  id: string;
  name: string;
  description: string;
  homepage: string;
  callback: string;
};

const Authorize: NextPage = () => {
  const { user } = useUser();
  const { push } = useRouter();
  const [query, setQuery] = useState<{ scope: string; clientId: string } | null>(null);
  const [app, setApp] = useState<OAuthApp | null>(null);

  useEffect(() => {
    const url = window.location.href;
    const [, information] = url?.split('?scope=');
    const [scope, clientId] = information?.split('&client_id=') as string[];

    if (!scope || !clientId) {
      return;
    }

    setQuery({
      scope,
      clientId,
    });

    const fetch = async () => {
      const { data } = await api.get<OAuthApp>(`/oauth/apps/${clientId}`);

      setApp(data);
    };

    fetch();
  }, []);

  useEffect(() => {
    // hit api and see if token is valid
    const { '@neo:access': access, '@neo:refresh': refresh, '@neo:authorization': authorization } = parseCookies();

    if (!access || !refresh) {
      push(`/login?return_to=/login/oauth/authorize?scope=${query?.scope}&client_id=${query?.clientId}`);
      return;
    }

    if (authorization === 'true' && user) {
      const code = user?.id;

      window.location.href = `${app?.callback}?code=${code}&source=neo`;
    }
  }, [app, push, query?.clientId, query?.scope, user]);

  const handleAuthorizeApp = useCallback(() => {
    // login user with oauth
    const code = user?.id;

    window.location.href = `${app?.callback}?code=${code}&source=neo`;

    setCookie(undefined, '@neo:authorization', 'true', {
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    });
  }, [app?.callback, user?.id]);

  return (
    <div style={{ color: 'black' }}>
      <div>
        <h3>
          authorize with scope: <strong>{query?.scope}</strong>
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

export default Authorize;
