import React, { useCallback, useMemo } from 'react';
import { Input, InputProps } from '../index';

export function CpfInput({ ...rest }: InputProps) {
  const maxLength = useMemo(() => 14, []);

  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.currentTarget.maxLength = maxLength;

      let value = event.currentTarget.value;

      if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
        event.currentTarget.value = value;
      }
    },
    [maxLength]
  );

  return <Input {...rest} onKeyUp={handleKeyUp} maxLength={maxLength} />;
}
