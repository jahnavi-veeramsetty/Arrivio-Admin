import { mockApplications } from '../../../mockdata/b2cData';
import { Clock } from 'lucide-react';

const oldest = [...mockApplications]
  .filter(a => a.status === 'Pending')
  .sort((a, b) => b.days - a.days)
  .slice(0, 5);

export default function OldestPending() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
      <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
        <Clock size={14} className="text-amber-500" />
        Oldest Pending Applications
      </h2>
      <div className="space-y-0 divide-y divide-gray-50 dark:divide-gray-700">
        {oldest.map(app => (
          <div key={app.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{app.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{app.city} · {app.id}</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              (app.days * 24) > 24 ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {Math.round(app.days * 24)}h waiting
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
