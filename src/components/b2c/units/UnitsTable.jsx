import React, { useState } from 'react';
import UnitsMetrics from './UnitsMetrics';
import UnitCard from './UnitCard';

export default function UnitsTable({ property, units, onSelectUnit, onBack, onSearch, searchValue, unitStatus, onStatusChange }) {
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {units.map(unit => (
          <UnitCard key={unit.id} unit={unit} onClick={onSelectUnit} />
        ))}
      </div>
    </div>
  );
}
