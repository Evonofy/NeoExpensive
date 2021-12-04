import { FC } from "react";

import Dollar from "../../assets/card/dollar.svg";

import styles from "@neo/wunderlust/dist/dashboard/home.module.css";

// type CardProps = {
//   name:
//     | "revenue"
//     | "orders"
//     | "profit"
//     | "users"
//     | "sales"
//     | "financing"
//     | "popular"
//     | "devices"
//     | "browsers"
//     | "conversion";
//   label:
//     | "Gross Revenue"
//     | "Orders"
//     | "Profit"
//     | "Users"
//     | "Sales Overview"
//     | "Financing"
//     | "Popular Items"
//     | "Device Reach"
//     | "Browser Usage"
//     | "Conversion Rate";
//   type: "card" | "sales" | "rings" | "items" | "pie" | "graph";
//   data: string;
// };
type CardProps = {
  name: "revenue" | "orders" | "profit" | "users";
  label: "Gross Revenue" | "Orders" | "Profit" | "Users";
  data: string;
};

export const Card: FC<CardProps> = ({ name, label, data }) => {
  return (
    <div data-gridArea={name} className={styles.card}>
      <h2>{label}</h2>

      <h3>{data}</h3>

      <span>
        <Dollar />
      </span>
    </div>
  );
};
