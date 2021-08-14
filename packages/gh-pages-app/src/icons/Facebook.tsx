import { FC, SVGProps } from 'react';

import { FacebookLogo } from 'phosphor-react';

export const SVGFacebook: FC<SVGProps<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  strokeWidth = '4'
}): JSX.Element => {
  return (
    <FacebookLogo
      data-icon="facebook"
      width={width}
      height={height}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
};
