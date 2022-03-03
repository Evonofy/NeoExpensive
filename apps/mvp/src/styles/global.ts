import { globalCss } from '@stitches/react';
import { styled } from './stitches.config';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
});

export const Container = styled('div', {
  width: '100%',
  height: '100%',
  background: '$',
});
