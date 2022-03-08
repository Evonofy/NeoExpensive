import { createStitches } from '@stitches/react';

export const { createTheme, styled, globalCss, keyframes } = createStitches({
  theme: {
    fonts: {
      bebas: 'Bebas Neue',
      montserrat: 'Montserrat',
      josefin: 'Josefin Sans',
    },

    colors: {
      accent50: '#E5B2FF',
      accent100: '#B83DF5',
      accent200: '#9540BF',
      accent300: '#6A2C88',
      accent400: '#461A5C',

      red100: '#FF5C5C',
      red200: '#FF3B3B',
      red300: '#E53535',
      red500: '#B11616',

      green50: '#AAEECD',
      green100: '#39D98A',
      green200: '#06C270',
      green300: '#04814A',

      blue100: '#5B8DEF',
      blue200: '#0063F7',
      blue300: '#004FC4',

      yellow100: '#FDDD48',
      yellow200: '#FFCC00',
      yellow300: '#E5B800',
      yellow500: '#C29B00',

      gray100: '#F2F1F4',
      gray200: '#C8CAD0',
      gray400: '#ACAFB9',
      gray500: '#8F90A6',
      gray600: '#6E6F91',
      gray700: '#555770',
      gray800: '#28293D',
      gray900: '#1C1F28',
    },
  },
});

export type Theme = Parameters<typeof createTheme>;

export const dark = createTheme('dark', {
  fonts: {
    bebas: 'Bebas Neue',
    montserrat: 'Montserrat',
    josefin: 'Josefin Sans',
  },

  colors: {
    accent50: '#E5B2FF',
    accent100: '#B83DF5',
    accent200: '#9540BF',
    accent300: '#6A2C88',
    accent400: '#461A5C',

    red100: '#FF5C5C',
    red200: '#FF3B3B',
    red300: '#E53535',
    red500: '#B11616',

    green50: '#AAEECD',
    green100: '#39D98A',
    green200: '#06C270',
    green300: '#04814A',

    blue100: '#5B8DEF',
    blue200: '#0063F7',
    blue300: '#004FC4',

    yellow100: '#FDDD48',
    yellow200: '#FFCC00',
    yellow300: '#E5B800',
    yellow500: '#C29B00',

    gray100: '#F2F1F4',
    gray200: '#C8CAD0',
    gray400: '#ACAFB9',
    gray500: '#8F90A6',
    gray600: '#6E6F91',
    gray700: '#555770',
    gray800: '#28293D',
    gray900: '#1C1F28',
  },
});

export const light = createTheme('light', {
  fonts: {
    bebas: 'Bebas Neue',
    montserrat: 'Montserrat',
    josefin: 'Josefin Sans',
  },

  colors: {
    accent50: '#E5B2FF',
    accent100: '#B83DF5',
    accent200: '#9540BF',
    accent300: '#6A2C88',
    accent400: '#461A5C',

    red100: '#FF5C5C',
    red200: '#FF3B3B',
    red300: '#E53535',
    red500: '#B11616',

    green50: '#AAEECD',
    green100: '#39D98A',
    green200: '#06C270',
    green300: '#04814A',

    blue100: '#5B8DEF',
    blue200: '#0063F7',
    blue300: '#004FC4',

    yellow100: '#FDDD48',
    yellow200: '#FFCC00',
    yellow300: '#E5B800',
    yellow500: '#C29B00',

    gray100: '#1C1F28',
    gray200: '#28293D',
    gray400: '#555770',
    gray500: '#6E6F91',
    gray600: '#8F90A6',
    gray700: '#ACAFB9',
    gray800: '#C8CAD0',
    gray900: '#F2F1F4',
  },
});
