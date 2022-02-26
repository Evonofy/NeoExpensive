import { memo } from 'react';
import { useQuery } from 'react-query';
import { NextPage } from 'next';

import { api } from '../services/api';

type APIStatusResponse = {
  api: boolean;
  mail: boolean;
  core: boolean;
  users: boolean;
};

const Status: NextPage = () => {
  const { data, error, isLoading } = useQuery<APIStatusResponse>('api-status', async () => {
    const { data } = await api.get<APIStatusResponse>('/status');
    return data;
  });

  if (isLoading) {
    return (
      <div>
        <p style={{ color: 'black' }}>loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'black' }}>something went wrong</p>
      </div>
    );
  }
  console.log({
    data,
  });
  return (
    <div>
      <p>status</p>

      {data && (
        <ul>
          <li style={{ color: 'black' }}>api: {String(data.api)}</li>
          <li style={{ color: 'black' }}>core: {String(data.core)}</li>
          <li style={{ color: 'black' }}>users: {String(data.users)}</li>
          <li style={{ color: 'black' }}>mail: {String(data.mail)}</li>
        </ul>
      )}
    </div>
  );
};

export default memo(Status);
