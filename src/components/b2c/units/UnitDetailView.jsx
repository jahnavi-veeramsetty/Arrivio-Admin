import React from 'react';
import TenantCard from './TenantCard';

export default function UnitDetailView({ unit, onBack }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Occupied': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Available': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Reserved': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Maintenance': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
        >
          <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Unit {unit.id}</h2>
          <p className="text-xs text-gray-500 font-medium">Detailed specifications and tenant history.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-6">
          <InfoItem label="Type" value={unit.type} />
          <InfoItem label="Floor" value={unit.floor === 0 ? 'G (Ground)' : unit.floor} />
          <InfoItem label="Monthly Rent" value={`$${unit.rent.toLocaleString()}`} isBold />
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Status</p>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getStatusColor(unit.status)}`}>
              {unit.status}
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-50 dark:border-gray-700">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-widest">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {unit.amenities.map(a => (
              <span key={a} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Tenant Information</h3>
        <TenantCard tenant={unit.tenant} />
      </div>
    </div>
  );
}

function InfoItem({ label, value, isBold }) {
  return (
    <div>
      <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5 tracking-widest">{label}</p>
      <p className={`text-base ${isBold ? 'font-black text-blue-600 dark:text-blue-400' : 'font-medium text-gray-900 dark:text-white'}`}>
        {value}
      </p>
    </div>
  );
}
