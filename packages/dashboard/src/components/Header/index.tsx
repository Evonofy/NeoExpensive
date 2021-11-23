import { Grid } from '@chakra-ui/react';
import { FC } from 'react';
import { Navigation } from '../';

export const Header: FC = () => {
  return (
    <Grid
      as="header"
      gridArea="header"
      width="100%"
      backgroundColor="purple.400"
      height="100%"
    >
      <Navigation />
    </Grid>
  );
};
