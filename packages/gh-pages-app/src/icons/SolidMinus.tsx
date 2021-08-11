import { FC, SVGProps } from 'react';

export const SVGSolidMinus: FC<SVGProps<SVGSVGElement>> = (
  props
): JSX.Element => {
  return (
    <>
      <svg
        width={props.width}
        height={props.height}
        viewBox={`0 0 ${props.width} ${props.width}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.17157 4H6.82842"
          stroke={props.stroke}
          stroke-width="0.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
