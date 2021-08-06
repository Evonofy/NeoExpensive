import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(
  initialState: T,
  key: string
): Response<T> {
  const [state, setState] = useState(initialState);

  if (typeof window !== 'undefined') {
    useEffect(() => localStorage.setItem(key, String(state)), [key, state]);
  }
  return [state, setState];
}
