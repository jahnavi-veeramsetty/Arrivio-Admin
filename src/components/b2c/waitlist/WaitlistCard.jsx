import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Building2, MapPin, Users, CheckCircle2, MoreHorizontal } from 'lucide-react';
import WaitlistUnitRow from './WaitlistUnitRow';

export default function WaitlistCard({ property, unitTypeFilter, canAction, showToast }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter units based on unitTypeFilter
  const filteredUnits = property.units.filter(u =>
    unitTypeFilter === 'All' || u.type === unitTypeFilter
  );

  const waitingCount = filteredUnits.reduce((acc, u) => acc + (u.waitlist?.length || 0), 0);

  return (
    <div className={`group bg-white dark:bg-gray-900 rounded-3xl border transition-all duration-300 overflow-hidden ${
      isExpanded 
        ? 'border-emerald-500/50 shadow-xl shadow-emerald-900/10' 
        : 'border-gray-100 dark:border-gray-800 hover:border-emerald-500/30 hover:shadow-lg'
    }`}>
      {/* Card Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
              isExpanded ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
            }`}>
              <Building2 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{property.name}</h3>
              <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                <MapPin size={12} />
                <span className="text-[10px] uppercase font-semibold tracking-wider">{property.address}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              {waitingCount} Waiting
            </div>
            <div className={`p-2 rounded-xl transition-all ${isExpanded ? 'rotate-90 bg-emerald-50 text-emerald-600' : 'text-gray-300'}`}>
              <ChevronRight size={20} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 border-t border-gray-50 dark:border-gray-800 pt-4">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Units</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{property.totalUnits}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Occupied</p>
            <div className="flex items-center gap-1.5">
              <Users size={12} className="text-blue-500" />
              <p className="text-sm font-bold text-gray-900 dark:text-white">{property.occupiedUnits}</p>
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Available</p>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500" />
              <p className="text-sm font-bold text-gray-900 dark:text-white">{property.availableUnits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content (Unit List) */}
      {isExpanded && (
        <div className="border-t border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/10 animate-in slide-in-from-top-4 duration-500">
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {filteredUnits.length > 0 ? (
              filteredUnits.map(unit => (
                <WaitlistUnitRow 
                  key={unit.id} 
                  unit={unit} 
                  canAction={canAction} 
                  showToast={showToast} 
                />
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-sm font-medium text-gray-400 italic">No units match your current filter</p>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-900 flex justify-center">
             <button className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:underline active:scale-95 transition-all">
                View Full Inventory
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
