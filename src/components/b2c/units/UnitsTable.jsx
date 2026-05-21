import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import UnitsMetrics from './UnitsMetrics';
import UnitCard from './UnitCard';

export default function UnitsTable({ property, units, onSelectUnit, onBack, onSearch, searchValue, unitStatus, onStatusChange }) {
  const [viewMode, setViewMode] = useState('grid');

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Occupied': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50';
      case 'Available': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800/50';
      case 'Reserved': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-800/50';
      case 'Maintenance': return 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400 border-rose-100 dark:border-rose-800/50';
      default: return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400 border-gray-100 dark:border-gray-800/50';
    }
  };

  const thCls = "text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-6 py-4 border-b border-gray-100 dark:border-gray-800";
  const tdCls = "px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-50 dark:border-gray-800/50";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm active:scale-95 transition-shadow"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">{property.name}</h2>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-[0.2em]">Regional Property Profile</p>
          </div>
        </div>
      </div>

      <UnitsMetrics units={property.units} />

      {/* Filter Bar */}
      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchValue}
            placeholder="Search units, types, or tenants..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-none rounded-xl text-sm font-semibold shadow-sm focus:ring-2 focus:ring-[#1a6644] transition-all outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative min-w-[180px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <select
            value={unitStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white dark:bg-gray-800 border-none rounded-xl text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-200 cursor-pointer appearance-none focus:ring-2 focus:ring-[#1a6644] transition-all shadow-sm outline-none"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Reserved">Reserved</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#1a6644] text-white shadow-md' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#1a6644] text-white shadow-md' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {units.map(unit => (
            <UnitCard key={unit.id} unit={unit} onClick={onSelectUnit} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                  <th className={thCls}>Unit ID</th>
                  <th className={thCls}>Type</th>
                  <th className={thCls}>Status</th>
                  <th className={thCls}>Monthly Rent</th>
                  <th className={thCls}>Floor Level</th>
                  <th className={thCls}>Current Occupant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {units.map(unit => (
                  <tr 
                    key={unit.id} 
                    onClick={() => onSelectUnit(unit.id)}
                    className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <td className={`${tdCls} text-blue-600 dark:text-blue-400 font-bold`}>{unit.id}</td>
                    <td className={`${tdCls} text-gray-500 uppercase text-[10px] tracking-wider`}>{unit.type}</td>
                    <td className={tdCls}>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStatusStyle(unit.status)}`}>
                        {unit.status}
                      </span>
                    </td>
                    <td className={tdCls}>${unit.rent.toLocaleString()}</td>
                    <td className={tdCls}>{unit.floor}</td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-[9px] font-bold text-gray-400 shrink-0">
                          {unit.tenant ? unit.tenant.name.split(' ').map(n => n[0]).join('') : '--'}
                        </div>
                        <span className={`truncate ${!unit.tenant ? 'text-gray-400 font-normal italic' : ''}`}>
                          {unit.tenant ? unit.tenant.name : 'No Tenant Assigned'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                {units.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">
                      No units found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
