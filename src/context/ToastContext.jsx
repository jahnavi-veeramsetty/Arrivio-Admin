import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

let _id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++_id;
    const toastMessage = typeof message === 'object' ? (message.description || message.message || message.title) : message;
    const toastType = typeof message === 'object' ? (message.type || type) : type;

    setToasts(prev => [...prev, { id, message: toastMessage, type: toastType }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, show: addToast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
