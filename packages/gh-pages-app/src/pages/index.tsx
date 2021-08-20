import { FC } from 'react';

import { Translate, ComplexTranslate } from '@components';
import { FacebookLogo } from 'phosphor-react';
const Home: FC = (): JSX.Element => {
  return (
    <section>
      <h1>
        <Translate text="world" />
      </h1>
      <FacebookLogo width={70} height={70} />
      <h1>BBBBBBBBBB</h1>
      <h1>aaaaaa</h1>
    </section>
  );
};

export default Home;
