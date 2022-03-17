import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContextSelector } from 'use-context-selector';

import { api } from '../../../services/api';
import { StorageContext } from '../../../context/StorageContext';

const AuthorizeMagicLink: NextPage = () => {
  // get the query props
  const setStorage = useContextSelector(StorageContext, (context) => context.set);

  const { query, push } = useRouter();

  useEffect(() => {
    if (query.access && query.refresh) {
      // access token info
      setStorage('@neo:access', query.access as string);
      setStorage('@neo:refresh', query.refresh as string);

      (api.defaults.headers as any)['authorization'] = `bearer ${query.access}`;

      push('/');
    }
  }, [query, setStorage, push]);

  return (
    <div>
      <p>nothing to see here</p>
    </div>
  );
};

export default AuthorizeMagicLink;
