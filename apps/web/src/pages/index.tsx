import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '../hooks/auth/user';
import { useLogout } from '../hooks/auth/useLogout';
import { Icon } from '@neo/icons/lib';

const Home: NextPage = () => {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <main>
      <h1>main page</h1>
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
          <h2 style={{ color: 'red' }}>Hello {user.name}</h2>
          <a>
            <button onClick={() => logout()}>logout</button>
          </a>
        </div>
      )}
      <Icon />
    </main>
  );
};

export default Home;
