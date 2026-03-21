import { useState, useMemo } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import PartnerFilters from '../../components/b2b/partners/PartnerFilters';
import PartnersTable from '../../components/b2b/partners/PartnersTable';
import PartnerDetail from '../../components/b2b/partners/PartnerDetail';
import { mockPartners } from '../../mockdata/b2bData';
import { useRole } from '../../utils/rbac';
import { useToast, ToastContainer } from '../../components/ui/Toast';

export default function PartnersPage() {
  const [partners, setPartners] = useState(mockPartners);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const { toasts, show, dismiss } = useToast();
  const canExport = useRole(['super_admin', 'sales_partnership']);

  const filteredPartners = useMemo(() => {
    return partners.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || p.type === typeFilter;
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [partners, search, typeFilter, statusFilter]);

  const handleAction = (action) => {
    if (action === 'Approve') {
      setPartners(prev => prev.map(p => p.id === selected.id ? { ...p, status: 'Active' } : p));
      show(`Partner ${selected.name} has been approved. Welcome email sent.`, 'success');
    } else if (action === 'Reject') {
      setPartners(prev => prev.map(p => p.id === selected.id ? { ...p, status: 'Inactive' } : p));
      show(`Partner ${selected.name} application rejected. Applicant notified.`, 'warn');
    }
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="All Partners" 
        breadcrumb="B2B Partners → All Partners"
        description="Manage partner accounts, onboarding, and assigned managers."
      />

      <PartnerFilters 
        onSearch={setSearch} 
        onFilterType={setTypeFilter} 
        onFilterStatus={setStatusFilter}
        canExport={canExport}
      />

      <PartnersTable 
        partners={filteredPartners} 
        onRowClick={setSelected} 
      />

      {selected && (
        <PartnerDetail 
          partner={selected} 
          onClose={() => setSelected(null)} 
          onAction={handleAction}
        />
      )}

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
