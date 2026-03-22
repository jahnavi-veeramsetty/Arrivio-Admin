import { Search, Filter, MapPin, User, LayoutGrid, RotateCcw } from 'lucide-react';

export default function DocumentFilters({ filters, onChange, statuses, cities, reviewers, onReset }) {
  const set = (key, val) => onChange({ ...filters, [key]: val });
  
  const labelCls = "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1";
  const inputCls = 'text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6644]/30 w-full transition-all hover:border-gray-300 dark:hover:border-gray-600 shadow-sm';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end bg-gray-50/50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
      {/* Search */}
      <div className="md:col-span-1 lg:col-span-2">
        <label className={labelCls}>Search Documents</label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className={`${inputCls} pl-9`}
            placeholder="Search applicant or ID…"
            value={filters.search}
            onChange={e => set('search', e.target.value)}
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className={labelCls}>Status</label>
        <div className="relative">
          <LayoutGrid size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select 
            className={`${inputCls} pl-9 appearance-none cursor-pointer`} 
            value={filters.status} 
            onChange={e => set('status', e.target.value)}
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* City */}
      <div>
        <label className={labelCls}>City</label>
        <div className="relative">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select 
            className={`${inputCls} pl-9 appearance-none cursor-pointer`} 
            value={filters.city} 
            onChange={e => set('city', e.target.value)}
          >
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Reviewer */}
      <div>
        <label className={labelCls}>Reviewer</label>
        <div className="relative">
          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select 
            className={`${inputCls} pl-9 appearance-none cursor-pointer`} 
            value={filters.reviewer} 
            onChange={e => set('reviewer', e.target.value)}
          >
            {reviewers.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Reset */}
      <div className="flex items-center">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
        >
          <RotateCcw size={14} />
          Reset Data
        </button>
      </div>
    </div>
  );
}
