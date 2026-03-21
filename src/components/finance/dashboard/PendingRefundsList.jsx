import { Undo2, User, Clock, CheckCircle2 } from 'lucide-react';

export default function PendingRefundsList({ refunds }) {
  const pending = refunds.filter(r => r.status === 'Pending');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 flex items-center justify-between">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Undo2 size={14} className="text-amber-500" /> Pending Refunds
        </h3>
        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase">{pending.length} Action Needed</span>
      </div>
      
      <div className="divide-y divide-gray-50 dark:divide-gray-700 overflow-y-auto flex-grow max-h-[300px]">
        {pending.map((r, i) => (
          <div key={i} className="p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{r.tenant}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{r.reason}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-amber-600">£{r.amount.toLocaleString()}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{new Date(r.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-3 mt-4">
              <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <User size={10} className="text-gray-300" /> {r.admin.split(' ')[0]}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a6644] text-white text-[9px] font-black rounded-lg hover:bg-[#155236] transition-all uppercase tracking-widest shadow-lg shadow-[#1a6644]/20 hover:scale-105 active:scale-95">
                <CheckCircle2 size={10} /> Process Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50/30 dark:bg-gray-900/10 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400">
          <Clock size={12} className="text-[#1a6644]" /> Average processing time: 1.2 business days
        </div>
      </div>
    </div>
  );
}
