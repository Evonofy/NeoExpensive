import { default as Anchor } from 'next/link';
import { FC, ReactNode } from 'react';

interface LinkProps {
  url: string;
  name: string;
  children: ReactNode;
}

export const Link: FC<LinkProps> = ({ url, name, children }): JSX.Element => {
  return (
    <Anchor href={url}>
      <a aria-label={name} rel="noopener noreferrer">
        {children}
      </a>
    </Anchor>
  );
};
