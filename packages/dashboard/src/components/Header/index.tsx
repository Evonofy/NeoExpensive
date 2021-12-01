import { FC } from "react";
import Image, { ImageProps } from "next/image";

export const NavItem: FC<ImageProps> = ({ src, children }) => {
  return (
    <li>
      <Image width={32} height={32} src={src} />

      <h1>
        <strong>{children}</strong>
      </h1>
    </li>
  );
};

export const Header: FC = () => {
  return (
    <header>
      <section className="title">
        <Image src={"/logo.svg"} width={60} height={60} />
        <h1>
          <strong>Neo Expensive</strong>
        </h1>
      </section>

      <nav>
        <ul>
          <NavItem src={"/cube.svg"}>Overview</NavItem>
          <NavItem src={"/paper.svg"}>Products</NavItem>
          <NavItem src={"/user.svg"}>Clients</NavItem>
          <NavItem src={"/at.svg"}>E-mail</NavItem>
        </ul>
      </nav>
    </header>
  );
};
