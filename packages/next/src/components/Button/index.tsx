import { ButtonHTMLAttributes, FC } from 'react';

import { useClamp } from '@hooks';
import { ButtonContainer } from '@styles/components/button';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rootFontSize: number;
  /**
   * primary -> the CTA button
   * secondary -> the GHOST button
   * tertiary -> the blank button
   */
  variant: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  rootFontSize,
  children,
  variant,
  disabled
}) => {
  return (
    <ButtonContainer
      disabled={disabled}
      variant={variant}
      sidePadding={useClamp('1rem', '2rem', rootFontSize)}
      blockPadding={useClamp('0.8rem', '1rem', rootFontSize)}
    >
      {children}
    </ButtonContainer>
  );
};
