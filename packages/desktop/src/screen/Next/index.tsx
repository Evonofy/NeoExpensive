import React, { FC } from 'react';

interface NextProps {
  url: string;
}

export const Next: FC<NextProps> = ({ url }): JSX.Element => {
  return (
    <>
      <iframe src={url} width="100%" height="100%" frameBorder={0}></iframe>
    </>
  );
};
