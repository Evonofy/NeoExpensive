import { FC, SVGProps } from 'react';

export const SVGUser: FC<SVGProps<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  strokeWidth = '4'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill="none"
    >
      <path
        d="M35.1289 43.7499C44.7939 43.7499 52.6289 35.9149 52.6289 26.2499C52.6289 16.585 44.7939 8.74994 35.1289 8.74994C25.4639 8.74994 17.6289 16.585 17.6289 26.2499C17.6289 35.9149 25.4639 43.7499 35.1289 43.7499Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-miterlimit="10"
      />
      <path
        d="M8.60254 59.0599C11.292 54.4048 15.1591 50.5394 19.8153 47.852C24.4716 45.1647 29.7531 43.7499 35.1293 43.75C40.5054 43.7501 45.7869 45.1649 50.4431 47.8524C55.0994 50.5398 58.9664 54.4053 61.6557 59.0605"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
