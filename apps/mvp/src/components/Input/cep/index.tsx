import React, { useCallback, useMemo } from 'react';
import { Input, InputProps } from '../index';

export function CepInput({ ...rest }: InputProps) {
  const maxLength = useMemo(() => 9, []);

  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = maxLength;

      let value = event.currentTarget.value;

      value = value.replace(/\D/g, '');
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      event.currentTarget.value = value;
    },
    [maxLength]
  );

  return <Input {...rest} onKeyUp={handleKeyUp} maxLength={maxLength} />;
}
