import { useState } from 'react';
import { ChevronUp, ChevronDown, Download, UserCheck } from 'lucide-react';

const statusBadge = {
  'Pending':         'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
  'In Review':       'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
  'Approved':        'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400',
  'Rejected':        'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400',
  'Action Required': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400',
};

export default function ApplicationsTable({ apps, onSelect, canAction, showToast }) {
  const [sortKey,  setSortKey]  = useState('days');
  const [sortDir,  setSortDir]  = useState('desc');
  const [selected, setSelected] = useState([]);

  const sorted = [...apps].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === sorted.length ? [] : sorted.map(a => a.id));

  const sortIcon = (key) => sortKey === key
    ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
    : <ChevronDown size={12} className="opacity-30" />;

  const setSort = (key) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('desc'); } };

  const thCls = 'text-left text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 py-3 cursor-pointer select-none hover:text-gray-600 dark:hover:text-gray-300';
  const tdCls = 'px-3 py-3 text-sm text-gray-700 dark:text-gray-300';

  return (
    <div>
      {/* Bulk actions */}
      {selected.length > 0 && canAction && (
        <div className="flex items-center gap-3 mb-3 px-4 py-2.5 bg-[#1a6644]/5 dark:bg-[#1a6644]/10 border border-[#1a6644]/20 rounded-xl">
          <span className="text-sm font-semibold text-[#1a6644]">{selected.length} selected</span>
          <button onClick={() => showToast(`Assigned reviewer to ${selected.length} apps`, 'success')} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-[#1a6644] transition-colors">
            <UserCheck size={13} /> Assign reviewer
          </button>
          <button onClick={() => showToast('Exporting CSV…', 'success')} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-[#1a6644] transition-colors">
            <Download size={13} /> Export CSV
          </button>
          <button onClick={() => setSelected([])} className="ml-auto text-xs text-gray-400 hover:text-gray-600">Clear</button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-700">
              <tr>
                {canAction && (
                  <th className="px-3 py-3 w-8">
                    <input type="checkbox" checked={selected.length === sorted.length && sorted.length > 0} onChange={toggleAll}
                      className="rounded border-gray-300 dark:border-gray-600 text-[#1a6644] focus:ring-[#1a6644]" />
                  </th>
                )}
                <th className={thCls} onClick={() => setSort('name')}>Applicant {sortIcon('name')}</th>
                <th className={thCls}>Unit</th>
                <th className={thCls} onClick={() => setSort('city')}>City {sortIcon('city')}</th>
                <th className={thCls} onClick={() => setSort('submitted')}>Submitted {sortIcon('submitted')}</th>
                <th className={thCls} onClick={() => setSort('status')}>Status {sortIcon('status')}</th>
                <th className={thCls}>Reviewer</th>
                <th className={thCls} onClick={() => setSort('days')}>Days {sortIcon('days')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {sorted.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-12 text-sm text-gray-400">No applications match the current filters.</td></tr>
              ) : sorted.map(app => (
                <tr
                  key={app.id}
                  onClick={() => onSelect(app)}
                  className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                  {canAction && (
                    <td className="px-3 py-3 w-8" onClick={e => { e.stopPropagation(); toggle(app.id); }}>
                      <input type="checkbox" checked={selected.includes(app.id)} onChange={() => toggle(app.id)}
                        className="rounded border-gray-300 dark:border-gray-600 text-[#1a6644] focus:ring-[#1a6644]" />
                    </td>
                  )}
                  <td className={tdCls}>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{app.name}</p>
                    <p className="text-xs text-gray-400">{app.id}</p>
                  </td>
                  <td className={tdCls}>{app.unit}</td>
                  <td className={tdCls}>{app.city}</td>
                  <td className={tdCls}>{app.submitted}</td>
                  <td className={tdCls}>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusBadge[app.status] || ''}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className={`${tdCls} text-gray-500 dark:text-gray-400`}>{app.reviewer}</td>
                  <td className={tdCls}>
                    <span className={`text-xs font-bold ${app.days > 20 ? 'text-red-600 dark:text-red-400' : app.days > 10 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500'}`}>
                      {app.days}d
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
