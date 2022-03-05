import React, { useEffect, useRef } from 'react';
import type { IconType, IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';

import styles from './style.module.scss';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string;
  label: string;
  icon?: React.ReactElement<IconBaseProps, IconType>;
  disabled?: boolean;
  error?: string;
  success?: boolean;
};

// eslint-disable-next-line react/display-name
export const Input: React.FC<InputProps> = ({ label, name, icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,

      ref: inputRef,

      getValue: (ref) => {
        return ref.current.value;
      },

      setValue: (ref, value) => {
        ref.current.value = value;
      },

      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.container}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input id={fieldName} ref={inputRef} defaultValue={defaultValue} className={styles.container} {...rest} />

      {icon && icon}

      {error && <span>{error}</span>}
    </div>
  );
};
