import React, { useEffect, useRef, useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';

import styles from './styles.module.scss';
import { styled, keyframes } from '@src/styles/stitches.config';

const rotate = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

const Loading = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${rotate} 1s ease infinite`,
});

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | '3D' | 'outlined';
  color?: string;
  noload?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', color, noload = false, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const state = (): 'loading' | 'idle' => {
    if (isLoading) {
      return 'loading';
    }

    return 'idle';
  };
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    const button = buttonRef.current as HTMLButtonElement;

    const callback = () => {
      setIsLoading(true);

      setTimeout(() => setIsLoading(false), noload ? 0 : Math.floor(Math.random() * (700 - 200 + 1) + 200));
    };

    button.addEventListener('click', callback);

    return () => {
      button.removeEventListener('click', callback);
    };
  }, [noload]);

  return (
    // @ts-ignore
    <button data-variant={variant} style={color && { backgroundColor: color }} className={styles.container} data-state={state()} ref={buttonRef} {...rest}>
      {isLoading ? (
        <Loading>
          <CgSpinnerAlt />
        </Loading>
      ) : (
        children
      )}
    </button>
  );
};
