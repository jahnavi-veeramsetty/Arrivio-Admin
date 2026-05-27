import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Building2, MapPin, ArrowDownToLine, ArrowUpFromLine, X } from 'lucide-react';
import { DEMO_TODAY } from '../../../mockdata/demoClock';

export default function MoveCalendar({ events }) {
  const [currentDate, setCurrentDate] = useState(new Date(DEMO_TODAY));
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Handle Escape Key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Month Navigation
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  // Calendar Logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calendarDays = useMemo(() => {
    const days = [];
    // Padding for start of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    return days;
  }, [currentDate, daysInMonth, firstDayOfMonth]);

  // Filters
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchSearch = e.tenant.toLowerCase().includes(search.toLowerCase()) || 
                          e.property.toLowerCase().includes(search.toLowerCase()) ||
                          e.unit.toLowerCase().includes(search.toLowerCase());
      const matchCity = cityFilter === 'All' || e.city === cityFilter;
      const matchType = typeFilter === 'All' || e.propertyType === typeFilter;
      return matchSearch && matchCity && matchType;
    });
  }, [events, search, cityFilter, typeFilter]);

  // Lists for dropdowns
  const cities = ['All', ...new Set(events.map(e => e.city))];
  const types = ['All', ...new Set(events.map(e => e.propertyType))];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search tenant, property, or unit..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 lg:flex-none lg:w-48">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select 
              className="w-full pl-11 pr-10 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 appearance-none focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>)}
            </select>
          </div>
          <div className="relative flex-1 lg:flex-none lg:w-48">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select 
              className="w-full pl-11 pr-10 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 appearance-none focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col min-h-[800px]">
        {/* Calendar Header */}
        <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-3">
            <button onClick={prevMonth} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentDate(new Date(DEMO_TODAY))} className="px-5 py-2.5 bg-gray-50 dark:bg-gray-900 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all">
              Today
            </button>
            <button onClick={nextMonth} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-50 dark:border-gray-700/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-grow">
          {calendarDays.map((day, idx) => {
            const dateStr = formatDate(day);
            const dayEvents = dateStr ? filteredEvents.filter(e => e.date === dateStr) : [];
            const isToday = day && formatDate(day) === formatDate(DEMO_TODAY);

            return (
              <div 
                key={idx} 
                className={`min-h-[160px] p-4 border-r border-b border-gray-50 dark:border-gray-700/30 last:border-r-0 relative group transition-colors hover:bg-gray-50/30 dark:hover:bg-gray-900/20 ${!day ? 'bg-gray-50/20 dark:bg-gray-900/10' : ''}`}
              >
                {day && (
                  <>
                    <span className={`text-sm font-bold ${isToday ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 w-7 h-7 flex items-center justify-center rounded-lg -ml-1 -mt-1 shadow-sm' : 'text-gray-400'}`}>
                      {day.getDate()}
                    </span>
                    <div className="mt-3 space-y-2">
                      {dayEvents.map(e => (
                        <div 
                          key={e.id} 
                          onClick={() => setSelectedEvent(e)}
                          className={`p-3 rounded-2xl border shadow-sm transition-all hover:shadow-md cursor-pointer group/event active:scale-[0.98] ${
                            e.type === 'Move-in' 
                            ? 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50' 
                            : 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              e.type === 'Move-in' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {e.type}
                            </span>
                            {e.type === 'Move-in' ? (
                              <ArrowDownToLine className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <ArrowUpFromLine className="w-3 h-3 text-rose-600" />
                            )}
                          </div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate mb-0.5">{e.tenant}</p>
                          <p className="text-[10px] font-semibold text-gray-500 truncate leading-tight">{e.property}</p>
                          <p className="text-[10px] font-bold text-blue-600/70 dark:text-blue-400/70 mt-1">Unit {e.unit}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-8 pb-6 flex items-center justify-between ${
              selectedEvent.type === 'Move-in' ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : 'bg-rose-50/30 dark:bg-rose-900/10'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  selectedEvent.type === 'Move-in' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {selectedEvent.type === 'Move-in' ? <ArrowDownToLine size={24} /> : <ArrowUpFromLine size={24} />}
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1 inline-block ${
                    selectedEvent.type === 'Move-in' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {selectedEvent.type}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-none">{selectedEvent.tenant}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-3 hover:bg-white/50 dark:hover:bg-gray-700 rounded-2xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Persona Name</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedEvent.tenant}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Scheduled Date</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{new Date(selectedEvent.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Email Address</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{selectedEvent.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Phone Number</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedEvent.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Property Name</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedEvent.property}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Unit Number</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Unit {selectedEvent.unit}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 dark:border-gray-700/50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Event Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedEvent.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}></div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest">{selectedEvent.status}</span>
                </div>
              </div>

              {selectedEvent.checklist && (
                <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Move Requirements</p>
                    <span className="text-[10px] font-bold text-emerald-600">{selectedEvent.checklist.done}/{selectedEvent.checklist.total} Done</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${(selectedEvent.checklist.done / selectedEvent.checklist.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="space-y-2 pt-2">
                    {selectedEvent.checklist.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          item.includes('✓') || selectedEvent.checklist.done > i ? 'bg-emerald-100 text-emerald-600' : 'border-2 border-gray-100'
                        }`}>
                          {(item.includes('✓') || selectedEvent.checklist.done > i) && <span className="text-[8px]">✓</span>}
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{item.replaceAll('✓', '').trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4">
                <button className="w-full py-4 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] border border-gray-100 dark:border-gray-700 active:scale-95 transition-all">
                  Send Note to Tenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
