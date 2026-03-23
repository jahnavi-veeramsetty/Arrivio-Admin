import { useState, useMemo } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import CapacityTable from '../../components/b2b/capacity/CapacityTable';
import ReservationDetail from '../../components/b2b/capacity/ReservationDetail';
import { mockPartners, mockReservations } from '../../mockdata/b2bData';
import { useToast } from '../../components/ui/Toast';
import { Search } from 'lucide-react';

export default function CapacityPage() {
  const [reservations, setReservations] = useState(mockReservations);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const { show, addToast } = useToast();

  const filteredReservations = useMemo(() => {
    return reservations.filter(r => {
      const partner = mockPartners.find(p => p.id === r.partnerId) || { name: '' };
      const matchSearch = partner.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [reservations, search, statusFilter]);

  const handleAction = (action) => {
    if (action === 'Approve Status') {
      show(`Reservation ${selected.id} status confirmed. Internal record updated.`, 'success');
    } else if (action === 'Flag Renewal') {
      show(`Reservation ${selected.id} flagged for renewal. Outreach task created for account manager.`, 'warn');
    }
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Capacity Reservations" 
        breadcrumb="B2B Partners → Capacity"
        description="Monitor room reservations and fill rates across all partners."
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by partner name..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a6644] transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select 
          className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm py-2 px-4 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Expiring Soon">Expiring Soon</option>
          <option value="Expired">Expired</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <CapacityTable 
        reservations={filteredReservations} 
        partners={mockPartners}
        onRowClick={setSelected} 
      />

      {selected && (
        <ReservationDetail 
          reservation={selected} 
          partner={mockPartners.find(p => p.id === selected.partnerId)}
          onClose={() => setSelected(null)} 
          onAction={handleAction}
        />
      )}

    </div>
  );
}
