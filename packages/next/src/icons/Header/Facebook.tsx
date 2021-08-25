import { FC, RefAttributes } from 'react';

import { FacebookLogo, IconProps } from 'phosphor-react';

export const SVGFacebook: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return (
    <FacebookLogo
      data-icon="facebook"
      width={width}
      height={height}
      color={color}
      weight={weight}
    />
  );
};
