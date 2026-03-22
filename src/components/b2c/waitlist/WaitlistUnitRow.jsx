import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bell, Trash2, Mail } from 'lucide-react';

export default function WaitlistUnitRow({ unit, canAction, showToast }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasWaitlist = unit.waitlist && unit.waitlist.length > 0;

  return (
    <div className="border-b border-gray-50 dark:border-gray-800 last:border-0">
      <div 
        onClick={() => hasWaitlist && setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
          isExpanded ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
            {unit.name.split(' ')[1] || unit.name}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{unit.name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                unit.type === 'Studio' ? 'bg-blue-100 text-blue-700' :
                unit.type === '1BR' ? 'bg-purple-100 text-purple-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {unit.type}
              </span>
              <span className={`text-[10px] font-medium ${unit.status === 'Available' ? 'text-emerald-600' : 'text-gray-400'}`}>
                {unit.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Waitlist</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {hasWaitlist ? `${unit.waitlist.length} Applicants` : 'None'}
            </p>
          </div>
          {hasWaitlist ? (
            <div className={`p-1.5 rounded-lg transition-transform ${isExpanded ? 'rotate-180 bg-emerald-100 text-emerald-600' : 'text-gray-400'}`}>
              <ChevronDown size={18} />
            </div>
          ) : (
            <div className="w-9" /> // Spacer
          )}
        </div>
      </div>

      {isExpanded && hasWaitlist && (
        <div className="p-4 bg-gray-50/50 dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2 duration-300">
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-12 text-center">#</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Applicant</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date Added</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Days Waiting</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {unit.waitlist.map((entry, idx) => (
                  <tr key={entry.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${
                        idx === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{entry.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-gray-400">
                          <Mail size={10} />
                          <span>{entry.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-gray-600 dark:text-gray-400">
                      {new Date(entry.dateAdded).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold ${entry.daysWaiting > 60 ? 'text-rose-600' : 'text-gray-900 dark:text-white'}`}>
                        {entry.daysWaiting}d
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {idx === 0 ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); showToast('Notification sent to ' + entry.name, 'success'); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm shadow-emerald-900/20 active:scale-95"
                          >
                            <Bell size={12} />
                            Notify
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => { e.stopPropagation(); showToast('Applicant removed from list', 'info'); }}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
