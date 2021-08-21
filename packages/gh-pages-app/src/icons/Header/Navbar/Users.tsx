import { FC, RefAttributes } from 'react';

import { Users, IconProps } from 'phosphor-react';

export const SVGUsers: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return <Users width={width} height={height} color={color} weight={weight} />;
};
