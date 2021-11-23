import { Grid } from '@chakra-ui/react';
import { Header } from '@components';
import { useTypeSafeTranslation } from '@hooks';
import { FC } from 'react';

const Home: FC = () => {
  const { translated } = useTypeSafeTranslation();

  return (
    <Grid
      as="main"
      height="100vh"
      gridTemplateAreas="
      'header header header'
      '. main .'
    "
      gridTemplateColumns="5vw 90vw 5vw"
      gridTemplateRows="25vh auto"
    >
      <Header />
    </Grid>
  );
};

export default Home;
