import { X, Home, Maximize, List, ShieldCheck, Settings, Layout } from 'lucide-react';

export default function UnitTypeDetail({ type, isOpen, onClose }) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#f8f8f6] dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-8 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white rotate-6">
                 <Home size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a6644]">Standard Definition</p>
                 <h2 className="text-2xl font-black italic tracking-tight">{type.name}</h2>
              </div>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <X size={20} />
           </button>
        </div>

        <div className="p-8 space-y-10 pb-24">
           {/* Definition Card */}
           <section className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-m">
              <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 mb-6">
                 <Layout size={16} className="text-[#1a6644]" /> Taxonomy Profile
              </h3>
              
              <div className="space-y-6">
                 <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Description Template</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-relaxed italic border-l-4 border-[#1a6644]/20 pl-4 py-2">
                       "{type.description}"
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">Standard Area</p>
                       <div className="flex items-center gap-2 mt-1">
                          <Maximize size={16} className="text-[#1a6644]" />
                          <span className="text-lg font-black italic">{type.size}</span>
                       </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">Status</p>
                       <div className="flex items-center gap-2 mt-1">
                          <ShieldCheck size={16} className="text-green-500" />
                          <span className="text-lg font-black italic">ACTIVE</span>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           {/* Default Amenities */}
           <section className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
              <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 mb-6">
                 <List size={16} className="text-[#1a6644]" /> Mandatory Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                 {type.amenities.map((a, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600">
                       {a}
                    </span>
                 ))}
                 <button className="px-4 py-2 border-2 border-dashed border-gray-200 rounded-xl text-[10px] font-black uppercase text-gray-400 hover:border-[#1a6644] hover:text-[#1a6644] transition-all">
                    + Add New
                 </button>
              </div>
           </section>

           <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                 <Settings size={14} className="text-amber-600" />
              </div>
              <p className="text-[10px] text-amber-800 font-bold uppercase tracking-tight leading-relaxed">
                 Updating this unit type definition will synchronize standard descriptions across all active property listings using this taxonomy.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
