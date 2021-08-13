import { FC, SVGProps } from 'react';

export const SVGCart: FC<SVGProps<SVGSVGElement>> = ({
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
        d="M50.5707 50.3125H19.3492L11.7212 8.35869C11.6296 7.85467 11.364 7.39879 10.9707 7.07054C10.5773 6.7423 10.0813 6.5625 9.56902 6.5625H4.6333"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.1328 61.25C25.1532 61.25 27.6016 58.8015 27.6016 55.7812C27.6016 52.7609 25.1532 50.3125 22.1328 50.3125C19.1125 50.3125 16.6641 52.7609 16.6641 55.7812C16.6641 58.8015 19.1125 61.25 22.1328 61.25Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M50.5701 61.25C53.5904 61.25 56.0389 58.8015 56.0389 55.7812C56.0389 52.7609 53.5904 50.3125 50.5701 50.3125C47.5498 50.3125 45.1013 52.7609 45.1013 55.7812C45.1013 58.8015 47.5498 61.25 50.5701 61.25Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.3601 39.375H51.6918C52.7164 39.375 53.7085 39.0154 54.4951 38.3589C55.2817 37.7024 55.813 36.7907 55.9962 35.7826L59.3204 17.5H13.3828"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
