import React, { useState } from 'react';
import { Search, Download, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allTenants } from '../../mockdata/tenantsData';

export default function AllTenants() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: '', city: 'All', type: 'All', status: 'All' });

  const filtered = allTenants.filter((tenant) => {
    if (filters.city !== 'All' && tenant.city !== filters.city) return false;
    if (filters.type !== 'All' && tenant.type !== filters.type) return false;
    if (filters.status !== 'All' && tenant.status !== filters.status) return false;
    if (filters.search && !tenant.name.toLowerCase().includes(filters.search.toLowerCase()) && !tenant.affiliation.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const cities = ['All', ...new Set(allTenants.map((tenant) => tenant.city))].sort();

  return (
    <div className="space-y-6">
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

      <div className="bg-white p-4 rounded-xl border border-[#e8e8e4] flex items-center gap-4">
        <div className="relative flex-grow max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search name or company..."
            className="w-full pl-9 pr-4 py-2 bg-[#f5f5f0] border-transparent rounded-lg text-xs focus:ring-1 focus:ring-[#1a6b3a]/20 outline-none transition-all"
            value={filters.search}
            onChange={(event) => setFilters({ ...filters, search: event.target.value })}
          />
        </div>

        <select className="bg-[#f5f5f0] border-transparent rounded-lg text-xs px-3 py-2 outline-none focus:ring-1 focus:ring-[#1a6b3a]/20" value={filters.city} onChange={(event) => setFilters({ ...filters, city: event.target.value })}>
          {cities.map((city) => <option key={city} value={city}>{city}</option>)}
        </select>

        <select className="bg-[#f5f5f0] border-transparent rounded-lg text-xs px-3 py-2 outline-none focus:ring-1 focus:ring-[#1a6b3a]/20" value={filters.type} onChange={(event) => setFilters({ ...filters, type: event.target.value })}>
          <option value="All">All Types</option>
          <option value="B2C">B2C</option>
          <option value="B2B">B2B</option>
        </select>

        <select className="bg-[#f5f5f0] border-transparent rounded-lg text-xs px-3 py-2 outline-none focus:ring-1 focus:ring-[#1a6b3a]/20" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Housing Confirmed">Housing Confirmed</option>
          <option value="Move-in Scheduled">Move-in Scheduled</option>
          <option value="Awaiting Visa Clearance">Awaiting Visa Clearance</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-[#e8e8e4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fafaf8] text-gray-400 font-bold uppercase tracking-wider border-b border-[#f0f0ec]">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-3 py-3">Nationality</th>
                <th className="px-3 py-3">Employer / University</th>
                <th className="px-3 py-3">Room</th>
                <th className="px-3 py-3">Building</th>
                <th className="px-3 py-3">Lease Start</th>
                <th className="px-3 py-3">Lease Duration</th>
                <th className="px-3 py-3">Monthly Rent</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ec]">
              {filtered.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-[#fafaf8] transition-colors cursor-pointer group" onClick={() => navigate(`/admin/tenants/profile/${tenant.id}`)}>
                  <td className="px-5 py-4">
                    <div className="font-bold text-gray-900 leading-tight group-hover:text-[#1a6b3a] transition-colors">{tenant.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{tenant.email}</div>
                  </td>
                  <td className="px-3 py-4 text-gray-600">{tenant.nationality}</td>
                  <td className="px-3 py-4 text-gray-500">{tenant.affiliation}</td>
                  <td className="px-3 py-4 text-gray-700 font-medium">{tenant.roomNumber}</td>
                  <td className="px-3 py-4 text-gray-500">{tenant.building}</td>
                  <td className="px-3 py-4 text-gray-600">{tenant.leaseStart}</td>
                  <td className="px-3 py-4 text-gray-600">{tenant.leaseDuration}</td>
                  <td className="px-3 py-4 font-bold text-gray-900">€{tenant.monthlyRent}</td>
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
