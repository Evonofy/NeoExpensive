import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '../hooks/auth/user';
import { useLogout } from '../hooks/auth/useLogout';
import { Icon } from '@neo/icons/lib';
import { useMemo } from 'react';
import Button from '@neo/ui/components/Button';

const Home: NextPage = () => {
  const { user } = useUser();
  const { logout } = useLogout();

  const isGithubUser = useMemo(() => {
    return user?.githubId ? true : false;
  }, [user]);

  return (
    <main>
      <h1 style={{ color: 'black' }}>This is a work in progress :)</h1>
      <a href="/neo-expensive/old/index.html">Go to the old website</a>
      <Button />
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
        </div>
      )}
      {user && (
        <div>
          <div>
            <h2 style={{ color: 'red' }}>Hello {user.name}</h2>
            <a>
              <button onClick={() => logout()}>logout</button>
            </a>
          </div>

          <div>
            <Link href="/recover-password">
              <a>{isGithubUser ? 'create a password' : 'set new password'}</a>
            </Link>
          </div>

          <img src={user.avatarUrl} alt="" />

          <div>
            <pre style={{ color: 'black' }}>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      )}
      <Icon />
    </main>
  );
};

export default Home;
