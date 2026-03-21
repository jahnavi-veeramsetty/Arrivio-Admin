import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activeRole, setActiveRole] = useState(() => {
    return sessionStorage.getItem('admin_active_role') || null;
  });

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('admin_user', JSON.stringify(userData));
    
    // Auto-select role if only one exists
    if (userData.roles.length === 1) {
      const firstRole = userData.roles[0];
      setActiveRole(firstRole);
      sessionStorage.setItem('admin_active_role', firstRole);
    }
  };

  const logout = () => {
    setUser(null);
    setActiveRole(null);
    sessionStorage.removeItem('admin_user');
    sessionStorage.removeItem('admin_active_role');
  };

  const selectRole = (roleId) => {
    setActiveRole(roleId);
    sessionStorage.setItem('admin_active_role', roleId);
  };

  const switchRole = () => {
    setActiveRole(null);
    sessionStorage.removeItem('admin_active_role');
  };

  return (
    <AuthContext.Provider value={{ user, activeRole, login, logout, selectRole, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
