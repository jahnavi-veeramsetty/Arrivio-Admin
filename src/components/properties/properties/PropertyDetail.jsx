import { X, MapPin, Building, Users, Info, Settings, Plus, Camera, Trash2, Wrench, ShieldCheck, List } from 'lucide-react';

export default function PropertyDetail({ property, isOpen, onClose, onAction, canArchive }) {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Slide-over */}
      <div className="relative w-full max-w-4xl bg-[#f8f8f6] dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        {/* Header Ribbon */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-8 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 rotate-3 group-hover:rotate-0 transition-transform">
                 <img src={property.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a6644]">Arrivio Portfolio</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase italic ${property.status === 'Live' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                       {property.status}
                    </span>
                 </div>
                 <h2 className="text-3xl font-black italic tracking-tight">{property.name}</h2>
              </div>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group">
              <X size={24} className="group-hover:rotate-90 transition-transform" />
           </button>
        </div>

        <div className="p-8 space-y-10 pb-24">
           {/* Top Stats & Actions */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3 grid grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Territory</p>
                    <p className="text-base font-bold flex items-center gap-2"><MapPin size={14} className="text-[#1a6644]" /> {property.city}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Performance</p>
                    <p className="text-base font-bold flex items-center gap-2"><ShieldCheck size={14} className="text-green-600" /> {property.occupancy}% Occupied</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Inventory</p>
                    <p className="text-base font-bold flex items-center gap-2"><Building size={14} className="text-blue-600" /> {property.units} Units</p>
                 </div>
              </div>
              
              <div className="space-y-3">
                 <button className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                    <Camera size={14} /> Gallery
                 </button>
                 <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#1a6644] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#155236] transition-all active:scale-95 shadow-lg shadow-[#1a6644]/20">
                    <Settings size={14} /> Edit Data
                 </button>
              </div>
           </div>

           {/* Unit Inventory Table */}
           <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <List size={16} className="text-[#1a6644]" /> Unit Inventory
                 </h3>
                 <button onClick={() => onAction('add_unit')} className="flex items-center gap-2 px-4 py-2 bg-[#1a6644]/10 text-[#1a6644] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#1a6644]/20 transition-all">
                    <Plus size={14} /> New Unit
                 </button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                          <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Unit Ref</th>
                          <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                          <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Floor</th>
                          <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Rate</th>
                          <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                          <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                       {property.inventory?.map((unit, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                             <td className="px-8 py-4 text-sm font-black italic">{unit.id}</td>
                             <td className="px-8 py-4 text-xs font-bold text-gray-500 uppercase">{unit.type}</td>
                             <td className="px-8 py-4 text-xs font-bold text-gray-500 uppercase">{unit.floor}</td>
                             <td className="px-8 py-4 text-xs font-black font-mono text-[#1a6644]">£{unit.price}</td>
                             <td className="px-8 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                                   unit.status === 'Occupied' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                   unit.status === 'Available' ? 'bg-green-50 text-green-700 border-green-100' :
                                   'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                                }`}>
                                   {unit.status}
                                </span>
                             </td>
                             <td className="px-8 py-4 text-right">
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100">
                                   <Settings size={14} />
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </section>

           {/* Operational Context */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                       <Users size={16} className="text-[#1a6644]" /> Resident Mgmt
                    </h3>
                    <button className="text-[10px] font-black uppercase text-gray-400 hover:text-[#1a6644] transition-colors">Directory →</button>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Move-ins (7d)</p>
                       <span className="text-xl font-black italic">4</span>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Users size={120} />
                </div>
              </section>

              <section className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                       <Trash2 size={16} className="text-red-400" /> Critical Actions
                    </h3>
                 </div>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-relaxed mb-8">
                    Property lifecycle management. Archiving is irreversible and requires zero active leases.
                 </p>
                 <button 
                   disabled={!canArchive || property.occupancy > 0}
                   className="w-full py-4 border-2 border-red-500/30 text-red-500 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-500"
                 >
                    {property.occupancy > 0 ? 'Archive Blocked (Units Occupied)' : 'Archive Property'}
                 </button>
              </section>
           </div>
        </div>
      </div>
    </div>
  );
}
