import { Theme, theme } from '@chakra-ui/react';

const purpleHue = 285;

export const Default: Theme = {
  ...theme,
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true
  },
  colors: {
    ...theme.colors,
    gray: {
      ...theme.colors.gray,
      100: 'hsl(258, 10%, 95%)',
      200: 'hsl(225, 8%, 80%)',
      400: 'hsl(225, 8%, 70%)',
      500: 'hsl(237, 11%, 61%)',
      600: 'hsl(237, 14%, 50%)',
      700: 'hsl(236, 14%, 39%)',
      800: 'hsl(237, 21%, 20%)',
      900: 'hsl(227, 18%, 13%)'
    },
    purple: {
      ...theme.colors.purple,
      100: `hsl(${purpleHue}, 55%, 60%)`,
      200: `hsl(${purpleHue}, 55%, 50%)`,
      300: `hsl(${purpleHue}, 55%, 35%)`,
      400: `hsl(${purpleHue}, 55%, 23%)`
    }
  }
};
