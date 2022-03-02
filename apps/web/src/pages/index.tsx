import { useMemo, memo } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
const Link = dynamic(() => import('next/link'));
import { useContextSelector } from 'use-context-selector';

import { Icon } from '@neo/icons/lib';
import { useUser } from '../hooks/auth/user';
import { useLogout } from '../hooks/auth/useLogout';
import { AuthContext } from 'context/AuthContext';

const Home: NextPage = () => {
  const { user } = useUser();
  const { logout } = useLogout();

  const isGithubUser = useMemo(() => {
    return user?.githubId ? true : false;
  }, [user]);

  const disconnectAccount = useContextSelector(AuthContext, (context) => context.disconnectAccount);

  return (
    <main>
      <h1 style={{ color: 'black' }}>This is a work in progress :)</h1>
      <a href="/neo-expensive/old/index.html">Go to the old website</a>
      {!user && (
        <div>
          <div>
            <Link href="/login">
              <a>Go to login</a>
            </Link>
          </div>
          <div>
            <Link href="/register">
              <a>Go to register</a>
            </Link>
          </div>
          <div>
            <Link href="/forgot-password">
              <a>forgot password</a>
            </Link>
          </div>
          <div>
            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/users/login/oauth/github`}>
              <a>login with github</a>
            </Link>
          </div>
          <div>
            <Link href={`${process.env.NEXT_PUBLIC_API_URL}/users/login/oauth/neo`}>
              <a>login with neo-expensive</a>
            </Link>
          </div>
        </div>
      )}

      <div>
        <Link href="/status">
          <a>check all our services stautses</a>
        </Link>
      </div>

      {user && (
        <div>
          <div>
            <h2 style={{ color: 'red' }}>Hello {user.name}</h2>
            <a>
              <button onClick={() => logout()}>logout</button>
            </a>
          </div>

          <div>
            <a>
              <button onClick={() => disconnectAccount()}>disconnect my account from every browser</button>
            </a>
          </div>

          <div>
            <Link href={`/user/${user.username}`}>
              <a>go to settings page</a>
            </Link>
          </div>

          <div>
            <Link href="/recover-password">
              <a>{isGithubUser ? 'create a password' : 'set new password'}</a>
            </Link>
          </div>

          <img width="100" src={user.avatarUrl} alt="" />

          <div>
            <pre style={{ color: 'black' }}>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      )}
      <Icon />
    </main>
  );
};

export default memo(Home);
