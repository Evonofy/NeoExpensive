import React, { memo } from 'react';

export type ButtonComponentProps = {
  title: string;
  onClick: () => void;
};

const Button: React.FC<ButtonComponentProps> = ({ title, onClick }) => {
  return (
    <button onClick={onClick}>
      <div>
        <p>{title}</p>
      </div>
    </button>
  );
};

export default memo(Button);
