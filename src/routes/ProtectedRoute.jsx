import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, activeRole } = useAuth();
  const location = useLocation();

  // 1. Not logged in -> Go to Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Logged in + Multi-role + No selection -> Go to Role Selection
  if (user.roles.length > 1 && !activeRole && location.pathname !== '/role-selection') {
    return <Navigate to="/role-selection" replace />;
  }

  // 3. Authenticated -> render children or Outlet (for nested layouts)
  return children || <Outlet />;
};

export default ProtectedRoute;
