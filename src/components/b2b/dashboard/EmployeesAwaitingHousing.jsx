import { Clock } from 'lucide-react';

export default function EmployeesAwaitingHousing({ employees }) {
  const pipeline = employees
    .filter((employee) => employee.daysUntilStart)
    .sort((left, right) => left.daysUntilStart - right.daysUntilStart)
    .slice(0, 6);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-tight">Pipeline Move-ins</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-700 text-gray-400 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Company</th>
              <th className="py-3 px-2 text-center">Days Until Start</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {pipeline.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-2">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{employee.name}</div>
                  <div className="text-[10px] text-gray-400">{employee.city}</div>
                </td>
                <td className="py-3 px-2 font-medium text-gray-600 dark:text-gray-400">{employee.company}</td>
                <td className="py-3 px-2 text-center">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg font-bold bg-blue-50 text-blue-600 dark:bg-blue-900/30">
                    <Clock size={12} />
                    {employee.daysUntilStart}d
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
