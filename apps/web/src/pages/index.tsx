import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '../hooks/auth/user';
import { Icon } from '@neo/icons/lib';

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <main>
      <h1>main page</h1>
      {user && <h2 style={{ color: 'red' }}>Hello {user.name}</h2>}
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
      <Icon />
    </main>
  );
};

export default Home;
