import { FC, LinkHTMLAttributes, useState } from "react";

interface MetaProps extends LinkHTMLAttributes<HTMLLinkElement> {
  rel: "icon" | "shortcut icon" | "manifest" | "stylesheet";
  theme: "dark" | "light";
  href: string;
}

export const Link: FC<MetaProps> = ({ rel, theme, href, ...rest }) => {
  return (
    <link
      media={`(prefers-color-scheme: ${theme})`}
      rel={rel}
      href={`/${theme}/${href}`}
      {...rest}
    />
  );
};
