import React, { FC, useRef } from 'react';

interface NextProps {
  url: string;
}

export const Next: FC<NextProps> = ({ url }) => {
  const app = useRef<HTMLIFrameElement>(null);

  return (
    <>
      <iframe ref={app} src={url} width="100%" height="100%" frameBorder={0} />
    </>
  );
};
