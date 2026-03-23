import React, { useState } from 'react';
import { PoundSterling, AlertCircle, Calendar, Send, Download, Search, ChevronRight, FileCheck } from 'lucide-react';
import { rentLedger, tenantStats } from '../../mockdata/tenantsData';

const StatCard = ({ title, value, icon: Icon, colorClass, subtext }) => (
  <div className="bg-[#f5f5f0] p-5 rounded-xl flex flex-col gap-1">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</span>
      <Icon size={16} className={colorClass || 'text-gray-400'} />
    </div>
    <div className="flex items-baseline gap-2">
      <span className={`text-2xl font-bold ${colorClass || 'text-gray-900'}`}>{value}</span>
      {subtext && <span className="text-[10px] text-gray-400">{subtext}</span>}
    </div>
  </div>
);

export default function RentLedger() {
  const [filters, setFilters] = useState({ search: '', status: 'All' });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
        <span>Tenants</span>
        <ChevronRight size={10} />
        <span className="text-gray-900 font-bold">Rent Ledger</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900">Rent Ledger</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Collected this month" value={`£${(tenantStats.collectedThisMonth / 1000).toFixed(0)}k`} icon={PoundSterling} colorClass="text-[#1a6b3a]" />
        <StatCard title="Outstanding" value={`£${tenantStats.outstandingRent}`} icon={AlertCircle} colorClass="text-[#b91c1c]" subtext={`across ${tenantStats.overdueRent} tenants`} />
        <StatCard title="Avg days to pay" value={`${tenantStats.avgDaysToPay}d`} icon={Calendar} />
        <StatCard title="Reminders sent" value={tenantStats.remindersSent} icon={Send} colorClass="text-[#92600a]" subtext="this month" />
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#e8e8e4] flex items-center justify-between">
        <div className="flex items-center gap-4 flex-grow">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search tenant or unit..."
              className="w-full pl-9 pr-4 py-2 bg-[#f5f5f0] border-transparent rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#1a6b3a]/20"
              value={filters.search}
              onChange={e => setFilters({...filters, search: e.target.value})}
            />
          </div>
          <select 
            className="bg-[#f5f5f0] border-transparent rounded-lg text-xs px-3 py-2 outline-none focus:ring-1 focus:ring-[#1a6b3a]/20"
            value={filters.status}
            onChange={e => setFilters({...filters, status: e.target.value})}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8e8e4] bg-white text-gray-600 text-[10px] font-bold rounded hover:bg-[#fafaf8] transition-all">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e8e8e4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fafaf8] text-gray-400 font-bold uppercase tracking-wider border-b border-[#f0f0ec]">
              <tr>
                <th className="px-5 py-3">Tenant</th>
                <th className="px-3 py-3">Unit</th>
                <th className="px-3 py-3">Property</th>
                <th className="px-3 py-3">Due date</th>
                <th className="px-3 py-3">Amount</th>
                <th className="px-3 py-3">Paid on</th>
                <th className="px-3 py-3">Method</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ec]">
              {rentLedger.map(record => (
                <tr key={record.id} className="hover:bg-[#fafaf8] transition-colors">
                  <td className="px-5 py-4 font-bold text-gray-900">{record.name}</td>
                  <td className="px-3 py-4 text-gray-700 font-medium">{record.unit}</td>
                  <td className="px-3 py-4 text-gray-500">{record.property}</td>
                  <td className="px-3 py-4 text-gray-500">{record.dueDate}</td>
                  <td className="px-3 py-4 font-bold text-gray-900">£{record.amount}</td>
                  <td className="px-3 py-4 text-gray-500">{record.paidDate}</td>
                  <td className="px-3 py-4 text-gray-400 uppercase font-bold text-[10px] tracking-tight">{record.method}</td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      record.status === 'Paid' 
                      ? 'bg-[#f0f7f3] text-[#1a6b3a] border-[#a8d5b8]' 
                      : 'bg-[#fef2f2] text-[#b91c1c] border-[#fca5a5]'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {record.status === 'Overdue' ? (
                      <button className="inline-flex items-center gap-1 px-3 py-1 border border-[#a8d5b8] bg-[#f0f7f3] text-[#1a6644] text-[10px] font-bold rounded hover:bg-[#1a6644] hover:text-white transition-all">
                        <Send size={12} /> Remind
                      </button>
                    ) : (
                      <button className="inline-flex items-center gap-1 px-3 py-1 border border-[#e8e8e4] text-gray-500 text-[10px] font-bold rounded hover:bg-[#fafaf8] transition-all">
                        <FileCheck size={12} /> Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
