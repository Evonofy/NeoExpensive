import { FC, SVGProps } from 'react';

import { TwitterLogo } from 'phosphor-react';

export const SVGTwitter: FC<SVGProps<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  strokeWidth = '4'
}): JSX.Element => {
  return (
    <TwitterLogo
      data-icon="twitter"
      width={width}
      height={height}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
};
