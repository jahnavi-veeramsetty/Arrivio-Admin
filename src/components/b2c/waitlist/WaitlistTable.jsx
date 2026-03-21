import { useState } from 'react';
import { Bell, Trash2, ArrowRight, GripVertical } from 'lucide-react';

export default function WaitlistTable({ entries, canAction, isSuperAdmin, showToast }) {
  const [items, setItems] = useState(entries);
  const [dragIdx, setDragIdx] = useState(null);

  const notify = (id) => showToast(`Notification email sent to waitlist entry.`, 'success');
  const remove = (id) => { setItems(prev => prev.filter(w => w.id !== id)); showToast('Entry removed from waitlist.', 'warn'); };
  const convert = (id) => { setItems(prev => prev.filter(w => w.id !== id)); showToast('Entry converted to application — applicant notified.', 'success'); };

  const onDragStart  = (i) => setDragIdx(i);
  const onDrop       = (i) => {
    if (dragIdx === null || dragIdx === i) return;
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(i, 0, moved);
    setItems(next.map((x,idx) => ({...x, position: idx+1})));
    showToast('Waitlist reordered — logged to audit.', 'success');
    setDragIdx(null);
  };

  const thCls = 'text-left text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 py-3';
  const tdCls = 'px-4 py-3 text-sm text-gray-700 dark:text-gray-300';

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-100 dark:border-gray-700">
            <tr>
              {isSuperAdmin && <th className="px-4 py-3 w-8" />}
              <th className={thCls}>#</th>
              <th className={thCls}>Applicant</th>
              <th className={thCls}>Unit Type</th>
              <th className={thCls}>City</th>
              <th className={thCls}>Date Added</th>
              <th className={thCls}>Days Waiting</th>
              {canAction && <th className={thCls}>Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {items.map((w, i) => (
              <tr key={w.id}
                draggable={isSuperAdmin}
                onDragStart={() => onDragStart(i)}
                onDragOver={e => e.preventDefault()}
                onDrop={() => onDrop(i)}
                className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${isSuperAdmin ? 'cursor-grab active:cursor-grabbing' : ''}`}
              >
                {isSuperAdmin && (
                  <td className="px-4 py-3 w-8 text-gray-300 dark:text-gray-600"><GripVertical size={14} /></td>
                )}
                <td className={tdCls}>
                  <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center text-xs font-bold">
                    {w.position}
                  </span>
                </td>
                <td className={tdCls}><p className="font-semibold text-gray-800 dark:text-gray-100">{w.name}</p></td>
                <td className={tdCls}>{w.unitType}</td>
                <td className={tdCls}>{w.city}</td>
                <td className={tdCls}>{w.added}</td>
                <td className={tdCls}>
                  <span className={`text-xs font-bold ${w.days > 50 ? 'text-red-600 dark:text-red-400' : w.days > 30 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500'}`}>
                    {w.days}d
                  </span>
                </td>
                {canAction && (
                  <td className={tdCls}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => notify(w.id)} title="Notify" className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 hover:bg-blue-100 transition-colors">
                        <Bell size={12} />
                      </button>
                      <button onClick={() => convert(w.id)} title="Convert to application" className="p-1.5 rounded-lg bg-[#1a6644]/5 text-[#1a6644] hover:bg-[#1a6644]/10 transition-colors">
                        <ArrowRight size={12} />
                      </button>
                      <button onClick={() => remove(w.id)} title="Remove" className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
