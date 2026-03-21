import { useState } from 'react';
import UnitsTable from '../../components/b2c/units/UnitsTable';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { mockUnits } from '../../mockdata/b2cData';

const cities   = ['All','London','Dubai','Singapore'];
const types    = ['All','Studio','1BR','2BR'];
const statuses = ['All','Available','Occupied','Reserved','Maintenance'];

export default function UnitsPage() {
  const canAction = useRole(['super_admin', 'ops_manager']);
  const { toasts, show, dismiss } = useToast();

  const [city,   setCity]   = useState('All');
  const [type,   setType]   = useState('All');
  const [status, setStatus] = useState('All');

  const selectCls = 'text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none';

  const filtered = mockUnits.filter(u => {
    if (city   !== 'All' && u.city   !== city)   return false;
    if (type   !== 'All' && u.type   !== type)   return false;
    if (status !== 'All' && u.status !== status) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">B2C Applications → Units & Listings</p>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Units & Listings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Full unit inventory across all properties and cities. {filtered.length} units shown.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <select className={selectCls} value={city}   onChange={e => setCity(e.target.value)}>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className={selectCls} value={type}   onChange={e => setType(e.target.value)}>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
        <select className={selectCls} value={status} onChange={e => setStatus(e.target.value)}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <UnitsTable units={filtered} canAction={canAction} showToast={show} />
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
