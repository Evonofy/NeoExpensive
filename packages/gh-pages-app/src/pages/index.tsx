import { FC } from 'react';

import { useFetch, useTheme } from '@hooks';
import { ComplexTranslate, Translate } from '@components';

const Home: FC = (): JSX.Element => {
  const { cycle } = useTheme();
  return (
    <section>
      <ComplexTranslate text="world">
        {({ translatedText }) => (
          <>
            <h1>{translatedText}</h1>
            <h1>{translatedText}</h1>
            <h1>{translatedText}</h1>
            <h1>{translatedText}</h1>
          </>
        )}
      </ComplexTranslate>
      <span>a</span>
      <button onClick={() => cycle()}>cycle</button>
    </section>
  );
};

export default Home;
