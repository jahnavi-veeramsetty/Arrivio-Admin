// src/components/dashboard/super/SuperMetricCards.jsx
import React from 'react';

const flagStyle = {
  amber: 'bg-amber-50/50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/30 text-amber-900 dark:text-amber-400',
  red: 'bg-red-50/50 border-red-200 dark:bg-red-900/10 dark:border-red-900/30 text-red-900 dark:text-red-400',
  emerald: 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-400',
  neutral: 'bg-white dark:bg-[#0d1117] border-gray-100 dark:border-gray-800/50',
};

const labelStyle = {
  amber: 'text-amber-700 dark:text-amber-500/80',
  red: 'text-red-700 dark:text-red-500/80',
  emerald: 'text-emerald-700 dark:text-emerald-500/80',
  neutral: 'text-gray-400 dark:text-gray-500',
};

const valueStyle = {
  amber: 'text-amber-900 dark:text-amber-100',
  red: 'text-red-900 dark:text-red-100',
  emerald: 'text-emerald-900 dark:text-emerald-100',
  neutral: 'text-gray-900 dark:text-white',
};

export default function SuperMetricCards({ metrics }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => {
        const flag = metric.flag || 'neutral';

        return (
          <div key={index} className={`rounded-xl border p-4 transition-all duration-300 ${flagStyle[flag]}`}>
            <p className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-2 ${labelStyle[flag]}`}>
              {metric.label}
            </p>
            <p className={`text-2xl font-bold tracking-tight ${valueStyle[flag]}`}>
              {metric.value}
            </p>
            {metric.trend && (
              <div className="mt-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider opacity-70 ${labelStyle[flag]}`}>
                  {metric.trend}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
