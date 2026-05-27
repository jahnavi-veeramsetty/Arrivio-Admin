import { CheckCircle2 } from 'lucide-react';

const STATUS_COLORS = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900',
  Paid: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900',
};

export default function ServiceFeesTable({ serviceFees, onProcessPayment }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Snapshot Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Due Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {serviceFees.map((serviceFee) => (
              <tr key={serviceFee.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{serviceFee.category}</div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{serviceFee.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{serviceFee.agency}</div>
                  <div className="text-[10px] text-gray-400">{serviceFee.tenant}</div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 font-medium">{serviceFee.moveIn}</td>
                <td className="px-6 py-4 text-right">
                  <div className="text-sm font-black text-[#1a6644]">€{serviceFee.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-[11px] font-bold text-gray-600 dark:text-gray-400">{serviceFee.dueDate}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${STATUS_COLORS[serviceFee.status]}`}>
                    {serviceFee.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {serviceFee.status === 'Pending' ? (
                    <button
                      onClick={() => onProcessPayment(serviceFee)}
                      className="px-3 py-1.5 bg-[#1a6644] text-white text-[10px] font-bold rounded-lg hover:bg-[#155236] transition-colors uppercase tracking-tight"
                    >
                      Mark Paid
                    </button>
                  ) : (
                    <CheckCircle2 size={16} className="text-green-500 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
