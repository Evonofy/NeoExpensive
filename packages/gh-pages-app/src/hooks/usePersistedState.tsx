import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import createPersistedState from 'use-persisted-state';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(
  initialState: T,
  key: string
): Response<T> {
  const usePersistedState = createPersistedState(key);

  const [state, setState] = usePersistedState(initialState);

  return [state, setState];
}
