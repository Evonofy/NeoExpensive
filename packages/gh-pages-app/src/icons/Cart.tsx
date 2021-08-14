import { FC, SVGProps } from 'react';

import { ShoppingCart } from 'phosphor-react';

export const SVGCart: FC<SVGProps<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  strokeWidth = '4'
}): JSX.Element => {
  return (
    <ShoppingCart
      width={width}
      height={height}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
};
