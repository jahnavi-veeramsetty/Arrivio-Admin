// src/components/dashboard/super/SuperMetricCards.jsx
import React from 'react';

export default function SuperMetricCards({ metrics }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((m, i) => {
        const numericValue = parseInt(m.value.replace(/[^0-9]/g, '')) || 0;
        const isAmberAlert = m.trend === 'Amber' && numericValue > 5;
        const isAmberType  = m.trend === 'Amber';
        const isProperties = m.label === 'Properties / Units';

        return (
          <div
            key={i}
            className={`relative group overflow-hidden rounded-xl px-5 py-4 border transition-colors
              ${isAmberAlert
                ? 'bg-[#1e1a0f] border-amber-500/30'
                : 'bg-white dark:bg-[#0d1117] border-gray-100 dark:border-gray-800/50'
              }`}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className={`text-[9px] uppercase tracking-[0.2em] mb-3
                  ${isAmberAlert ? 'text-amber-500/80' : 'text-gray-400 dark:text-gray-500'}`}
                >
                  {m.label}
                </p>
                
                {isProperties ? (
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl ${isAmberAlert ? 'text-amber-100' : 'text-gray-900 dark:text-white'}`}>
                        {m.value.split('props')[0]}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">props</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg text-gray-500 dark:text-gray-400">
                        {m.value.split('·')[1]?.replace('units', '').trim()}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400/60">units</span>
                    </div>
                  </div>
                ) : (
                  <p className={`text-2xl
                    ${isAmberAlert ? 'text-amber-100' : 'text-gray-900 dark:text-white'}`}
                  >
                    {m.value}
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                {m.trend && !isAmberType ? (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full bg-opacity-10 
                    ${m.trendColor.replace('text-', 'bg-')} ${m.trendColor}`}
                  >
                    {m.trend}
                  </span>
                ) : (
                  <div className="h-4" />
                )}
                
                {isAmberAlert && (
                  <div className="flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-500" />
                    <span className="w-1 h-1 rounded-full bg-amber-500/30" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
