import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useContextSelector } from 'use-context-selector';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { StorageContext } from '../../../context/StorageContext';
import { RefreshToken } from '../../../types';
import { api } from '../../../services/api';

const SessionsPage = () => {
  // check if user in params is user logged in
  const queryClient = useQueryClient();
  const storageGet = useContextSelector(StorageContext, (context) => context.get);
  const [localTokenInformation, setLocalTokenInformation] = useState<{ id: string } | null>(null);

  const { data, isLoading } = useQuery<{ refreshToken: RefreshToken[] }>('fetch-refresh-tokens', async () => {
    const { data } = await api.get('/auth/refresh-token');

    return data;
  });

  useEffect(() => {
    async function getLocalTokenData() {
      const token = storageGet('@neo:refresh');

      const { data: refreshToken } = await api.get<{ id: string }>(`/auth/refresh-token/${token}`);

      setLocalTokenInformation(refreshToken);
    }

    getLocalTokenData();
  }, [storageGet]);

  const refreshTokenListLength = useMemo(() => data?.refreshToken.length, [data?.refreshToken.length]);

  const handleDeleteRefreshToken = useCallback(
    async (id: string) => {
      let proceed = true;

      if (localTokenInformation?.id === id) {
        // put modal instead of window.confirm, since window.confirm makes useQuery run again
        proceed = window.confirm('Do you really want to delete your local session?');
      }

      if (proceed) {
        const previousRefreshTokens = queryClient.getQueryData<{ refreshToken: RefreshToken[] }>('fetch-refresh-tokens');
        if (previousRefreshTokens) {
          // all the tokens without this one
          const filteredRefreshTokens = previousRefreshTokens.refreshToken.filter((token) => token.id !== id);
          console.log({
            filteredRefreshTokens,
          });

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
      }
    },
    [localTokenInformation?.id, queryClient]
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
        {data?.refreshToken.map(({ id, expiresIn, platform, createdAt }) => {
          const isLocalToken = localTokenInformation?.id === id;

          const formattedCreatedAt = format(parseISO(new Date(createdAt).toISOString()), 'd MMM yy', {
            locale: ptBR,
          });

          const formattedExpiresIn = format(parseISO(new Date(expiresIn * 1000).toISOString()), 'd MMM yy', {
            locale: ptBR,
          });
          return (
            <li style={{ color: 'black' }} key={id}>
              <h4 style={{ color: 'black' }}>{id}</h4>
              <h5 style={{ color: 'black' }}>{platform && `${platform}`}</h5>
              <p style={{ color: 'black' }}>
                created at: <strong>{formattedCreatedAt}</strong>
              </p>
              <p style={{ color: 'black' }}>
                expire date: <strong>{formattedExpiresIn}</strong>
              </p>
              {isLocalToken && (
                <div>
                  <strong>this is your local session</strong>
                </div>
              )}
              <button onClick={() => handleDeleteRefreshToken(id)}>delete this one</button>
              <br />
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SessionsPage;
