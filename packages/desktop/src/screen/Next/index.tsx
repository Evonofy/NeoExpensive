import React, { FC } from 'react';

interface NextProps {
  url: string;
}

export const Next: FC<NextProps> = ({ url }): JSX.Element => {
  return (
    <>
      <iframe src={url} width="100vw" height="100vh" frameBorder={0}></iframe>
    </>
  );
};
