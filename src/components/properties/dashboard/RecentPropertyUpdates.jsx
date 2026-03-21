import { User, History, ArrowRight } from 'lucide-react';

export default function RecentPropertyUpdates({ updates }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden h-full flex flex-col">
       <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between bg-gray-900 text-white">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
             <History size={16} className="text-[#1a6644]" /> Property Audit Log
          </h3>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic">Live Feed</span>
       </div>

       <div className="p-8 space-y-8 flex-grow overflow-y-auto max-h-[400px]">
          {updates.map((update, i) => (
            <div key={i} className="relative pl-8 border-l border-gray-100 dark:border-gray-700 last:pb-0 group">
               {/* Timeline Node */}
               <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white dark:bg-gray-800 border-2 border-[#1a6644] shadow-sm z-10 group-hover:scale-125 transition-transform" />
               
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{update.time}</span>
                  </div>
               </div>

               <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-[#1a6644] transition-colors">
                  {update.action}
               </p>
               <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black text-[#1a6644] uppercase tracking-tighter bg-[#1a6644]/5 px-2 py-0.5 rounded border border-[#1a6644]/10">
                    {update.target}
                  </span>
               </div>

               <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-100 dark:border-gray-800 group-hover:bg-white transition-all">
                  <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                     <User size={10} />
                  </div>
                  {update.user}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                     <ArrowRight size={10} className="text-[#1a6644]" />
                  </div>
               </div>
            </div>
          ))}
       </div>

       <div className="p-6 border-t border-gray-50 dark:border-gray-700 bg-gray-50/30">
          <button className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">
             View Full Portfolio History →
          </button>
       </div>
    </div>
  );
}
