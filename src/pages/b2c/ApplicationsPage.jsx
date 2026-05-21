import { useState, useEffect } from 'react';
import ApplicationFilters from '../../components/b2c/applications/ApplicationFilters';
import ApplicationsTable from '../../components/b2c/applications/ApplicationsTable';
import ApplicationDetail from '../../components/b2c/applications/ApplicationDetail';
import { useToast } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { useNotification } from '../../context/NotificationContext';
import { mockApplications, applicantDocData } from '../../mockdata/b2cData';

export default function ApplicationsPage() {
  const canAction = useRole(['super_admin', 'ops_manager']);
  const isSupport = useRole(['support_agent']);
  const { show, addToast } = useToast();
  const { refreshCounts } = useNotification();

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2C OPERATION | APPLICATIONS</p>
        </div>
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

    </div>
  );
}
