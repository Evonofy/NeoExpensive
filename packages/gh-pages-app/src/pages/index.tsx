import { FC } from 'react';
import { useTypeSafeTranslation } from '../hooks/useTranslation';

import Logo from './icon.svg';

const Home: FC = (): JSX.Element => {
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <h1>{t('hello')}</h1>
      <h1>{t('world')}</h1>
    </>
  );
};

export default Home;
