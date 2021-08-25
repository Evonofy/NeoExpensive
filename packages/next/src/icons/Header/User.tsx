import { FC, RefAttributes } from 'react';

import { IconProps, UserCircle } from 'phosphor-react';

export const SVGUser: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}) => {
  return (
    <UserCircle width={width} height={height} color={color} weight={weight} />
  );
};
