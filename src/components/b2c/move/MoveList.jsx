import { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, CalendarDays, List, Check, Clock, MessageSquare } from 'lucide-react';

const statusBadge = {
  Scheduled:  'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  Confirmed:  'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Completed:  'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

// Simple week grid for calendar view
function getWeekDays() {
  const start = new Date('2025-03-22');
  return Array.from({length:7}, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0,10);
  });
}

function CalendarView({ events, canAction, showToast }) {
  const days = getWeekDays();
  const eventsByDay = {};
  days.forEach(d => { eventsByDay[d] = events.filter(e => e.date === d); });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(d => (
        <div key={d} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-2 min-h-[100px]">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2">
            {new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}
          </p>
          {eventsByDay[d].map(e => (
            <div key={e.id} className={`text-[10px] font-semibold px-1.5 py-1 rounded mb-1 ${
              e.type === 'Move-in' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {e.type === 'Move-in' ? '▼' : '▲'} {e.tenant.split(' ')[0]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function MoveList({ events, canAction, showToast }) {
  const [view, setView] = useState('list');
  const [localEvents, setLocalEvents] = useState(events);

  const update = (id, status, toast) => {
    setLocalEvents(prev => prev.map(e => e.id === id ? {...e, status} : e));
    showToast(toast, 'success');
  };

  return (
    <div className="space-y-4">
      {/* View toggle */}
      <div className="flex items-center gap-2">
        <button onClick={() => setView('list')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            view === 'list' ? 'bg-[#1a6644] text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
          <List size={13} /> List
        </button>
        <button onClick={() => setView('calendar')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            view === 'calendar' ? 'bg-[#1a6644] text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
          <CalendarDays size={13} /> Calendar
        </button>
      </div>

      {view === 'calendar' ? (
        <CalendarView events={localEvents} canAction={canAction} showToast={showToast} />
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-50 dark:divide-gray-700">
            {localEvents.map(e => (
              <div key={e.id} className="flex items-center gap-4 px-4 py-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  e.type === 'Move-in' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'
                }`}>
                  {e.type === 'Move-in'
                    ? <ArrowDownToLine size={15} className="text-green-600 dark:text-green-400" />
                    : <ArrowUpFromLine  size={15} className="text-red-500 dark:text-red-400" />
                  }
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{e.tenant}</p>
                  <p className="text-xs text-gray-400">{e.unit} · {e.property} · {e.city}</p>
                </div>
                <div className="text-right flex-shrink-0 mr-3">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{e.type}</p>
                  <p className="text-[10px] text-gray-400">{e.date}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusBadge[e.status]}`}>{e.status}</span>
                {canAction && e.status !== 'Completed' && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {e.status === 'Scheduled' && (
                      <button onClick={() => update(e.id,'Confirmed','Reminder sent to tenant.')}
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors" title="Confirm">
                        <Clock size={12} />
                      </button>
                    )}
                    {e.status === 'Confirmed' && (
                      <button onClick={() => update(e.id,'Completed', e.type==='Move-in' ? 'Community App access activated.' : 'Security deposit review triggered.')}
                        className="p-1.5 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 transition-colors" title="Complete">
                        <Check size={12} />
                      </button>
                    )}
                    <button onClick={() => showToast('Internal note saved.', 'success')}
                      className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 hover:bg-gray-100 transition-colors" title="Add note">
                      <MessageSquare size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
