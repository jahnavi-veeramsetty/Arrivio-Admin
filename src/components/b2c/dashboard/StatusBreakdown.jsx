import { statusBreakdown } from '../../../mockdata/b2cData';

const total = Object.values(statusBreakdown).reduce((s, v) => s + v.count, 0);

export default function StatusBreakdown() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
      <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Applications by Status</h2>

      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-0.5">
        {Object.entries(statusBreakdown).map(([label, {count, color}]) => (
          <div key={label} style={{ width:`${(count/total)*100}%`, background:color }} title={`${label}: ${count}`} />
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {Object.entries(statusBreakdown).map(([label, {count, color}]) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${(count/total)*100}%`, background:color }} />
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-4 text-right">{count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
