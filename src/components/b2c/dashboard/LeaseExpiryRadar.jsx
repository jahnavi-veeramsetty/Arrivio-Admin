import React from 'react';
import { leaseExpiries } from '../../../mockdata/b2cData';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function LeaseExpiryRadar({ onAction }) {
  const sorted = [...leaseExpiries].sort((a, b) => a.daysRemaining - b.daysRemaining);

  const getDayColor = (days) => {
    if (days <= 14) return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-100 dark:border-red-800';
    if (days <= 30) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-800';
    if (days <= 60) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-100 dark:border-yellow-800';
    return 'text-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-gray-100 dark:border-gray-700';
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/20">
        <div>
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 uppercase tracking-wider">
            <Clock size={15} className="text-[#1a6644]" />
            Lease Expiry Radar
          </h2>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Active tenants with leases ending within 60 days</p>
        </div>
        <div className="flex items-center gap-2">
           <Calendar size={14} className="text-gray-300" />
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Next 60 Days</span>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[350px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse sticky-header">
          <thead className="sticky top-0 z-10 bg-gray-50/95 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm">
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tenant</th>
              <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unit & Property</th>
              <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Expiry</th>
              <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Remaining</th>
              <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-3">
                      <ArrowRight className="text-green-500 transform rotate-[-45deg]" size={20} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No leases expiring in the next 60 days</p>
                  </div>
                </td>
              </tr>
            ) : (
              sorted.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.tenant}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{item.unit}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{item.property} · {item.city}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">{item.endDate}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border tabular-nums ${getDayColor(item.daysRemaining)}`}>
                      {item.daysRemaining} days
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => onAction(`Email template draft for ${item.tenant} generated.`)}
                      className="px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-tight hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all active:scale-95"
                    >
                      Send Mail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
