import { AnchorHTMLAttributes, FC, ReactNode } from "react";
import Link from "next/link";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  children: ReactNode;
}

export const A: FC<LinkProps> = ({ children, href, name, ...rest }) => {
  return (
    <Link href={href ?? ""}>
      <a
        {...rest}
        aria-label={name.replace(" ", "-")}
        rel="noopener noreferrer"
        data-reset
      >
        {children}
      </a>
    </Link>
  );
};
