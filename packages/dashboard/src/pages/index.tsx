import { GetServerSideProps } from "next";
import { FC } from "react";

import { Header } from "@components";

import styles from "@neo/wunderlust/dist/dashboard/home.module.css";

type HomeProps = {};

const Home: FC<HomeProps> = ({}) => {
  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.dashboard}></section>
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
