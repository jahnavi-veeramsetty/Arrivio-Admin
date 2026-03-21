import { recentDecisions } from '../../../mockdata/b2cData';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function RecentDecisions() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
      <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Recent Decisions</h2>
      <div className="space-y-0 divide-y divide-gray-50 dark:divide-gray-700">
        {recentDecisions.map(d => (
          <div key={d.id} className="flex items-center gap-3 py-3">
            {d.decision === 'Approved'
              ? <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
              : <XCircle size={15} className="text-red-500 flex-shrink-0" />
            }
            <div className="flex-grow min-w-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{d.applicant}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">by {d.admin}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`text-xs font-bold ${d.decision === 'Approved' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {d.decision}
              </span>
              <p className="text-[10px] text-gray-400">{d.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
