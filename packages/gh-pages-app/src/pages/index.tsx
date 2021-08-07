import { FC, useCallback, useContext, useState } from 'react';

import { ThemeContext } from '@contexts';
import { useFetch } from '@hooks';

const Home: FC = (): JSX.Element => {
  const { cycle } = useContext(ThemeContext);
  type UserType = {
    id: number;
    login: string;
  };

  const { data } = useFetch<UserType>('users');

  if (!data) {
    return <p>loading</p>;
  }
  return (
    <section>
      <span>a</span>
      {data[0].login}
      <button onClick={() => cycle()}>cycle</button>
    </section>
  );
};

export default Home;
