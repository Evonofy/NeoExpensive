import { FC, SVGProps } from 'react';

import { InstagramLogo } from 'phosphor-react';

export const SVGInstagram: FC<SVGProps<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  strokeWidth = '4'
}): JSX.Element => {
  return (
    <>
      <InstagramLogo
        data-icon="instagram"
        width={width}
        height={height}
        color={color}
        strokeWidth={strokeWidth}
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
