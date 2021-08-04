import { FC } from 'react';

import { Translate } from '@components';
import { useTypeSafeTranslation } from '@hooks';

const Home: FC = (): JSX.Element => {
  const { translated } = useTypeSafeTranslation();

  return (
    <>
      <h1>{translated('hello')}</h1>
      <h1>{translated('world')}</h1>
      <h3>
        <Translate text="hello" />
        <Translate text="world" />
      </h3>
    </>
  );
};

export default Home;
