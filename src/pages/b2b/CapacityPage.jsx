import { useState, useMemo } from 'react';

import CapacityTable from '../../components/b2b/capacity/CapacityTable';
import ReservationDetail from '../../components/b2b/capacity/ReservationDetail';
import { mockPartners, mockReservations } from '../../mockdata/b2bData';
import { Search } from 'lucide-react';

export default function CapacityPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredReservations = useMemo(() => {
    return mockReservations.filter((reservation) => {
      const partner = mockPartners.find((entry) => entry.id === reservation.partnerId) || { name: '' };
      const matchSearch = partner.name.toLowerCase().includes(search.toLowerCase()) || reservation.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || reservation.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2B OPERATION | CAPACITY RESERVATIONS</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by partner name..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a6644] transition-all"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm py-2 px-4 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300"
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Reserved">Reserved</option>
          <option value="Maintenance Buffer">Ready Buffer</option>
        </select>
      </div>

      <CapacityTable reservations={filteredReservations} partners={mockPartners} onRowClick={setSelected} />

      {selected && (
        <ReservationDetail
          reservation={selected}
          partner={mockPartners.find((partner) => partner.id === selected.partnerId)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
