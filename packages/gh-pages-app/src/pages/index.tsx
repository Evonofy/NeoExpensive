import { FC } from 'react';
import { NextSeo } from 'next-seo';

import logo from './icon.svg';

const Home: FC = (): JSX.Element => {
  return (
    <>
      <NextSeo
        title="home"
        description="Homepage of EvoExpensive | For you to buy everything"
      />
      hello world
      <img src={logo} alt="" />
    </>
  );
};

export default Home;
