import { User, MoreVertical } from 'lucide-react';

const STATUS_COLORS = {
  'Housing Confirmed': 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
  'Move-in Scheduled': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900',
  'Lease Active': 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900',
  'Awaiting Visa Clearance': 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900',
};

export default function EmployeesTable({ employees, onRowClick }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Room / Building</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Move-in Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Lease Duration</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group"
                onClick={() => onRowClick(employee)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 font-bold group-hover:bg-[#1a6644] group-hover:text-white transition-colors">
                      <User size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{employee.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium">{employee.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{employee.company}</div>
                  <div className="text-[10px] text-gray-400">{employee.city}</div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-300">{employee.roomBuilding}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{employee.moveInDate}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{employee.leaseDuration}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border w-max ${STATUS_COLORS[employee.status]}`}>
                      {employee.status.toUpperCase()}
                    </span>
                    {employee.daysUntilStart && (
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                        {employee.daysUntilStart} days until start
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
