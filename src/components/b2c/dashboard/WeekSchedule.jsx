import { useState } from 'react';
import { mockMoveEvents } from '../../../mockdata/b2cData';
import { CalendarDays, List, Calendar, ArrowDown, ArrowUp } from 'lucide-react';

export default function WeekSchedule() {
  const [view, setView] = useState('calendar'); // 'list' | 'calendar'

  // Group by property (for list view)
  const byProperty = mockMoveEvents.reduce((acc, e) => {
    if (!acc[e.property]) acc[e.property] = [];
    acc[e.property].push(e);
    return acc;
  }, {});

  // Group by date (for calendar view) - next 7 days from Mar 22
  const dates = ['2025-03-22', '2025-03-23', '2025-03-24', '2025-03-25', '2025-03-26', '2025-03-27', '2025-03-28'];
  const byDate = dates.reduce((acc, d) => {
    acc[d] = mockMoveEvents.filter(e => e.date === d);
    return acc;
  }, {});

  const formatDate = (d) => {
    const parts = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${parts[2]} ${months[parseInt(parts[1]) - 1]}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 uppercase tracking-wider">
          <CalendarDays size={14} className="text-[#1a6644]" />
          This Week's Schedule
        </h2>

        {/* Toggle */}
        <div className="flex p-1 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'list'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
          >
            <List size={14} /> List
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'calendar'
                ? 'bg-[#1a6644] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
          >
            <Calendar size={14} /> Calendar
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-3">
          {dates.map(date => (
            <div key={date} className="bg-gray-50/30 dark:bg-white/5 border border-gray-100/50 dark:border-gray-700/50 rounded-xl p-3 min-h-[140px] flex flex-col">
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-3">{formatDate(date)}</p>
              <div className="space-y-2 flex-grow">
                {byDate[date].map(e => (
                  <div
                    key={e.id}
                    className={`flex items-start gap-2 p-2 rounded-xl transition-all hover:bg-white dark:hover:bg-white/10 shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700 cursor-pointer group/item ${e.type === 'Move-in'
                        ? 'bg-emerald-50/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : 'bg-red-50/50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
                      }`}
                  >
                    {e.type === 'Move-in' ? (
                      <ArrowUp size={12} strokeWidth={3} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <ArrowDown size={12} strokeWidth={3} className="text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[11px] font-bold truncate leading-tight">{e.tenant.split(' ')[0]}</span>
                        <span className={`text-[8px] font-bold px-1 rounded ${e.checklist && e.checklist.done === e.checklist.total ? 'bg-emerald-500/20 text-emerald-600' : 'bg-gray-500/10 text-gray-500'}`}>
                          {e.checklist ? `${e.checklist.done}/${e.checklist.total}` : ''}
                        </span>
                      </div>
                      <p className="text-[9px] opacity-70 truncate leading-tight mt-0.5">
                        {e.unit} · {e.property.split(' ').pop()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(byProperty).map(([property, events]) => (
            <div key={property}>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{property}</p>
              <div className="space-y-2">
                {events.map(e => (
                  <div key={e.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <div className="flex items-center gap-2 w-20">
                      {e.type === 'Move-in' ? (
                        <ArrowUp size={12} strokeWidth={3} className="text-emerald-500 flex-shrink-0" />
                      ) : (
                        <ArrowDown size={12} strokeWidth={3} className="text-red-500 flex-shrink-0" />
                      )}
                      <span className={`text-[10px] font-bold uppercase tracking-tight ${e.type === 'Move-in' ? 'text-emerald-600' : 'text-red-600'}`}>{e.type}</span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-grow">{e.tenant} · <span className="text-gray-400">{e.unit}</span></span>
                    <span className="text-xs text-gray-400 tabular-nums">{formatDate(e.date)}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{e.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
