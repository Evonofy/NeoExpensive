import { accent, gray } from '../global';

export default {
  title: 'light',

  color: {
    gray: {
      100: `hsl(${gray.hue}, ${gray.saturation}%, 80%)`,
      200: `hsl(${gray.hue}, ${gray.saturation}%, 60%)`,
      500: `hsl(${gray.hue}, ${gray.saturation}%, 30%)`,
      700: `hsl(${gray.hue}, ${gray.saturation}%, 20%)`,
      800: `hsl(${gray.hue}, ${gray.saturation}%, 10%)`,
      900: `hsl(${gray.hue}, ${gray.saturation}%, 5%)`
    },

    accent: {
      /* lighter */
      100: `hsl(${accent.hue}, ${accent.saturation}%, 60%)`,
      /* normal */
      200: `hsl(${accent.hue}, ${accent.saturation}%, 50%)`,
      /* darker */
      300: `hsl(${accent.hue}, ${accent.saturation}%, 30%)`
    }
  },

  font: {
    bebas: '"Bebas Neue", sans-serif',
    montserrat: '"Montserrat", sans-serif',
    josefin: '"Josefin Sans", sans-serif'
  },

  size: {},
  padding: {},
  radius: {}
};
