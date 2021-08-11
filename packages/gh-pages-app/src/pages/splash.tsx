import { FC } from 'react';

import { SvgSolidNeoExpensive } from '@icons';

import { Translate } from '@components';

const Splash: FC = (): JSX.Element => {
  return (
    <div className="splash">
      <SvgSolidNeoExpensive height={256} width={256} fill={null} />
    </div>
  );
};

export default Splash;
