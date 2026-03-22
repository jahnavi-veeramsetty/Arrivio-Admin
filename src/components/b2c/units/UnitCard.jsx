export default function UnitCard({ unit, onClick }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Occupied': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50';
      case 'Available': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800/50';
      case 'Reserved': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-800/50';
      case 'Maintenance': return 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400 border-rose-100 dark:border-rose-800/50';
      default: return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400 border-gray-100 dark:border-gray-800/50';
    }
  };

  return (
    <div
      onClick={() => onClick(unit.id)}
      className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all cursor-pointer group animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight leading-tight mb-1">Unit {unit.id}</h3>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{unit.type}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(unit.status)}`}>
          {unit.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Monthly Rent</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">${unit.rent.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Floor Level</span>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{unit.floor}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 dark:border-gray-700/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
            {unit.tenant ? unit.tenant.name.split(' ').map(n => n[0]).join('') : '--'}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Current Occupant</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
              {unit.tenant ? unit.tenant.name : <span className="text-gray-400 font-normal italic">No Tenant Assigned</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
