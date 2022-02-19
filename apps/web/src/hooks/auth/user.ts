import { AuthContext } from '../../context/AuthContext';
import { useContextSelector } from 'use-context-selector';

export function useUser() {
  const user = useContextSelector(AuthContext, (context) => context.user);

  return {
    user,
  };
}
