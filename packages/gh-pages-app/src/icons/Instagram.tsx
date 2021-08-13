import { FC, SVGProps } from 'react';

export const SVGInstagram: FC<SVGProps<SVGSVGElement>> = ({
  width = '70',
  height = '70',
  color = '#fafafa',
  strokeWidth = '4'
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill="none"
    >
      <path
        d="M35.1289 45.9375C41.1695 45.9375 46.0664 41.0406 46.0664 35C46.0664 28.9594 41.1695 24.0625 35.1289 24.0625C29.0883 24.0625 24.1914 28.9594 24.1914 35C24.1914 41.0406 29.0883 45.9375 35.1289 45.9375Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-miterlimit="10"
      />
      <path
        d="M47.1604 9.84375H23.0979C15.8492 9.84375 9.9729 15.72 9.9729 22.9687V47.0312C9.9729 54.28 15.8492 60.1562 23.0979 60.1562H47.1604C54.4091 60.1562 60.2854 54.28 60.2854 47.0312V22.9687C60.2854 15.72 54.4091 9.84375 47.1604 9.84375Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
