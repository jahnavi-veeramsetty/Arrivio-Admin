import { mockMoveEvents } from '../../../mockdata/b2cData';
import { CalendarDays, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

// Group by property
const byProperty = mockMoveEvents.reduce((acc, e) => {
  if (!acc[e.property]) acc[e.property] = [];
  acc[e.property].push(e);
  return acc;
}, {});

export default function WeekSchedule() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5">
      <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
        <CalendarDays size={14} className="text-[#1a6644]" />
        This Week's Schedule
      </h2>
      <div className="space-y-4">
        {Object.entries(byProperty).map(([property, events]) => (
          <div key={property}>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">{property}</p>
            <div className="space-y-1.5">
              {events.map(e => (
                <div key={e.id} className="flex items-center gap-2.5">
                  {e.type === 'Move-in'
                    ? <ArrowDownToLine size={13} className="text-green-500 flex-shrink-0" />
                    : <ArrowUpFromLine  size={13} className="text-red-400 flex-shrink-0"  />
                  }
                  <span className="text-xs text-gray-700 dark:text-gray-300 flex-grow truncate">{e.tenant} · {e.unit}</span>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{e.date.slice(5)}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                    e.status === 'Confirmed'
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                  }`}>{e.status}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
