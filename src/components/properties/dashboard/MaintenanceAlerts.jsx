import { AlertTriangle, Clock, Hammer, ArrowRight } from 'lucide-react';

export default function MaintenanceAlerts({ alerts }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 bg-amber-50/10 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={16} /> Maintenance Alerts
          </h3>
          <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase italic tracking-tighter">Immediate operational attention</p>
        </div>
        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-200">
           {alerts.length} Active
        </span>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-700 overflow-y-auto flex-grow max-h-[350px]">
        {alerts.map((alert, i) => (
          <div key={i} className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-black text-gray-900 dark:text-gray-100 mb-1">{alert.property}</p>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded text-gray-500 uppercase tracking-widest group-hover:bg-[#1a6644] group-hover:text-white transition-colors">Unit {alert.unit}</span>
                   <span className="text-[9px] font-bold text-gray-400 uppercase">{alert.issue}</span>
                </div>
              </div>
              <div className="text-right">
                 <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    alert.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-100 text-gray-500 border-gray-200'
                 }`}>
                    {alert.status}
                 </span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50 p-2.5 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all group-hover:border-amber-100 group-hover:bg-amber-50/20">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1a6644]">
                  <Clock size={12} /> Return: {new Date(alert.returnDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
               </div>
               <button className="p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-gray-400 hover:text-[#1a6644] transition-all shadow-sm active:scale-95">
                  <ArrowRight size={12} />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800">
         <button className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#1a6644] hover:border-[#1a6644] transition-all active:scale-95">
            <Hammer size={14} /> Full Maintenance Ledger
         </button>
      </div>
    </div>
  );
}
