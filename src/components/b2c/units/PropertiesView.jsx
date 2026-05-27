import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import PropertiesMetrics from './PropertiesMetrics';
import PropertyCard from './PropertyCard';

export default function PropertiesView({ properties, allProperties, onSelectProperty, onSearch, searchValue, selectedCity, onCityChange }) {
  const [viewMode, setViewMode] = useState('grid');

  const getRoomCount = (property, type) =>
    (property.unitBreakdown && property.unitBreakdown[type]) || 0;

  const thCls = "text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-6 py-4 border-b border-gray-100 dark:border-gray-800 focus:outline-none";
  const tdCls = "px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-50 dark:border-gray-800/50";

  return (
    <div className="space-y-6">

      <PropertiesMetrics properties={properties} />

      {/* City & Search Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-grow">
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text"
            value={searchValue}
            placeholder="Search properties by name or address..."
            className="w-full pl-14 pr-6 py-3 bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-[#1a6644] transition-all outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* City Dropdown */}
        <div className="relative min-w-[160px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full pl-11 pr-8 py-3 bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-200 cursor-pointer appearance-none focus:ring-2 focus:ring-[#1a6644] transition-all outline-none"
          >
            {['All', ...new Set((allProperties || properties).map(p => p.city))].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-50/50 dark:bg-gray-900/50 p-1 rounded-2xl border border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-[#1a6644] text-white shadow-md' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[#1a6644] text-white shadow-md' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(prop => (
            <PropertyCard key={prop.id} property={prop} onClick={onSelectProperty} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                  <th className={thCls}>Property Details</th>
                  <th className={thCls}>Location</th>
                  <th className={thCls}>Status</th>
                  <th className={thCls}>Occupancy</th>
                  <th className={thCls}>Unit Breakdown</th>
                  <th className={thCls}>Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {properties.map(prop => (
                  <tr 
                    key={prop.id} 
                    onClick={() => onSelectProperty(prop.id)}
                    className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <td className={tdCls}>
                      <span className="font-bold text-gray-900 dark:text-white block">{prop.name}</span>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">ID: {prop.id}</span>
                    </td>
                    <td className={tdCls}>
                      <span className="block text-gray-700 dark:text-gray-300">{prop.city}</span>
                      <span className="text-[11px] text-gray-500 font-medium leading-none">{prop.address}</span>
                    </td>
                    <td className={tdCls}>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                        prop.status === 'active' 
                          ? 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50' 
                          : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
                      }`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-3 min-w-[120px]">
                        <span className="text-sm font-bold text-gray-900 dark:text-white w-9 text-right">{prop.occupancyRate}%</span>
                        <div className="flex-grow bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${prop.occupancyRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className={tdCls}>
                      <div className="flex gap-2">
                        {['Single Room', 'Shared Room', 'Studio'].map(type => (
                          <div key={type} className="flex flex-col items-center bg-gray-50/50 dark:bg-gray-900/30 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-800/50 min-w-[60px]">
                            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-tight">{type}</span>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{getRoomCount(prop, type)}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-2">
                        <span className="w-9 h-7 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400 px-1">
                          {prop.rooms || prop.units.length}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Units</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {properties.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">
                      No properties found matching your search.
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
