import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockApplications, applicantDocData } from '../mockdata/b2cData';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [counts, setCounts] = useState({
    pending_b2c: 0,
    pending_docs: 0,
  });

  const getOverallStatus = (docs) => {
    if (!docs) return 'N/A';
    const statuses = Object.values(docs).map(d => d.status);
    if (statuses.every(s => s === 'Verified')) return 'Verified';
    if (statuses.some(s => s === 'Rejected')) return 'Rejected';
    return 'Pending Review';
  };

  const refreshCounts = useCallback(() => {
    const appsFromStorage = localStorage.getItem('arrivio_b2c_apps_v4');
    const allApps = appsFromStorage ? JSON.parse(appsFromStorage) : mockApplications.map(app => {
      const docEntry = applicantDocData.find(d => d.appId === app.id);
      return docEntry ? { ...app, docs: app.docs || docEntry.docs } : app;
    });

    const newCounts = {
      pending_b2c: allApps.filter(a => a.status === 'Pending').length,
      pending_docs: allApps.filter(a => a.docs && getOverallStatus(a.docs) === 'Pending Review').length,
    };

    setCounts(newCounts);
  }, []);

  useEffect(() => {
    refreshCounts();
    
    // Also listen for storage events from other tabs
    window.addEventListener('storage', refreshCounts);
    return () => window.removeEventListener('storage', refreshCounts);
  }, [refreshCounts]);

  return (
    <NotificationContext.Provider value={{ counts, refreshCounts }}>
      {children}
    </NotificationContext.Provider>
  );
};
