import { FC, RefAttributes } from 'react';

import { IconProps, MagnifyingGlass } from 'phosphor-react';

export const SVGSearch: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return (
    <MagnifyingGlass
      width={width}
      height={height}
      color={color}
      weight={weight}
    />
  );
};
