import { AlertCircle, User, Phone, Mail } from 'lucide-react';

export default function OverdueInvoiceList({ invoices }) {
  const overdue = invoices.filter((invoice) => invoice.status === 'Overdue');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 flex items-center justify-between">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <AlertCircle size={14} className="text-red-500" /> Overdue Invoices
        </h3>
        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold uppercase">{overdue.length} Critical</span>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-700 overflow-y-auto flex-grow max-h-[300px]">
        {overdue.map((invoice, index) => (
          <div key={index} className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{invoice.partner}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{invoice.id} · {invoice.period}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-red-600">€{invoice.amount.toLocaleString()}</p>
                <p className="text-[9px] font-bold text-red-400 uppercase tracking-tight">{invoice.daysOverdue} Days Overdue</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-700/50 px-2 py-1 rounded-lg">
                <User size={12} /> Account Mgr
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-400 hover:text-[#1a6644] transition-colors shadow-sm">
                  <Phone size={12} />
                </button>
                <button className="p-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-400 hover:text-[#1a6644] transition-colors shadow-sm">
                  <Mail size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-[#1a6644] bg-gray-50/50 dark:bg-gray-900/20 hover:bg-[#1a6644]/5 transition-colors border-t border-gray-50 dark:border-gray-700">
        View All Aging Receivables
      </button>
    </div>
  );
}
