import { FC, SVGProps } from 'react';

export const SVGSolidClose: FC<SVGProps<SVGSVGElement>> = (
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
        {...props}
      >
        <path
          d="M6 2L2 6"
          stroke={props.stroke}
          stroke-width="0.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 2L6 6"
          stroke={props.stroke}
          stroke-width="0.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
};
