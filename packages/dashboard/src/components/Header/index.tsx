import { FC } from "react";
import Image, { ImageProps } from "next/image";

import { A } from "@components";

import styles from "@neo/wunderlust/dist/dashboard/components/header.module.css";

interface NavItemProps extends ImageProps {
  href: string;
}

export const NavItem: FC<NavItemProps> = ({ src, children, href }) => {
  const pageName = href.split("/")[1];

  return (
    <li>
      <A href={href} name={`Go to ${pageName} page`}>
        <Image width={32} height={32} src={src} />

        <h1>
          <strong>{children}</strong>
        </h1>
      </A>
    </li>
  );
};

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <section className="title">
        <A href="/" name="Go to Homepage">
          <Image src={"/logo.svg"} width={60} height={60} />
          <h1>
            <strong>Neo Expensive</strong>
          </h1>
        </A>
      </section>

      <nav>
        <ul role="list">
          <NavItem href="/overview" src={"/cube.svg"}>
            Overview
          </NavItem>
          <NavItem href="/products" src={"/paper.svg"}>
            Products
          </NavItem>
          <NavItem href="/clients" src={"/user.svg"}>
            Clients
          </NavItem>
          <NavItem href="/email" src={"/at.svg"}>
            E-mail
          </NavItem>
        </ul>
      </nav>
    </header>
  );
};
