import { FC } from 'react';

import { useClamp } from '@hooks';

type HomeProps = {
  rootFontSize: number;
  setRootFontSize: number;
};

const Home: FC<HomeProps> = ({ rootFontSize }) => {
  console.log(useClamp('1rem', '3rem', rootFontSize));
  return (
    <section>
      <h1>test</h1>
    </section>
  );
};

export default Home;
