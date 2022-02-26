import { NextPage } from 'next';
import { useQuery } from 'react-query';

import { api } from '../../services/api';
import { User } from '../../types';

type UserPageProps = {
  user: User;
};

const UserPage: NextPage<UserPageProps> = () => {
  const { error, isLoading, data } = useQuery('fetch-user', async () => {
    const { data } = await api.get('/users');

    return data;
  });

  if (isLoading) {
    <div>
      <p style={{ color: 'black' }}>loading...</p>
    </div>;
  }

  if (error) {
    <div>
      <p style={{ color: 'black' }}>bruh</p>
    </div>;
  }

  return (
    <div>
      <p style={{ color: 'black' }}>bruh</p>
      <pre style={{ color: 'black' }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UserPage;
