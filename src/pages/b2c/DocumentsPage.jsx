import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import DocumentFilters from '../../components/b2c/documents/DocumentFilters';
import DocumentsTable from '../../components/b2c/documents/DocumentsTable';
import { useToast } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { useNotification } from '../../context/NotificationContext';
import { mockApplications, applicantDocData } from '../../mockdata/b2cData';

export default function DocumentsPage() {
  const canAccess = useRole(['super_admin', 'ops_manager']);
  const { show, addToast } = useToast();
  const { refreshCounts } = useNotification();
  const [searchParams] = useSearchParams();
  const appId = searchParams.get('appId');

  const [apps, setApps] = useState(() => {
    const saved = localStorage.getItem('arrivio_b2c_apps');
    let baseApps = saved ? JSON.parse(saved) : [...mockApplications];
    
    // Merge applicantDocData into baseApps if not already present
    return baseApps.map(app => {
      const docEntry = applicantDocData.find(d => d.appId === app.id);
      if (docEntry) {
        return {
          ...app,
          applicantType: app.applicantType || docEntry.applicantType,
          docs: app.docs || docEntry.docs
        };
      }
      return app;
    });
  });

  useEffect(() => {
    localStorage.setItem('arrivio_b2c_apps', JSON.stringify(apps));
    refreshCounts();
  }, [apps, refreshCounts]);

  const [filters, setFilters] = useState({ search: '', status: 'All', city: 'All', reviewer: 'All' });

  if (!canAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Lock size={32} className="text-gray-300 dark:text-gray-600" />
        <p className="text-base font-semibold text-gray-500 dark:text-gray-400">Access Denied</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-xs">
          Document review is only available to Super Admin and Ops Manager roles.
        </p>
      </div>
    );
  }

  const handleReset = () => {
    localStorage.removeItem('arrivio_b2c_apps');
    const resetData = mockApplications.map(app => {
      const docEntry = applicantDocData.find(d => d.appId === app.id);
      if (docEntry) {
        return { ...app, applicantType: docEntry.applicantType, docs: docEntry.docs };
      }
      return app;
    });
    setApps(resetData);
    show('Data reset to defaults', 'success');
  };

  const handleUpdateApp = (updatedApp) => {
    setApps(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
  };

  // Helper to compute overall status
  const getOverallStatus = (docs) => {
    if (!docs) return 'N/A';
    const statuses = Object.values(docs).map(d => d.status);
    if (statuses.every(s => s === 'Verified')) return 'Verified';
    if (statuses.some(s => s === 'Rejected')) return 'Rejected';
    return 'Pending Review';
  };

  const filtered = apps.filter(a => {
    if (!a.docs) return false;
    const overallStatus = getOverallStatus(a.docs);
    
    if (filters.status !== 'All' && overallStatus !== filters.status) return false;
    if (filters.city !== 'All' && a.city !== filters.city) return false;
    if (filters.reviewer !== 'All' && a.reviewer !== filters.reviewer) return false;
    if (filters.search && !a.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !a.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const statuses = ['All', 'Verified', 'Rejected', 'Pending Review'];
  const cities = ['All', ...new Set(apps.map(a => a.city))].sort();
  const reviewers = ['All', ...new Set(apps.map(a => a.reviewer))].sort();

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2C OPERATION | DOCUMENTS</p>
        </div>
      </div>

      <DocumentFilters 
        filters={filters} 
        onChange={setFilters} 
        statuses={statuses} 
        cities={cities} 
        reviewers={reviewers} 
        onReset={handleReset} 
      />

      <DocumentsTable 
        apps={filtered} 
        onUpdate={handleUpdateApp} 
        showToast={show}
        initialAppId={appId}
      />
      
    </div>
  );
}
