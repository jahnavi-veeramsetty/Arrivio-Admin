import React, { useState } from 'react';
import { Download, ChevronRight, Search, FileText } from 'lucide-react';
import { leaseRecords } from '../../mockdata/tenantsData';

export default function LeasesPage() {
  const [filters, setFilters] = useState({ city: 'All', type: 'All', status: 'All' });

  const filtered = leaseRecords.filter(l => {
    if (filters.type !== 'All' && l.type !== filters.type) return false;
    if (filters.status !== 'All' && l.status !== filters.status) return false;
    // Note: City filtering would require adding city to leaseRecords or joining with allTenants
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
        <span>Tenants</span>
        <ChevronRight size={10} />
        <span className="text-gray-900 font-bold">Leases</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Lease Management</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8e8e4] bg-white text-gray-600 text-[10px] font-bold rounded hover:bg-[#fafaf8] transition-all">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#e8e8e4] flex items-center gap-4 shadow-sm">
        <select 
          className="bg-[#f5f5f0] border-transparent rounded-lg text-xs px-3 py-2 outline-none focus:ring-1 focus:ring-[#1a6b3a]/20"
          value={filters.status}
          onChange={e => setFilters({...filters, status: e.target.value})}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Expiring soon">Expiring soon</option>
        </select>

        <select 
          className="bg-[#f5f5f0] border-transparent rounded-lg text-xs px-3 py-2 outline-none focus:ring-1 focus:ring-[#1a6b3a]/20"
          value={filters.type}
          onChange={e => setFilters({...filters, type: e.target.value})}
        >
          <option value="All">All Types</option>
          <option value="B2C">B2C</option>
          <option value="B2B">B2B</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e8e8e4] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fafaf8] text-gray-400 font-bold uppercase tracking-wider border-b border-[#f0f0ec]">
              <tr>
                <th className="px-5 py-3">Tenant</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Unit</th>
                <th className="px-3 py-3">Property</th>
                <th className="px-3 py-3">Lease start</th>
                <th className="px-3 py-3">Lease end</th>
                <th className="px-3 py-3">Duration</th>
                <th className="px-3 py-3">Monthly rent</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ec]">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-[#fafaf8] transition-colors">
                  <td className="px-5 py-4 font-bold text-gray-900">{l.name}</td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      l.type === 'B2C' 
                      ? 'text-[#6d28d9] bg-[#f5f3ff] border-[#ddd6fe]' 
                      : 'text-[#1d4ed8] bg-[#eff6ff] border-[#bfdbfe]'
                    }`}>
                      {l.type}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-gray-700 font-medium">{l.unit}</td>
                  <td className="px-3 py-4 text-gray-500">{l.property}</td>
                  <td className="px-3 py-4 text-gray-500">{l.start}</td>
                  <td className="px-3 py-4 text-gray-900 font-medium">{l.end}</td>
                  <td className="px-3 py-4 text-gray-500">{l.duration}</td>
                  <td className="px-3 py-4 font-bold text-gray-900">£{l.rent}</td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      l.status === 'Active' 
                      ? 'bg-[#f0f7f3] text-[#1a6b3a] border-[#a8d5b8]' 
                      : 'bg-[#fffbeb] text-[#92600a] border-[#fcd34d]'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="inline-flex items-center gap-1 px-3 py-1 border border-[#e8e8e4] text-gray-500 text-[10px] font-bold rounded hover:bg-[#fafaf8] transition-all">
                      <FileText size={12} /> View 
                    </button>
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
