import { FC, SVGProps } from 'react';

import { UserCircle } from 'phosphor-react';

export const SVGUser: FC<SVGProps<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  strokeWidth = '4'
}) => {
  return (
    <UserCircle
      width={width}
      height={height}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
};
