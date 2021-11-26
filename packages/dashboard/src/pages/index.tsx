import { GetServerSideProps } from 'next';
import { FC } from 'react';

type HomeProps = {};

const Home: FC<HomeProps> = ({}) => {
  return (
    <div>
      <h1>a</h1>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};
