import { FC, SVGProps } from 'react';

export const SVGFacebook: FC<SVGProps<SVGSVGElement>> = (
  props
): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 70 70"
      fill="none"
    >
      <path
        d="M35 61.25C49.4975 61.25 61.25 49.4975 61.25 35C61.25 20.5025 49.4975 8.75 35 8.75C20.5025 8.75 8.75 20.5025 8.75 35C8.75 49.4975 20.5025 61.25 35 61.25Z"
        stroke={props.color}
        stroke-width={props.strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M45.9377 24.0628H41.5627C39.8223 24.0628 38.1531 24.7542 36.9224 25.9849C35.6916 27.2156 35.0002 28.8848 35.0002 30.6253V61.2503"
        stroke={props.color}
        stroke-width={props.strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M26.25 39.3752H43.75"
        stroke={props.color}
        stroke-width={props.strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
