import { Box, Flex, Grid, Link } from '@chakra-ui/react';
import { FC } from 'react';

export const NavigationItem: FC = ({ children }) => {
  return (
    <Flex as="div">
      <Box>{/* LOGO */}</Box>

      <Link as="a" fontSize={'sm'}>
        {children}
      </Link>
    </Flex>
  );
};

type Item = {
  name: string;
  disabled?: boolean;
};

const navItems: Item[] = [
  {
    name: 'Overview'
  },
  {
    name: 'Products'
  },
  {
    name: 'Clients'
  },
  {
    name: 'E-mail',
    disabled: true
  }
];

export const Navigation = () => {
  return (
    <Grid
      as="nav"
      width="100%"
      gridTemplateAreas="
        logo navItems .
      "
      gridTemplateColumns="repeat(3, 1fr)"
    >
      {navItems.map(({ name }) => (
        <NavigationItem>{name}</NavigationItem>
      ))}
    </Grid>
  );
};
