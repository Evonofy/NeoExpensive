import { FC } from 'react';

import { useFetch, useTheme } from '@hooks';
import { ComplexTranslate, Translate } from '@components';

const Home: FC = (): JSX.Element => {
  const { cycle } = useTheme();
  type UserType = {
    id: number;
    login: string;
  };

  const { data } = useFetch<UserType>('users');
  console.log(data);
  if (!data) {
    return <p>loading</p>;
  }
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
      {data[0].login}
      <button onClick={() => cycle()}>cycle</button>
    </section>
  );
};

export default Home;
