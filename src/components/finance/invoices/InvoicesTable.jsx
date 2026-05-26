import { Search, Plus, Send, MoreVertical, CheckCircle } from 'lucide-react';

export default function InvoicesTable({ invoices, onViewDetail, onAction }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4 bg-gray-50/30">
        <div className="flex items-center gap-4 flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search invoice or partner..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border-none rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-[#1a6644] transition-all"
            />
          </div>
          <select className="bg-white dark:bg-gray-900 border-none rounded-xl text-xs font-bold px-4 py-2 text-gray-600 shadow-sm focus:ring-2 focus:ring-[#1a6644]">
            <option>All Status</option>
            <option>Paid</option>
            <option>Sent</option>
            <option>Overdue</option>
            <option>Draft</option>
          </select>
        </div>

        <button
          onClick={() => onAction('generate')}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a6644] text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-[#155236] transition-all shadow-lg shadow-[#1a6644]/20 active:scale-95"
        >
          <Plus size={16} /> Batch Generate
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white dark:bg-gray-900/50">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Inv Number</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Partner</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Period</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Due Date</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {invoices.map((invoice, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer"
                onClick={() => onViewDetail(invoice)}
              >
                <td className="px-6 py-4">
                  <span className="text-[11px] font-mono font-bold text-gray-400 group-hover:text-[#1a6644] transition-colors">{invoice.id}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{invoice.partner}</p>
                </td>
                <td className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase">{invoice.period}</td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-black text-gray-900 dark:text-gray-100">€{invoice.amount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-[11px] font-bold text-gray-500">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    invoice.status === 'Paid'
                      ? 'bg-green-50 text-green-700 border-green-100'
                      : invoice.status === 'Overdue'
                        ? 'bg-red-50 text-red-700 border-red-100'
                        : invoice.status === 'Sent'
                          ? 'bg-blue-50 text-blue-700 border-blue-100'
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {invoice.status === 'Draft' ? (
                      <button
                        onClick={(event) => { event.stopPropagation(); onAction('send', invoice); }}
                        className="p-2 bg-gray-50 dark:bg-gray-700 rounded-xl text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                      >
                        <Send size={14} />
                      </button>
                    ) : (
                      <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-400 opacity-50 cursor-not-allowed" disabled>
                        <CheckCircle size={14} />
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
