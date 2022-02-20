import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context/AuthContext';

export function useRegister() {
  const register = useContextSelector(AuthContext, (context) => context.register);

  return {
    register,
  };
}
