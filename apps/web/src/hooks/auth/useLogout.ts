import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context/AuthContext';

export function useLogout() {
  const logout = useContextSelector(AuthContext, (context) => context.logout);

  return {
    logout,
  };
}
