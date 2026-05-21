import React, { useMemo, useState } from 'react';
import { Search, MapPin, Building2, ChevronDown, ArrowDownToLine, ArrowUpFromLine, Calendar } from 'lucide-react';

export default function MoveListView({ events }) {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [groupBy, setGroupBy] = useState('property'); // 'property' | 'date'

  // Filter Logic
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

  // Grouping Logic
  const flatRows = useMemo(() => {
    if (groupBy === 'property') {
      const groups = {};
      filteredEvents.forEach(event => {
        if (!groups[event.property]) {
          groups[event.property] = { name: event.property, city: event.city, address: event.address || 'Regional Location', units: {} };
        }
        if (!groups[event.property].units[event.unit]) {
          groups[event.property].units[event.unit] = { name: event.unit, events: [] };
        }
        groups[event.property].units[event.unit].events.push(event);
      });

      const rows = [];
      Object.values(groups).forEach(propGroup => {
        const propStartIndex = rows.length;
        Object.values(propGroup.units).forEach((unitGroup, uIdx) => {
          const unitStartIndex = rows.length;
          unitGroup.events.forEach((event, eIdx) => {
            rows.push({
              ...event,
              isFirstInProperty: uIdx === 0 && eIdx === 0,
              isFirstInUnit: eIdx === 0,
              unitEventCount: unitGroup.events.length,
              propertyAddress: propGroup.address
            });
          });
        });
        const propEventCount = rows.length - propStartIndex;
        if (rows[propStartIndex]) {
          rows[propStartIndex].propEventCount = propEventCount;
        }
      });
      return rows;
    } else {
      // Group by Date
      const dateGroups = {};
      [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(event => {
        if (!dateGroups[event.date]) {
          dateGroups[event.date] = { date: event.date, events: [] };
        }
        dateGroups[event.date].events.push(event);
      });

      const rows = [];
      Object.values(dateGroups).forEach(dateGroup => {
        const dateStartIndex = rows.length;
        dateGroup.events.forEach((event, eIdx) => {
          rows.push({
            ...event,
            isFirstInDate: eIdx === 0,
            dateEventCount: dateGroup.events.length
          });
        });
      });
      return rows;
    }
  }, [filteredEvents, groupBy]);

  const cities = ['All', ...new Set(events.map(e => e.city))];
  const types = ['All', ...new Set(events.map(e => e.propertyType))];

  const thCls = "px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left";
  const labelCls = "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block ml-1";
  const inputBase = "text-sm border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 outline-none hover:border-blue-500 shadow-sm transition-all focus:ring-2 focus:ring-blue-500/10";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Premium Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100/50 dark:border-gray-700/50 shadow-xl shadow-blue-900/5">
        <div className="md:col-span-4">
          <label className={labelCls}>Search Transitions</label>
          <div className="relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search by property, tenant or unit..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-900/50 border border-transparent rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-200 outline-none hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-900/30 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-inner transition-all placeholder:text-gray-400 placeholder:font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Sort By</label>
          <div className="relative group">
            <select
              className="w-full pl-4 pr-10 py-3.5 bg-gray-50/50 dark:bg-gray-900/50 border border-transparent rounded-2xl text-sm font-bold text-blue-600 dark:text-blue-400 appearance-none cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-inner transition-all outline-none"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="property">Property wise</option>
              <option value="date">Date wise</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none group-hover:translate-y-[-40%] transition-transform" />
          </div>
        </div>
        <div className="md:col-span-3">
          <label className={labelCls}>City</label>
          <div className="relative group">
            <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 pointer-events-none transition-colors" />
            <select
              className="w-full pl-11 pr-10 py-3.5 bg-gray-50/50 dark:bg-gray-900/50 border border-transparent rounded-2xl text-sm font-semibold text-gray-600 dark:text-gray-300 appearance-none cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-inner transition-all outline-none"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:translate-y-[-40%] transition-transform" />
          </div>
        </div>
        <div className="md:col-span-3">
          <label className={labelCls}>Unit Type</label>
          <div className="relative group">
            <Building2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 pointer-events-none transition-colors" />
            <select
              className="w-full pl-11 pr-10 py-3.5 bg-gray-50/50 dark:bg-gray-900/50 border border-transparent rounded-2xl text-sm font-semibold text-gray-600 dark:text-gray-300 appearance-none cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-inner transition-all outline-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:translate-y-[-40%] transition-transform" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className={thCls + " w-[180px]"}>{groupBy === 'property' ? 'Property' : 'Date'}</th>
                {groupBy === 'date' && <th className={thCls + " w-[180px]"}>Property</th>}
                <th className={thCls + " w-[120px]"}>Unit</th>
                <th className={thCls}>Tenant</th>
                <th className={thCls}>Transition</th>
                {groupBy === 'property' && <th className={thCls}>Date</th>}
                <th className={thCls}>Status</th>
                <th className={thCls}>Checklist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {flatRows.length > 0 ? (
                flatRows.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors">
                    {/* First Column (Property or Date Group) */}
                    {groupBy === 'property' ? (
                      row.isFirstInProperty && (
                        <td
                          rowSpan={row.propEventCount}
                          className="px-6 py-6 align-top border-l-4 border-blue-600 bg-white dark:bg-gray-800"
                        >
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                            {row.property}
                          </h4>
                          <div className="mt-2 flex items-start gap-1 text-gray-400">
                            <MapPin size={10} className="mt-0.5 shrink-0" />
                            <span className="text-[10px] leading-tight italic">{row.city} · {row.propertyType}</span>
                          </div>
                        </td>
                      )
                    ) : (
                      row.isFirstInDate && (
                        <td
                          rowSpan={row.dateEventCount}
                          className="px-6 py-6 align-top border-l-4 border-emerald-600 bg-white dark:bg-gray-800"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar size={12} className="text-emerald-600" />
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                              {new Date(row.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                          <h4 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                            {new Date(row.date).getDate()}
                          </h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">{new Date(row.date).toLocaleDateString('en-GB', { weekday: 'long' })}</p>
                        </td>
                      )
                    )}

                    {/* Property Column in Date mode */}
                    {groupBy === 'date' && (
                      <td className="px-6 py-6 border-l border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{row.property}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{row.city}</p>
                      </td>
                    )}

                    {/* Unit Cell */}
                    {(groupBy === 'date' || row.isFirstInUnit) && (
                      <td
                        rowSpan={groupBy === 'property' ? row.unitEventCount : 1}
                        className={`px-4 py-6 align-top border-l border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800`}
                      >
                        <div className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/20 rounded-lg text-center">
                          <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase">
                            Unit {row.unit}
                          </span>
                        </div>
                      </td>
                    )}

                    {/* Details Rows */}
                    <td className="px-6 py-6 text-sm font-semibold text-gray-900 dark:text-white">
                      {row.tenant}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${row.type === 'Move-in' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${row.type === 'Move-in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {row.type}
                        </span>
                      </div>
                    </td>
                    {groupBy === 'property' && (
                      <td className="px-6 py-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    )}
                    <td className="px-6 py-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        row.status === 'Completed' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      {row.checklist ? (
                        <div className="flex items-center gap-3 w-32">
                          <div className="flex-grow bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${(row.checklist.done / row.checklist.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{row.checklist.done}/{row.checklist.total}</span>
                        </div>
                      ) : <span className="text-gray-300">--</span>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={groupBy === 'property' ? 7 : 8} className="py-24 text-center">
                    <p className="text-gray-400 italic">No transition events match your filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
