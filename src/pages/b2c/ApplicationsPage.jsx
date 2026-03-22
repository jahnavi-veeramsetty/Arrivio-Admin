import { useState, useEffect } from 'react';
import ApplicationFilters from '../../components/b2c/applications/ApplicationFilters';
import ApplicationsTable from '../../components/b2c/applications/ApplicationsTable';
import ApplicationDetail from '../../components/b2c/applications/ApplicationDetail';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { mockApplications, applicantDocData } from '../../mockdata/b2cData';

export default function ApplicationsPage() {
  const canAction = useRole(['super_admin', 'ops_manager']);
  const isSupport = useRole(['support_agent']);
  const { toasts, show, dismiss } = useToast();

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

  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: 'All', city: 'All', reviewer: 'All' });

  // Statuses restricted to Pending, Rejected, and Approved
  const statuses = ['All', 'Pending', 'Rejected', 'Approved'];
  const cities = ['All', ...new Set(apps.map(a => a.city))].sort();
  const reviewers = ['All', ...new Set(apps.map(a => a.reviewer))].sort();

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
    showToast('Data reset to defaults', 'success');
  };

  const handleUpdateApp = (updatedApp) => {
    setApps(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
    if (selected && selected.id === updatedApp.id) {
      setSelected(updatedApp);
    }
  };

  const filtered = apps.filter(a => {
    // Only show Pending, Rejected, and Approved
    if (!['Pending', 'Rejected', 'Approved'].includes(a.status)) return false;

    if (filters.status !== 'All' && a.status !== filters.status) return false;
    if (filters.city !== 'All' && a.city !== filters.city) return false;
    if (filters.reviewer !== 'All' && a.reviewer !== filters.reviewer) return false;
    if (filters.search && !a.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !a.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">B2C Applications</p>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Active Applications</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {filtered.length} applications · Pending, Rejected or Approved status only.
        </p>
      </div>

      <ApplicationFilters
        filters={filters}
        onChange={setFilters}
        statuses={statuses}
        cities={cities}
        reviewers={reviewers}
        onReset={handleReset}
      />
      <ApplicationsTable
        apps={filtered}
        onSelect={setSelected}
        canAction={canAction}
        showToast={show}
      />

      {selected && (
        <ApplicationDetail
          app={selected}
          canAction={canAction}
          isSupport={isSupport}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdateApp}
          showToast={show}
        />
      )}

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
