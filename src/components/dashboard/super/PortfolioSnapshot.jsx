import React from 'react';

const getStatusStyles = (status) => {
  switch (status) {
    case 'green':
      return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400';
    case 'amber':
      return 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400';
    case 'red':
      return 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400';
    default:
      return 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
  }
};

export default function PortfolioSnapshot({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm p-6 h-full flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-normal antialiased">
          PORTFOLIO SNAPSHOT
        </p>
      </div>

      <div className="space-y-0 flex-grow">
        {data.map((item, idx) => (
          <div 
            key={idx} 
            className={`flex items-center justify-between py-3.5 ${
              idx !== data.length - 1 ? 'border-b border-gray-50 dark:border-gray-800/40' : ''
            }`}
          >
            <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight pr-4 antialiased">
              {item.label}
            </span>
            <div className={`flex items-center px-2.5 py-1 rounded text-[10px] whitespace-nowrap antialiased transition-colors ${getStatusStyles(item.status)}`}>
              <span className="flex items-center gap-1 font-normal uppercase tracking-wider">
                {item.value}
                {item.trend === 'up' && <span className="text-emerald-500 text-[12px] leading-none">↑</span>}
                {item.trend === 'down' && <span className="text-red-500 text-[12px] leading-none">↓</span>}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
