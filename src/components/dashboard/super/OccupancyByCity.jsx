import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function OccupancyByCity({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const getBarColor = (rate) => {
    if (rate >= 85) return '#10b981';
    if (rate >= 70) return '#db5517ff';
    return '#ef4444';
  };

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-10">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap">Occupancy</p>

        <div className="flex items-center gap-4">
          {/* Custom Dropdown Trigger */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <span className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-gray-400">Germany</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="p-1 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-1 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-20 rounded-full transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow space-y-7">
        {paginatedData.map((item, idx) => (
          <div key={item.city} className="space-y-2 group animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className="flex justify-between items-end px-1">
              <span className="text-sm text-gray-600 dark:text-gray-300 tracking-tight">{item.city}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">{item.rate}%</span>
            </div>

            {/* Bar Track & Fill */}
            <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-800/50 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${item.rate}%`,
                  backgroundColor: getBarColor(item.rate)
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage
              ? 'bg-emerald-500 w-6'
              : 'bg-gray-200 dark:bg-gray-800 w-1.5 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
