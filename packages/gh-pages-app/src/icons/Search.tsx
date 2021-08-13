import { FC, SVGProps } from 'react';

export const SVGSearch: FC<SVGProps<SVGSVGElement>> = ({
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
        d="M31.7187 54.6875C44.404 54.6875 54.6874 44.404 54.6874 31.7187C54.6874 19.0334 44.404 8.74994 31.7187 8.74994C19.0334 8.74994 8.75 19.0334 8.75 31.7187C8.75 44.404 19.0334 54.6875 31.7187 54.6875Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M47.9597 47.9611L61.249 61.2503"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
