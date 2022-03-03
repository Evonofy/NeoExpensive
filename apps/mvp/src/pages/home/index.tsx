import { useContextSelector } from 'use-context-selector';

import { ThemeContext } from '@context/theme';
import { styled } from '@styles/stitches.config';

const Container = styled('div', {
  color: '$gray100',
  background: '$gray800',
});

export default function Home() {
  const cycle = useContextSelector(ThemeContext, (context) => context.cycle);

  return (
    <Container>
      <p>homepage</p>
      <button onClick={cycle}>change theme</button>
    </Container>
  );
}
