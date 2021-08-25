import { FC, RefAttributes } from 'react';

import { IconProps, InstagramLogo } from 'phosphor-react';

export const SVGInstagram: FC<IconProps & RefAttributes<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  weight = 'light'
}): JSX.Element => {
  return (
    <>
      <InstagramLogo
        data-icon="instagram"
        width={width}
        height={height}
        color={color}
        weight={weight}
      />
      <svg style={{ position: 'absolute' }} width="0" height="0">
        <radialGradient id="rgb" r="150%" cx="30%" cy="107%">
          <stop stopColor="#fdf497" offset="0" />
          <stop stopColor="#fdf497" offset="0.05" />
          <stop stopColor="#fd5949" offset="0.45" />
          <stop stopColor="#d6249f" offset="0.6" />
          <stop stopColor="#285AEB" offset="0.9" />
        </radialGradient>
      </svg>
    </>
  );
};
