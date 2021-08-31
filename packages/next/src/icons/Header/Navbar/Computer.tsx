import { FC, RefAttributes } from 'react';

import { DesktopTower, IconProps } from 'phosphor-react';

export const SVGComputer: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return (
    <DesktopTower
      data-icon="computer"
      width={width}
      height={height}
      color={color}
      weight={weight}
    />
  );
};
