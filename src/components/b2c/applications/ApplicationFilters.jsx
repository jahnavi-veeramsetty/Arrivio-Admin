import { Search } from 'lucide-react';

const statuses  = ['All','Pending','In Review','Approved','Rejected','Action Required'];
const cities    = ['All','London','Dubai','Singapore'];
const reviewers = ['All','Sarah K.','Tom B.','Unassigned'];

export default function ApplicationFilters({ filters, onChange }) {
  const set = (key, val) => onChange({ ...filters, [key]: val });
  const inputCls = 'text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6644]/30';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-grow min-w-48">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className={`${inputCls} pl-8 w-full`}
          placeholder="Search applicant or ID…"
          value={filters.search}
          onChange={e => set('search', e.target.value)}
        />
      </div>

      <select className={inputCls} value={filters.status} onChange={e => set('status', e.target.value)}>
        {statuses.map(s => <option key={s}>{s}</option>)}
      </select>

      <select className={inputCls} value={filters.city} onChange={e => set('city', e.target.value)}>
        {cities.map(c => <option key={c}>{c}</option>)}
      </select>

      <select className={inputCls} value={filters.reviewer} onChange={e => set('reviewer', e.target.value)}>
        {reviewers.map(r => <option key={r}>{r}</option>)}
      </select>
    </div>
  );
}
