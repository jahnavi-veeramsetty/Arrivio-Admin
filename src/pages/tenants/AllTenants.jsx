import React, { useState } from 'react';
import { Search, Download, Eye, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allTenants } from '../../mockdata/tenantsData';

export default function AllTenants() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', city: 'All', type: 'All', status: 'All' });

  const filtered = allTenants.filter(t => {
    if (filters.city !== 'All' && t.city !== filters.city) return false;
    if (filters.type !== 'All' && t.type !== filters.type) return false;
    if (filters.status !== 'All' && t.status !== filters.status) return false;
    if (filters.search && !t.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !t.email.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const cities = ['All', ...new Set(allTenants.map(t => t.city))].sort();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
        <span>Tenants</span>
        <ChevronRight size={10} />
        <span className="text-gray-900 font-bold">All Tenants</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">All Tenants</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8e8e4] bg-white text-gray-600 text-[10px] font-bold rounded hover:bg-[#fafaf8] transition-all">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#e8e8e4] flex items-center gap-4">
        <div className="relative flex-grow max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search name or email..."
            className="w-full pl-9 pr-4 py-2 bg-[#f5f5f0] border-transparent rounded-lg text-xs focus:ring-1 focus:ring-[#1a6b3a]/20 outline-none transition-all"
            value={filters.search}
            onChange={e => setFilters({...filters, search: e.target.value})}
          />
        </div>
        
        <select 
          className="bg-[#f5f5f0] border-transparent rounded-lg text-xs px-3 py-2 outline-none focus:ring-1 focus:ring-[#1a6b3a]/20"
          value={filters.city}
          onChange={e => setFilters({...filters, city: e.target.value})}
        >
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
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

        <select 
          className="bg-[#f5f5f0] border-transparent rounded-lg text-xs px-3 py-2 outline-none focus:ring-1 focus:ring-[#1a6b3a]/20"
          value={filters.status}
          onChange={e => setFilters({...filters, status: e.target.value})}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Departing">Departing</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e8e8e4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fafaf8] text-gray-400 font-bold uppercase tracking-wider border-b border-[#f0f0ec]">
              <tr>
                <th className="px-5 py-3">Tenant</th>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Unit</th>
                <th className="px-3 py-3">Property</th>
                <th className="px-3 py-3">City</th>
                <th className="px-3 py-3">Lease ends</th>
                <th className="px-3 py-3">Rent status</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ec]">
              {filtered.map(t => (
                <tr 
                  key={t.id} 
                  className="hover:bg-[#fafaf8] transition-colors cursor-pointer group"
                  onClick={() => navigate(`/admin/tenants/profile/${t.id}`)}
                >
                  <td className="px-5 py-4">
                    <div className="font-bold text-gray-900 leading-tight group-hover:text-[#1a6b3a] transition-colors">{t.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{t.email}</div>
                  </td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      t.type === 'B2C' 
                      ? 'text-[#6d28d9] bg-[#f5f3ff] border-[#ddd6fe]' 
                      : 'text-[#1d4ed8] bg-[#eff6ff] border-[#bfdbfe]'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-gray-700 font-medium">{t.unit}</td>
                  <td className="px-3 py-4 text-gray-500">{t.property}</td>
                  <td className="px-3 py-4 text-gray-600">{t.city}</td>
                  <td className="px-3 py-4 text-gray-700">{t.leaseEnd}</td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      t.rentStatus === 'Paid' 
                      ? 'bg-[#f0f7f3] text-[#1a6b3a] border-[#a8d5b8]' 
                      : 'bg-[#fef2f2] text-[#b91c1c] border-[#fca5a5]'
                    }`}>
                      {t.rentStatus}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      t.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="px-3 py-1 border border-[#e8e8e4] text-gray-500 text-[10px] font-bold rounded hover:bg-[#fafaf8] transition-all">
                      View Profile
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
