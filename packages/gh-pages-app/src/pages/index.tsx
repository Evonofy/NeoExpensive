import { FC } from 'react';
import { NextSeo } from 'next-seo';

import Logo from './icon.svg';

const Home: FC = (): JSX.Element => {
  return (
    <>
      <NextSeo
        title="home"
        description="Homepage of EvoExpensive | For you to buy everything"
      />
      hello world
      <Logo />
    </>
  );
};

export default Home;
