import { useState } from 'react';
import ApplicationFilters from '../../components/b2c/applications/ApplicationFilters';
import ApplicationsTable  from '../../components/b2c/applications/ApplicationsTable';
import ApplicationDetail  from '../../components/b2c/applications/ApplicationDetail';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { mockApplications } from '../../mockdata/b2cData';

export default function ApplicationsPage() {
  const canAction = useRole(['super_admin', 'ops_manager']);
  const isSupport = useRole(['support_agent']);
  const { toasts, show, dismiss } = useToast();

  const [selected, setSelected] = useState(null);
  const [filters,  setFilters]  = useState({ search:'', status:'All', city:'All', reviewer:'All' });

  const filtered = mockApplications.filter(a => {
    if (filters.status   !== 'All' && a.status   !== filters.status)   return false;
    if (filters.city     !== 'All' && a.city     !== filters.city)     return false;
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
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">All Applications</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {filtered.length} applications · Filterable, sortable master table of all B2C tenant applications.
        </p>
      </div>

      <ApplicationFilters filters={filters} onChange={setFilters} />
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
          showToast={show}
        />
      )}

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
