import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";

import { Header, Dashboard } from "@components";

import Dollar from "../assets/card/dollar.svg";

import styles from "@neo/wunderlust/dist/dashboard/home.module.css";

type HomeProps = {};

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  series: [[0, 4, 10, 7, 12, 7, 11, 4, 0]],
};

const Home: FC<HomeProps> = ({}) => {
  return (
    <main className={styles.main}>
      <Head>
        <title>Home</title>
      </Head>

      <Header />

      <Dashboard />
      {/* <AreaChart2
        cardTitle="test"
        cardValue="R$ 17k"
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
        series={[0, 4, 2, 7, 4, 13, 3, 4, 0]}
      /> */}
      <AreaChart2
        isAccent
        cardTitle="Portfolio Balance"
        cardValue="$179,757"
        onAddClicked={() => console.log("Add Clicked")}
        data={data}
        id="chart1"
      />
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
