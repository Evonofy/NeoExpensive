import { FC, RefAttributes } from 'react';

import { GameController, IconProps } from 'phosphor-react';

export const SVGController: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return (
    <GameController
      width={width}
      height={height}
      color={color}
      weight={weight}
    />
  );
};
