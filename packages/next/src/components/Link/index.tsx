import { default as Anchor } from 'next/link';
import { FC, ReactNode } from 'react';

interface LinkProps {
  url: string;
  name: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

export const Link: FC<LinkProps> = ({
  url,
  name,
  children,
  ...rest
}): JSX.Element => {
  return (
    <Anchor href={url}>
      <a
        {...rest}
        aria-label={name.replace(' ', '-')}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </Anchor>
  );
};
