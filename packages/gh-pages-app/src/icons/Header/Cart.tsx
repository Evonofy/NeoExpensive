import { FC, RefAttributes } from 'react';

import { IconProps, ShoppingCart } from 'phosphor-react';

export const SVGCart: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return (
    <ShoppingCart width={width} height={height} color={color} weight={weight} />
  );
};
