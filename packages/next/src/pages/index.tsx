import { FC } from 'react';

import { useClamp } from '@hooks';
import { HomeContainer } from '@styles/pages/home';

type HomeProps = {
  rootFontSize: number;
  setRootFontSize: number;
};

const Home: FC<HomeProps> = () => {
  return (
    <HomeContainer>
      <h1>test</h1>
    </HomeContainer>
  );
};

export default Home;
