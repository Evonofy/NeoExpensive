import { FC, RefAttributes } from 'react';

import { UserCirclePlus, IconProps } from 'phosphor-react';

export const SVGUserAdd: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return (
    <UserCirclePlus
      width={width}
      height={height}
      color={color}
      weight={weight}
    />
  );
};
