import { NextPage } from 'next';
import { useCallback } from 'react';
import { useContextSelector } from 'use-context-selector';

import { StorageContext } from '../../../context/StorageContext';

const Developer: NextPage = () => {
  const storage = useContextSelector(StorageContext, (context) => context.storage);
  const changeToCookies = useContextSelector(StorageContext, (context) => context.changeToCookies);
  const changeToLocalStorage = useContextSelector(StorageContext, (context) => context.changeToLocalStorage);

  const handleOptOutCookies = useCallback(() => {
    storage === 'cookies' ? changeToLocalStorage() : changeToCookies();
  }, [changeToCookies, changeToLocalStorage, storage]);

  return (
    <div style={{ color: 'black' }}>
      <h3>Developer Settings</h3>

      <button onClick={handleOptOutCookies}>change to {storage === 'cookies' ? 'localStorage' : 'cookies'}</button>
    </div>
  );
};

export default Developer;
