import { GetServerSideProps } from "next";
import { FC } from "react";

import { Layout } from "@components";

type HomeProps = {};

const Home: FC<HomeProps> = ({}) => {
  return (
    <Layout>
      <header></header>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
