import React, { useState } from 'react';
import PropertiesMetrics from './PropertiesMetrics';
import PropertyCard from './PropertyCard';

export default function PropertiesView({ properties, allProperties, onSelectProperty, onSearch, searchValue, selectedCity, onCityChange }) {

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
            className="w-full pl-14 pr-6 py-3 bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-[#1a6644] transition-all"
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
            className="w-full pl-11 pr-8 py-3 bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-200 cursor-pointer appearance-none focus:ring-2 focus:ring-[#1a6644] transition-all"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(prop => (
          <PropertyCard key={prop.id} property={prop} onClick={onSelectProperty} />
        ))}
      </div>
    </div>
  );
}
