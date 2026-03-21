import { useState } from 'react';
import { Building2, Plus, CheckSquare } from 'lucide-react';

const statusBadge = {
  Available:   'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400',
  Occupied:    'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
  Reserved:    'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400',
  Maintenance: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-400',
};

function UnitDetail({ unit, canAction, onClose, showToast }) {
  if (!unit) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{unit.type} · Floor {unit.floor}</h2>
            <p className="text-xs text-gray-400">{unit.property} · {unit.city}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusBadge[unit.status]}`}>{unit.status}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Photo placeholder */}
          <div className="bg-gray-100 dark:bg-gray-800 h-40 rounded-xl flex items-center justify-center">
            <Building2 size={40} className="text-gray-300 dark:text-gray-600" />
          </div>

          {/* Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Unit Details</p>
            {[['Unit ID', unit.id], ['Monthly Rent', `£${unit.rent.toLocaleString()}`], ['Tenant', unit.tenant || '—'], ['Status', unit.status]].map(([k,v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{k}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{v}</span>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {unit.amenities.map(a => (
                <span key={a} className="flex items-center gap-1 text-xs bg-[#1a6644]/5 text-[#1a6644] border border-[#1a6644]/20 px-2.5 py-0.5 rounded-full">
                  <CheckSquare size={10} /> {a}
                </span>
              ))}
            </div>
          </div>

          {/* RBAC-gated actions */}
          {canAction && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => showToast('Unit assigned — rental agreement generation triggered.', 'success')}
                className="py-2.5 bg-[#1a6644] text-white text-sm font-semibold rounded-xl hover:bg-[#155236] transition-colors">
                Assign to Applicant
              </button>
              <button onClick={() => showToast('Unit details updated.', 'success')}
                className="py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                Edit Details
              </button>
              <button onClick={() => showToast('Availability status updated.', 'success')}
                className="col-span-2 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                Change Availability Status
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function UnitsTable({ units, canAction, showToast }) {
  const [selected, setSelected] = useState(null);

  const thCls = 'text-left text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 py-3';
  const tdCls = 'px-4 py-3 text-sm text-gray-700 dark:text-gray-300';

  return (
    <>
      {canAction && (
        <div className="flex justify-end">
          <button onClick={() => showToast('New unit form — coming soon.', 'success')}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a6644] text-white text-sm font-semibold rounded-xl hover:bg-[#155236] transition-colors">
            <Plus size={14} /> Add Unit
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className={thCls}>Type</th>
                <th className={thCls}>Property</th>
                <th className={thCls}>City</th>
                <th className={thCls}>Floor</th>
                <th className={thCls}>Status</th>
                <th className={thCls}>Monthly Rent</th>
                <th className={thCls}>Tenant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {units.map(unit => (
                <tr key={unit.id} onClick={() => setSelected(unit)}
                  className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                  <td className={tdCls}><span className="font-semibold text-gray-800 dark:text-gray-100">{unit.type}</span></td>
                  <td className={tdCls}>{unit.property}</td>
                  <td className={tdCls}>{unit.city}</td>
                  <td className={tdCls}>{unit.floor}</td>
                  <td className={tdCls}>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusBadge[unit.status]}`}>{unit.status}</span>
                  </td>
                  <td className={tdCls}>£{unit.rent.toLocaleString()}</td>
                  <td className={`${tdCls} text-gray-400 dark:text-gray-500`}>{unit.tenant || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UnitDetail unit={selected} canAction={canAction} onClose={() => setSelected(null)} showToast={showToast} />
    </>
  );
}
