// src/components/dashboard/super/ApplicationFunnel.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

export default function ApplicationFunnel({ data }) {
  // We use a custom CSS bar list for a premium minimalist feel
  const colors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm p-6 transition-colors h-full flex flex-col">
      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8">Application Pipeline</p>

      <div className="flex-grow flex flex-col justify-around space-y-10 py-2">
        {data.map((item, idx) => {
          const total = data[0].count;
          const pctOfTotal = Math.round((item.count / total) * 100);
          
          return (
            <div key={item.stage} className="space-y-2 group animate-slide-up" style={{ animationDelay: `${idx * 60}ms` }}>
              <div className="flex justify-between items-end px-1">
                <span className="text-sm text-gray-600 dark:text-gray-300 tracking-tight">{item.stage}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-800 dark:text-gray-100 tabular-nums">{item.count}</span>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                    {idx === 0 ? 'Total' : `${pctOfTotal}% of total`}
                  </span>
                </div>
              </div>

              {/* Bar Track & Fill */}
            <div className="relative h-2 w-full bg-gray-50 dark:bg-gray-800/50 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: colors[idx % colors.length]
                }}
              />
            </div>
          </div>
        );
      })}
    </div>


    </div>
  );
}
