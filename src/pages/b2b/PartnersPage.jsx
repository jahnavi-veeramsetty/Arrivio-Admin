import { useState, useMemo } from 'react';

import PartnerFilters from '../../components/b2b/partners/PartnerFilters';
import PartnersTable from '../../components/b2b/partners/PartnersTable';
import PartnerDetail from '../../components/b2b/partners/PartnerDetail';
import { mockPartners } from '../../mockdata/b2bData';
import { useRole } from '../../utils/rbac';
import { useToast } from '../../components/ui/Toast';

export default function PartnersPage() {
  const [partners, setPartners] = useState(mockPartners);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const { show, addToast } = useToast();
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2B OPERATION | ALL PARTNERS</p>
        </div>
      </div>

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

    </div>
  );
}
