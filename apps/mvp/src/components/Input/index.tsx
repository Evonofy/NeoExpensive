import React, { useEffect, useRef, useState } from 'react';
import type { IconType, IconBaseProps } from 'react-icons';
import { AiFillCloseCircle } from 'react-icons/ai';

import { useField } from '@unform/core';

import { styled } from '@src/styles/stitches.config';

export const Label = styled('label', {
  color: '$gray500',
  fontWeight: '600',
  fontFamily: 'Montserrat',
  transition: 'all 200ms',
});

export const IconContainer = styled('div', {
  height: '20px',
  position: 'absolute',
  background: '$gray800',
  top: '50%',
  cursor: 'pointer',
  transform: 'translateY(-50%)',
  transition: 'all 200ms',
  color: '$gray700',
  svg: {
    width: '20px',
    height: '20px',
    color: '$gray700',
  },

  variants: {
    color: {
      accent: {
        svg: {
          color: '$accent200',
        },
      },
      gray: {
        svg: {
          color: '$gray700',
        },
      },
    },
  },
});

export const InputContainer = styled('div', {
  width: `100%`,
  position: 'relative',
  background: '$gray800',
  borderRadius: '4px',
  border: '2px solid transparent',
  borderColor: '$gray700',
  transition: 'all 200ms',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  variants: {
    icons: {
      exists: {},
      'not-exists': {
        input: {
          padding: '10px 14px',
        },
      },
    },
  },

  input: {
    paddingLeft: '0px',
    paddingRight: '14px',

    background: '$gray800',

    width: '100%',
    height: '100%',
    transition: 'all 200ms',

    fontSize: '14px',
    fontWeight: '500',

    color: '$gray100',

    padding: `10px 0px 9px ${14 + 20 + 14}px`,
    cursor: 'pointer',
    fontFamily: 'Montserrat',

    '&:disabled': {
      cursor: 'not-allowed',
    },

    '&::placeholder': {
      transition: 'all 200ms',
      color: '$gray500',
    },

    '&:hover, &:focus': {
      borderColor: '$accent200',
    },
  },

  [`& ${IconContainer}`]: {
    left: '14px',
  },
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  variants: {
    actions: {
      error: {
        [`& ${Label}`]: {
          color: '$red100',
        },
        [`& ${InputContainer}`]: {
          borderColor: '$red100',
          [`& ${IconContainer}`]: {
            svg: {
              color: '$red100',
            },
          },
        },
      },
      active: {
        [`& ${Label}`]: {
          color: '$accent200',
        },
        [`& ${InputContainer}`]: {
          borderColor: '$accent200',
        },
      },
      idle: {
        '&:hover': {
          [`& ${Label}`]: {
            color: '$gray400',
          },

          [`& ${InputContainer}`]: {
            borderColor: '$gray500',
            input: {
              '&::placeholder': {
                color: '$gray100',
              },
            },
            [`& ${IconContainer}`]: {
              svg: {
                color: '$gray500',
              },
            },
          },
        },

        [`& ${InputContainer}`]: {
          opacity: '1',
          borderColor: '$gray700',
          [`& ${IconContainer}`]: {
            svg: {
              color: '$gray700',
            },
          },
        },
      },
      disabled: {
        [`& ${Label}`]: {
          opacity: '0.5',
        },
        [`& ${InputContainer}`]: {
          opacity: '0.5',
        },
      },
    },
  },
});

export const Error = styled('span', {
  color: '$red100',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string;
  label: string;
  icon?: React.ReactElement<IconBaseProps, IconType>;
  disabled?: boolean;
  error?: string;
  success?: boolean;
  optional?: boolean;
};

// eslint-disable-next-line react/display-name
export const Input: React.FC<InputProps> = ({ label, name, icon, disabled = false, optional = false, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const action = (): 'idle' | 'active' | 'disabled' | 'error' => {
    if (isFocused) {
      return 'active';
    }

    if (disabled) {
      return 'disabled';
    }

    if (error) {
      return 'error';
    }

    return 'idle';
  };

  const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

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
    <Container actions={action()}>
      {label && (
        <Label htmlFor={fieldName}>
          {label} {optional && '(optional)'}
        </Label>
      )}

      <InputContainer icons={icon ? 'exists' : 'not-exists'}>
        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
          onFocus={() => {
            setIsFocused(true);
            clearError();
          }}
          onBlur={() => setIsFocused(false)}
        />

        {icon && (
          <IconContainer color={isFocused ? 'accent' : 'gray'} onClick={() => inputRef.current?.focus()}>
            {icon}
          </IconContainer>
        )}
      </InputContainer>

      {error && (
        <Error>
          <AiFillCloseCircle />
          {error}
        </Error>
      )}
    </Container>
  );
};
