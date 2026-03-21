import React from 'react';

export default function ActionsNeeded({ actions }) {
  if (!actions) return null;

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm p-6 h-full flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-normal antialiased">
          ACTIONS NEEDED
        </p>
        <div className="px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[9px] uppercase tracking-wider font-normal">
          {actions.length} items
        </div>
      </div>

      <div className="space-y-0 flex-grow">
        {actions.map((a, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-between py-3.5 ${
              i !== actions.length - 1 ? 'border-b border-gray-50 dark:border-gray-800/40' : ''
            }`}
          >
            <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight antialiased uppercase tracking-wide">
              {a.label}
            </span>
            <div className={`px-2.5 py-1 rounded text-[10px] whitespace-nowrap antialiased transition-colors font-normal uppercase tracking-wider ${a.color.replace('-800', '-600')}`}>
              {a.badge}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
