import { FC } from 'react';
import isElectron from 'is-electron';

import { default as Header } from './Header';

export const Screen: FC = () => {
  if (!isElectron()) {
    return (
      <Header>
        <h1>Youu're NOooooooooooooo</h1>
      </Header>
    );
  }

  return (
    <Header>
      <h1>Youu're in electron jeyyyyyyyyyyyy</h1>
    </Header>
  );
};
