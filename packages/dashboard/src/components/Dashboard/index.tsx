import { FC } from "react";

import { Card } from "@components";

import styles from "@neo/wunderlust/dist/dashboard/home.module.css";

export const Dashboard: FC = () => {
  return (
    <section className={styles.dashboard}>
      <Card label="Gross Revenue" name="revenue" data="R$ 420k" />
      <Card label="Orders" name="orders" data="1.124.215" />
      <Card label="Profit" name="profit" data="R$ 154k" />
      <Card label="Users" name="users" data="912.324" />
    </section>
  );
};
