import { useQuery, useQueryClient } from 'react-query';

import { RefreshToken } from '../../../types';
import { api } from '../../../services/api';
import { useCallback, useMemo } from 'react';

export default function SessionsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<{ refreshToken: RefreshToken[] }>('fetch-refresh-tokens', async () => {
    const { data } = await api.get('/auth/refresh-token');

    return data;
  });

  const refreshTokenListLength = useMemo(() => data?.refreshToken.length, [data?.refreshToken.length]);

  const handleDeleteRefreshToken = useCallback(
    async (id: string) => {
      const previousRefreshTokens = queryClient.getQueryData<{ refreshToken: RefreshToken[] }>('fetch-refresh-tokens');

      if (previousRefreshTokens) {
        // all the tokens without this one
        const filteredRefreshTokens = previousRefreshTokens.refreshToken.filter((token) => token.id !== id);

        // mutate global state on query
        queryClient.setQueryData<{ refreshToken: RefreshToken[] }>('fetch-refresh-tokens', {
          refreshToken: filteredRefreshTokens,
        });

        try {
          await api.delete('/auth/refresh-token', {
            data: {
              id,
            },
          });
        } catch (error) {
          alert('failed to delete session, putting it back on the list');
          queryClient.setQueryData<{ refreshToken: RefreshToken[] }>('fetch-refresh-tokens', {
            refreshToken: previousRefreshTokens.refreshToken,
          });
          // if fail respawn the token
        }
      }
    },
    [queryClient]
  );

  if (isLoading) {
    return (
      <div>
        <p>bruh</p>
      </div>
    );
  }
  return (
    <div>
      <p style={{ color: 'black' }}>
        you have <strong>{refreshTokenListLength}</strong> active tokens
      </p>
      <br />

      <ul>
        {data?.refreshToken.map(({ id, expiresIn, platform }) => (
          <li key={id}>
            <h4 style={{ color: 'black' }}>{id}</h4>
            <h5 style={{ color: 'black' }}>{platform && `${platform}`}</h5>
            <p style={{ color: 'black' }}>
              expire date: <strong>{expiresIn}</strong>
            </p>
            <button onClick={() => handleDeleteRefreshToken(id)}>delete this one</button>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
