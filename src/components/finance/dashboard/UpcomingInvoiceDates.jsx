import { Calendar, Clock } from 'lucide-react';

export default function UpcomingInvoiceDates({ invoices }) {
  const upcoming = invoices.filter((invoice) => invoice.status === 'Sent' || invoice.status === 'Draft').slice(0, 5);
  const upcomingTotal = upcoming.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Calendar size={14} className="text-[#1a6644]" /> Upcoming Due Dates
        </h3>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-700 overflow-y-auto flex-grow max-h-[300px]">
        {upcoming.map((invoice, index) => (
          <div key={index} className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <span className="text-[10px] font-black text-gray-500 uppercase">{new Date(invoice.dueDate).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-sm font-black text-gray-800 dark:text-gray-100 leading-none">{new Date(invoice.dueDate).getDate()}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate max-w-[120px]">{invoice.partner}</p>
                <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md ${
                  invoice.status === 'Sent' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-50 text-gray-500 border border-gray-100'
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-gray-700 dark:text-gray-300">€{invoice.amount.toLocaleString()}</p>
              <div className="flex items-center justify-end gap-1 text-[9px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-100 dark:border-gray-700 mt-1">
                <Clock size={10} />
                In {Math.ceil((new Date(invoice.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-50 dark:border-gray-700 bg-gray-50/30">
        <div className="bg-[#1a6644]/5 dark:bg-[#1a6644]/10 rounded-xl p-3 border border-[#1a6644]/10">
          <p className="text-[9px] font-black text-[#1a6644] uppercase tracking-widest mb-1">Forecast</p>
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-gray-500">Visible Upcoming Invoices</span>
            <span className="text-lg font-black text-[#1a6644]">€{upcomingTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
