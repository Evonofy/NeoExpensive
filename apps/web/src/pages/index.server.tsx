import type { NextPage } from 'next';
import { Suspense } from 'react';
import { Button } from '../components/button.server';

const Home: NextPage = () => {
  return (
    <Suspense fallback="s">
      <main>
        <Button />
      </main>
    </Suspense>
  );
};

export default Home;
