import React from 'react';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | '3D' | 'outlined';
};

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...rest }) => {
  return <button {...rest}>{children}</button>;
};
