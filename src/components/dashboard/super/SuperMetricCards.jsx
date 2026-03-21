// src/components/dashboard/super/SuperMetricCards.jsx
import React from 'react';

export default function SuperMetricCards({ metrics }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((m, i) => (
        <div key={i} className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow-sm transition-colors">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-tight mb-2">{m.label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black italic font-mono text-gray-900 dark:text-white">{m.value}</p>
            {m.trend && (
              <span className={`text-[10px] font-black ${m.trendColor}`}>
                {m.trend}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
