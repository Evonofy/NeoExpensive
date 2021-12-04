import { FC } from "react";
import { useRouter } from "next/router";

import { A } from "@components";

import Logo from "../../assets/logo.svg";

import Cube from "../../assets/nav/cube.svg";
import Paper from "../../assets/nav/paper.svg";
import User from "../../assets/nav/user.svg";
import AtSign from "../../assets/nav/at.svg";

import styles from "@neo/wunderlust/dist/dashboard/components/header.module.css";

interface NavItemProps {
  name: string;
  icon: string;
}

export const NavItem: FC<NavItemProps> = ({ icon: Icon, name }) => {
  const { pathname } = useRouter();

  // prettier-ignore
  const pageName = 
    name
      .toLowerCase()
      .split("-")
      .join("");

  const isHome = pathname === "/" && pageName === "overview";
  const isActivepage = pathname.split("/")[1] === pageName;

  return (
    <li>
      <A
        data-active={isHome || isActivepage ? true : false}
        href={`/${pageName}`}
        name={`Go to ${name} page`}
      >
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
      <div className={styles.headerWrapper}>
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
      </div>
    </header>
  );
};
