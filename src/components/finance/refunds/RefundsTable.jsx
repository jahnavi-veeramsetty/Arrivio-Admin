import { Search, MoreVertical, Filter, ArrowUpRight } from 'lucide-react';

export default function RefundsTable({ refunds, onViewDetail }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4 bg-amber-50/10">
        <div className="flex items-center gap-4 flex-grow max-w-xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by tenant or reason..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>
          <select className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-xs font-bold px-4 py-2 text-gray-600 focus:ring-2 focus:ring-amber-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Succeeded</option>
            <option>Failed</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-amber-100 rounded-xl text-xs font-black uppercase tracking-widest text-amber-700 hover:bg-amber-50 transition-colors shadow-sm shadow-amber-100/20">
            <Filter size={14} /> Pending Only
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30 dark:bg-gray-900/10">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Refund ID</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tenant</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reason</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Initiated By</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stripe Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {refunds.map((refund, index) => (
              <tr
                key={index}
                className="hover:bg-amber-50/20 dark:hover:bg-amber-900/10 transition-colors group cursor-pointer"
                onClick={() => onViewDetail(refund)}
              >
                <td className="px-6 py-4">
                  <span className="text-[11px] font-mono font-bold text-gray-400 group-hover:text-amber-600 transition-colors">{refund.id}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{refund.tenant}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[11px] font-bold text-gray-500 italic">"{refund.reason}"</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-black text-amber-600">€{refund.amount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">{refund.admin}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    refund.status === 'Succeeded'
                      ? 'bg-green-50 text-green-700 border-green-100'
                      : refund.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                        : 'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {refund.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {refund.status === 'Pending' && (
                      <button className="p-2 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-all">
                        <ArrowUpRight size={14} />
                      </button>
                    )}
                    <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-colors">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
