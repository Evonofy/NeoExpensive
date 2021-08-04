import { FC } from 'react';

import { NextSeo } from 'next-seo';

const Home: FC = () => {
  return (
    <>
      <NextSeo
        title="home"
        description="Homepage of EvoExpensive | For you to buy everything"
      />
      hello world
    </>
  );
};

export default Home;
