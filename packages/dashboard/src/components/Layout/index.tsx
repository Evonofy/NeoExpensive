import { FC } from "react";

import { Header } from "../Header";

export const Layout: FC = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};
