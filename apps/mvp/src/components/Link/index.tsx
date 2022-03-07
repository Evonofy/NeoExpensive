import React from 'react';
import { Link as Anchor } from 'react-router-dom';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export const Link: React.FC<LinkProps> = ({ href, children, ...rest }) => {
  return (
    <Anchor to={href} {...rest}>
      {children}
    </Anchor>
  );
};
