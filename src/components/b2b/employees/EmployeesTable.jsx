import { MapPin, Home, Clock, CheckCircle2, XCircle, User, MoreVertical, AlertTriangle } from 'lucide-react';

const STATUS_COLORS = {
  'Awaiting Housing': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900',
  Housed: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900',
  Departed: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
};

export default function EmployeesTable({ employees, onRowClick }) {
  const getDaysUntilStart = (startDate) => {
    const diff = new Date(startDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Employee Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Company & City</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Unit Assigned</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Lease End</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {employees.map((e) => {
              const daysUntil = getDaysUntilStart(e.startDate);
              const isUrgent = e.status === 'Awaiting Housing' && daysUntil < 7;
              
              return (
                <tr 
                  key={e.id} 
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group"
                  onClick={() => onRowClick(e)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 font-bold group-hover:bg-[#1a6644] group-hover:text-white transition-colors">
                        <User size={14} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{e.name}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{e.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{e.company}</div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <MapPin size={10} /> {e.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {e.unit === 'Unassigned' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                        <Home size={10} /> UNASSIGNED
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{e.unit}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border w-max ${STATUS_COLORS[e.status]}`}>
                        {e.status.toUpperCase()}
                      </span>
                      {isUrgent && (
                        <span className="flex items-center gap-1 text-[9px] font-black text-red-500 uppercase tracking-tighter">
                          <AlertTriangle size={10} /> Start in {daysUntil}d
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <Clock size={12} />
                      {e.status === 'Departed' ? 'N/A' : new Date(e.leaseEnd).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
