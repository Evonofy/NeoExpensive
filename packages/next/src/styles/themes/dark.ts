const gray = {
  hue: 200,
  saturation: 8
};

const accent = {
  hue: 280,
  saturation: 50
};

export default {
  title: 'light',

  color: {
    gray: {
      700: `hsl(${gray.hue}, ${gray.saturation}, 30)`,
      800: `hsl(${gray.hue}, ${gray.saturation}, 15)`,
      900: `hsl(${gray.hue}, ${gray.saturation}, 10)`
    },

    accent: {
      /* lighter */
      100: `hsl(${gray.hue}, ${gray.saturation}, 70)`,
      /* normal */
      200: `hsl(${gray.hue}, ${gray.saturation}, 50)`,
      /* darker */
      300: `hsl(${gray.hue}, ${gray.saturation}, 30)`
    }
  },

  font: {
    bebas: '"Bebas Neue", sans-serif',
    montserrat: '"Montserrat", sans-serif'
  },

  size: {},
  padding: {},
  radius: {}
};
