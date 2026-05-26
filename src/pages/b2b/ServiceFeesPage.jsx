import { useState, useMemo } from 'react';

import ServiceFeeMetrics from '../../components/b2b/service-fees/ServiceFeeMetrics';
import ServiceFeesTable from '../../components/b2b/service-fees/ServiceFeesTable';
import { mockServiceFees } from '../../mockdata/b2bData';
import { useToast } from '../../components/ui/Toast';
import { Search, Download } from 'lucide-react';
import { useRole } from '../../utils/rbac';

export default function ServiceFeesPage() {
  const [serviceFees, setServiceFees] = useState(mockServiceFees);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const { show, addToast } = useToast();
  const canModify = useRole(['super_admin', 'finance_manager']);

  const filteredServiceFees = useMemo(() => {
    return serviceFees.filter(s => {
      const matchSearch = s.agency.toLowerCase().includes(search.toLowerCase()) || s.tenant.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [serviceFees, search, statusFilter]);

  const handleProcessPayment = (serviceFee) => {
    if (!canModify) {
      show('You do not have permission to process payments.', 'error');
      return;
    }

    setServiceFees(prev => prev.map(s =>
      s.id === serviceFee.id ? { ...s, status: 'Paid' } : s
    ));
    show(`Payment of €${serviceFee.amount.toLocaleString()} processed for ${serviceFee.agency}.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2B OPERATION | AGENCY SERVICE FEES</p>
          </div>
        </div>
        <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
          <Download size={16} /> Batch Export
        </button>
      </div>

      <ServiceFeeMetrics serviceFees={serviceFees} />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search agency or tenant..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a6644] transition-all font-medium"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="w-full md:w-auto bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-xs py-2 px-4 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300 font-black uppercase tracking-widest"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <ServiceFeesTable
        serviceFees={filteredServiceFees}
        onProcessPayment={handleProcessPayment}
      />

    </div>
  );
}
