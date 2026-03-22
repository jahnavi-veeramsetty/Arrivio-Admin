import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import DocumentFilters from '../../components/b2c/documents/DocumentFilters';
import DocumentsTable from '../../components/b2c/documents/DocumentsTable';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { mockApplications, applicantDocData } from '../../mockdata/b2cData';

export default function DocumentsPage() {
  const canAccess = useRole(['super_admin', 'ops_manager']);
  const { toasts, show, dismiss } = useToast();
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
  }, [apps]);

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
    if (statuses.some(s => s === 'Rejected')) return 'Has Rejections';
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

  const statuses = ['All', 'Verified', 'Has Rejections', 'Pending Review'];
  const cities = ['All', ...new Set(apps.map(a => a.city))].sort();
  const reviewers = ['All', ...new Set(apps.map(a => a.reviewer))].sort();

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">B2C Applications → Documents</p>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Document Review</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review uploaded documents per applicant. Use filters to narrow down the list.
        </p>
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
      
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
