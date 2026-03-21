import { useAuth } from '../context/AuthContext';

/**
 * Returns true if the current user's active role is in the allowedRoles array.
 * Usage: const can = useRole(['super_admin', 'ops_manager']);
 */
export function useRole(allowedRoles) {
  const { activeRole, user } = useAuth();
  const role = activeRole || user?.roles?.[0];
  return allowedRoles.includes(role);
}

/**
 * Returns the current active role string.
 */
export function useActiveRole() {
  const { activeRole, user } = useAuth();
  return activeRole || user?.roles?.[0];
}
