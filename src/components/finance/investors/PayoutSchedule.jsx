import { Calendar, CheckCircle2, FileDown, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PayoutSchedule({ investors }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
         <div>
            <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Payout Schedule</h3>
            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase italic tracking-tighter">Approved investor liabilities</p>
         </div>
         <button className="text-[10px] font-black uppercase tracking-widest bg-gray-900 text-white px-3 py-1.5 rounded-xl hover:bg-black transition-all">
            Execute Run
         </button>
      </div>

      <div className="p-6 space-y-6 flex-grow">
         {investors.map((inv, i) => (
           <div key={i} className="flex gap-4 group">
              <div className="flex flex-col items-center">
                 <div className={`w-3 h-3 rounded-full border-2 ${inv.status === 'Paid' ? 'bg-[#1a6644] border-white dark:border-gray-900' : 'bg-amber-400 border-white dark:border-gray-900'} z-10`} />
                 {i !== investors.length - 1 && <div className="w-0.5 h-full bg-gray-100 dark:bg-gray-700 -mt-1" />}
              </div>
              <div className="flex-grow pb-6">
                 <div className="flex justify-between items-start">
                    <div>
                       <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                         {new Date(inv.nextPayout).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                       </p>
                       <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{inv.name}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-gray-900 dark:text-gray-100">£{inv.netPayout.toLocaleString()}</p>
                       <p className={`text-[9px] font-black uppercase italic ${inv.status === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>
                          {inv.status}
                       </p>
                    </div>
                 </div>
                 
                 <div className="mt-3 flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 text-[10px] font-bold text-gray-500 rounded-lg hover:text-[#1a6644] transition-colors border border-gray-100 dark:border-gray-800">
                       <FileDown size={12} /> Confirm Statement
                    </button>
                    {inv.status === 'Pending' && (
                       <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-[10px] font-black text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-100">
                          <CheckCircle2 size={12} /> Mark as Paid
                       </button>
                    )}
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="p-6 bg-[#f8f8f6] dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800">
         <div className="flex items-start gap-3">
            <ShieldCheck size={16} className="text-[#1a6644] mt-0.5" />
            <div className="space-y-1">
               <p className="text-[10px] font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">Arrivio Fee Yield</p>
               <p className="text-sm font-black text-[#1a6644]">£13,500 <span className="text-[10px] text-gray-400 font-bold ml-1 uppercase">from this run</span></p>
            </div>
         </div>
      </div>
    </div>
  );
}
