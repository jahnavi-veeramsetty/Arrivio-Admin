import { Clock } from 'lucide-react';

export default function EmployeesAwaitingHousing({ employees }) {
  const unhoused = employees
    .filter(e => e.status === 'Awaiting Housing')
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 5);

  const getDaysUntil = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-tight">Employees Awaiting Housing</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-700 text-gray-400 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Employee</th>
              <th className="py-3 px-2">Company</th>
              <th className="py-3 px-2 text-center">Days Until Start</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {unhoused.map(e => {
              const days = getDaysUntil(e.startDate);
              const isUrgent = days < 7;
              
              return (
                <tr key={e.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-2">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{e.name}</div>
                    <div className="text-[10px] text-gray-400">{e.city}</div>
                  </td>
                  <td className="py-3 px-2 font-medium text-gray-600 dark:text-gray-400">{e.company}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg font-bold ${
                      isUrgent ? 'bg-red-50 text-red-600 dark:bg-red-900/30' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
                    }`}>
                      <Clock size={12} />
                      {days}d
                    </span>
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
