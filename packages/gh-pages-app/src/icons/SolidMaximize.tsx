import { FC, SVGProps } from 'react';

export const SVGSolidMaximize: FC<SVGProps<SVGSVGElement>> = (
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
          d="M5 1H7V3"
          stroke={props.stroke}
          stroke-width="0.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 7H1V5"
          stroke={props.stroke}
          stroke-width="0.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.99984 1L4.6665 3.33333"
          stroke={props.stroke}
          stroke-width="0.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 7.00008L3.33333 4.66675"
          stroke={props.stroke}
          stroke-width="0.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
