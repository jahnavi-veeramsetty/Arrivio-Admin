import { Clock, User, ChevronRight } from 'lucide-react';

export default function PricingChangeHistory({ logs }) {
  // Mock logs for demonstration
  const mockLogs = [
    { admin: 'Elena R.', action: 'Increased Studio Rate', city: 'London', old: 1150, new: 1200, time: '2h ago' },
    { admin: 'Aarav M.', action: 'Added Partner Override', city: 'Tokyo', partner: 'NextGen', old: 1500, new: 1450, time: '1d ago' },
    { admin: 'Elena R.', action: 'Reduced Tier Multiplier', city: 'Berlin', old: 1.1, new: 1.08, time: '3d ago' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 bg-gray-900 text-white">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
           <Clock size={14} className="text-emerald-400" /> Immutable Edit Log
        </h3>
        <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">All pricing events are audit-trailed per AML-6</p>
      </div>

      <div className="p-6 space-y-6 flex-grow overflow-y-auto max-h-[400px]">
        {mockLogs.map((log, i) => (
          <div key={i} className="relative pl-6 border-l border-gray-100 dark:border-gray-700 pb-1 last:pb-0">
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white dark:bg-gray-800 border-2 border-emerald-500 shadow-sm" />
            
            <div className="flex justify-between items-start mb-2">
               <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">{log.action}</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{log.city} Base Rate</p>
               </div>
               <span className="text-[9px] font-black text-gray-400 uppercase">{log.time}</span>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800 mb-3">
               <span className="text-[11px] font-mono text-gray-400 line-through">£{log.old}</span>
               <ChevronRight size={12} className="text-gray-300" />
               <span className="text-[11px] font-mono font-black text-gray-800 dark:text-gray-100">£{log.new}</span>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
               <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                  <User size={10} />
               </div>
               {log.admin}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-50 dark:border-gray-700 bg-gray-50/50">
         <button className="w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#1a6644] hover:shadow-lg transition-all">
            Download PDF Audit History
         </button>
      </div>
    </div>
  );
}
