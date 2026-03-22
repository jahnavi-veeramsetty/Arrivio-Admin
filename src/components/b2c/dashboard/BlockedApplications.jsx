import React from 'react';
import { useNavigate } from 'react-router-dom';
import { blockedApplications } from '../../../mockdata/b2cData';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BlockedApplications() {
  const navigate = useNavigate();
  const count = blockedApplications.length;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <AlertCircle size={14} className="text-red-500" />
          Blocked Applications
        </h2>
        {count > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-tight">
            {count} blocked
          </span>
        )}
      </div>

      <div className="flex-grow space-y-1">
        {count === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 size={32} className="text-green-500 mb-2 opacity-20" />
            <p className="text-sm text-gray-400">No blocked applications</p>
          </div>
        ) : (
          blockedApplications.map((app, idx) => (
            <div 
              key={app.id}
              onClick={() => navigate(`/admin/b2c/applications`, { state: { selectedAppId: app.id } })}
              className={`group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all ${
                idx !== count - 1 ? 'border-b border-gray-50 dark:border-gray-700/50' : ''
              }`}
            >
              <div className="flex-grow min-w-0 pr-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{app.name}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 tabular-nums">{app.id}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{app.reason}</p>
              </div>
              
              <div className="flex-shrink-0 text-right">
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  app.days >= 10 
                    ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {app.days}d
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
