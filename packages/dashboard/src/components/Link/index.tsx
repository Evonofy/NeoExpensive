import { FC, LinkHTMLAttributes } from "react";

interface MetaProps extends LinkHTMLAttributes<HTMLLinkElement> {
  rel:
    | "icon"
    | "shortcut icon"
    | "manifest"
    | "stylesheet"
    | "apple-touch-icon";
  theme: "dark" | "light";
  href: string;
}

export const Link: FC<MetaProps> = ({ rel, theme, href, ...rest }) => {
  /**
   * TODO: add `/apple/` to href path when rel is `apple-touch-icon`
   */
  return (
    <link
      media={`(prefers-color-scheme: ${theme})`}
      rel={rel}
      href={`/${theme}/${href}`}
      {...rest}
    />
  );
};
