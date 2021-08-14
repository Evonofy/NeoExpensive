import { FC, SVGProps } from 'react';

import { MagnifyingGlass } from 'phosphor-react';

export const SVGSearch: FC<SVGProps<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  strokeWidth = '4'
}): JSX.Element => {
  return (
    <MagnifyingGlass
      width={width}
      height={height}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
};
