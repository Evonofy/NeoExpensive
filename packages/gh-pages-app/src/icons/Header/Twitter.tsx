import { FC, RefAttributes } from 'react';

import { IconProps, TwitterLogo } from 'phosphor-react';

export const SVGTwitter: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return (
    <TwitterLogo
      data-icon="twitter"
      width={width}
      height={height}
      color={color}
      weight={weight}
    />
  );
};
