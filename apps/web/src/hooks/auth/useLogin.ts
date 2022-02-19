import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context/AuthContext';

export function useLogin() {
  const login = useContextSelector(AuthContext, (context) => context.login);

  return {
    login,
  };
}
