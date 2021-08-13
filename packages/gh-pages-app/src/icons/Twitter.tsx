import { FC, SVGProps } from 'react';

export const SVGTwitter: FC<SVGProps<SVGSVGElement>> = ({
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
        d="M13.3828 54.6875C13.3828 54.6875 24.3203 52.5 26.5078 45.9375C26.5078 45.9375 9.00782 39.375 13.3828 15.3125C13.3828 15.3125 22.1328 26.25 35.2578 28.4375V24.0633C35.2581 21.5503 36.1235 19.114 37.7087 17.164C39.2938 15.214 41.502 13.8693 43.962 13.3558C46.422 12.8423 48.9837 13.1915 51.2166 14.3446C53.4494 15.4976 55.2172 17.3843 56.2227 19.6874L65.8828 19.6875L57.1328 28.4375C57.1328 43.75 46.1953 59.0625 26.5078 59.0625C17.7578 59.0625 13.3828 54.6875 13.3828 54.6875Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
