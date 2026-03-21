import React from 'react';

const dotColor = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
  error: 'bg-red-500',
};

export default function RecentActivityFeed({ activity }) {
  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm p-6 h-full flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-normal antialiased">
          RECENT ACTIVITY FEED
        </p>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[9px] uppercase tracking-wider font-normal">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      <div className="space-y-0 flex-grow">
        {activity.map((a, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-between py-3.5 ${
              i !== activity.length - 1 ? 'border-b border-gray-50 dark:border-gray-800/40' : ''
            }`}
          >
            <div className="flex items-center gap-3 pr-4">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor[a.type] || 'bg-gray-400'}`} />
              <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight antialiased line-clamp-1">
                {a.text}
              </span>
            </div>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase whitespace-nowrap antialiased">
              {a.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
