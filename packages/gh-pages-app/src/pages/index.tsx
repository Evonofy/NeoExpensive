import { FC } from 'react';

import { Translate } from '@components';

const Home: FC = (): JSX.Element => {
  return (
    <section>
      <h1>
        <Translate text="world" />
      </h1>
    </section>
  );
};

export default Home;
