import { FC, useContext } from 'react';

import { ThemeContext } from '@contexts';

const Home: FC = (): JSX.Element => {
  const { cycle } = useContext(ThemeContext);

  return (
    <section>
      <span>a</span>
      <button onClick={() => cycle()}>cycle</button>
    </section>
  );
};

export default Home;
