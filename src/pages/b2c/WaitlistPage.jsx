import React, { useState } from 'react';
import { Search, ChevronDown, Filter, LayoutGrid } from 'lucide-react';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { waitlistProperties } from '../../mockdata/b2cData';
import WaitlistCard from '../../components/b2c/waitlist/WaitlistCard';

export default function WaitlistPage() {
  const canAction   = useRole(['super_admin', 'ops_manager']);
  const { toasts, show, dismiss } = useToast();
  
  const [cityFilter, setCityFilter] = useState('All');
  const [unitTypeFilter, setUnitTypeFilter] = useState('All');

  // Filter properties based on city
  const filteredPropertiesByCity = waitlistProperties.filter(group => 
    cityFilter === 'All' || group.city === cityFilter
  );

  const unitTypes = ['All', 'Studio', '1 Bedroom', '2 Bedroom'];
  const cities = ['All', 'Singapore', 'Dubai', 'London'];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">B2C Applications / Waitlist</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-none">Waitlist</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
            Applicants waiting for a unit to become available, organised by property and unit. 
            Manage priorities and notify top-tier applicants when availability opens.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
              <Filter size={14} />
            </div>
            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="pl-9 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 appearance-none hover:border-emerald-500/50 transition-all cursor-pointer focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-sm"
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
              <LayoutGrid size={14} />
            </div>
            <select 
              value={unitTypeFilter}
              onChange={(e) => setUnitTypeFilter(e.target.value)}
              className="pl-9 pr-10 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 appearance-none hover:border-emerald-500/50 transition-all cursor-pointer focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-sm"
            >
              {unitTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-12">
        {filteredPropertiesByCity.map(cityGroup => (
          <div key={cityGroup.city} className="space-y-6">
            {/* City Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-grow bg-gradient-to-r from-gray-200/50 dark:from-gray-800/50 to-transparent" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 whitespace-nowrap px-4 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-100 dark:border-gray-700/50 shadow-inner">
                {cityGroup.city}
              </h2>
              <div className="h-px flex-grow bg-gradient-to-l from-gray-200/50 dark:from-gray-800/50 to-transparent" />
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityGroup.properties.map(property => (
                <WaitlistCard 
                  key={property.id} 
                  property={property} 
                  unitTypeFilter={unitTypeFilter} 
                  canAction={canAction}
                  showToast={show}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredPropertiesByCity.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-gray-400 font-medium">No waitlist entries found for your selection.</p>
        </div>
      )}

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
