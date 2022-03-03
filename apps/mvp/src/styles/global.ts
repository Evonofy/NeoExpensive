import { styled, globalCss } from './stitches.config';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    transition: 'all 200ms',
  },

  ':root, html': {
    colorScheme: 'light dark',
  },

  'html.dark': {
    colorScheme: 'dark',
  },

  'html.light': {
    colorScheme: 'light',
  },

  'html, body, #app': {
    width: '100%',
    height: '100%',
    backgroundColor: '$gray900',
    fontFamily: '$montserrat',
  },
});

export const Container = styled('div', {
  width: '100%',
  height: '100%',
  background: '$',
});
