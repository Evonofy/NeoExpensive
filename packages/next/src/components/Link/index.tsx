import Anchor from 'next/link';
import { AnchorHTMLAttributes, FC, ReactNode } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  children: ReactNode;
}

export const Link: FC<LinkProps> = ({
  href,
  name,
  children,
  ...rest
}): JSX.Element => {
  return (
    <Anchor href={href}>
      <a
        {...rest}
        aria-label={name.replace(' ', '-')}
        rel="noopener noreferrer"
        data-reset
      >
        {children}
      </a>
    </Anchor>
  );
};
