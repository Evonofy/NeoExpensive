import { FC } from "react";
import Image, { ImageProps } from "next/image";

import { A } from "@components";

import Logo from "../../assets/logo.svg";

import Cube from "../../assets/cube.svg";
import Paper from "../../assets/paper.svg";
import User from "../../assets/user.svg";
import AtSign from "../../assets/at.svg";

import styles from "@neo/wunderlust/dist/dashboard/components/header.module.css";

interface NavItemProps {
  name: string;
  icon: string;
}

export const NavItem: FC<NavItemProps> = ({ icon: Icon, name }) => {
  // prettier-ignore
  const pageName = 
    name
      .toLowerCase()
      .split("-")
      .join("");
  return (
    <li>
      <A href={`/${pageName}`} name={`Go to ${name} page`}>
        <Icon />

        <h1>
          <strong>{name}</strong>
        </h1>
      </A>
    </li>
  );
};

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <section className={styles.title}>
        <A href="/" name="Go to Homepage">
          <Logo />
          <h1>
            <strong>Neo Expensive</strong>
          </h1>
        </A>
      </section>

      <nav>
        <ul role="list">
          <NavItem name="Overview" icon={Cube}>
            Overview
          </NavItem>
          <NavItem name="Products" icon={Paper}>
            Products
          </NavItem>
          <NavItem name="Clients" icon={User}>
            Clients
          </NavItem>
          <NavItem name="E-mail" icon={AtSign}>
            E-mail
          </NavItem>
        </ul>
      </nav>
    </header>
  );
};
