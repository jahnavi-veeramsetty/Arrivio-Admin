import { X, Globe, Building, Users, MapPin, BarChart2, ShieldCheck, Flag } from 'lucide-react';

export default function CityDetail({ city, isOpen, onClose }) {
  if (!isOpen || !city) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#f8f8f6] dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-8 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white rotate-6">
                 <Globe size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a6644]">Territory Overview</p>
                 <h2 className="text-2xl font-black italic tracking-tight">{city.name}</h2>
              </div>
           </div>
           <button onClick={onClose} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <X size={20} />
           </button>
        </div>

        <div className="p-8 space-y-10">
           {/* Summary Grid */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Portfolio Size</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black italic">{city.properties}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase">Properties</span>
                 </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Capacity</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black italic font-mono">{city.units}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase">Units</span>
                 </div>
              </div>
           </div>

           {/* Territory Management */}
           <section className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
              <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 mb-6">
                 <Users size={16} className="text-[#1a6644]" /> Operations Support
              </h3>
              
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Territory Manager</p>
                       <p className="text-sm font-bold text-gray-900 dark:text-white uppercase">{city.manager}</p>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-[#1a6644] transition-all">
                       <MapPin size={16} />
                    </button>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div>
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Regional Compliance</p>
                       <p className="text-sm font-bold text-gray-900 dark:text-white uppercase italic">Verified</p>
                    </div>
                    <ShieldCheck size={20} className="text-green-500" />
                 </div>
              </div>
           </section>

           {/* Market Readiness */}
           <section className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                    <BarChart2 size={16} className="text-[#1a6644]" /> Market Logic
                 </h3>
                 <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    city.status === 'Active' ? 'bg-[#1a6644] text-white' : 'bg-gray-800 text-gray-400'
                 }`}>
                    {city.status}
                 </span>
              </div>
              
              <div className="space-y-4">
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    Feature Flag: <code>MARKET_VISIBILITY_{city.name.toUpperCase()}</code>
                 </p>
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <Flag size={18} className="text-[#1a6644]" />
                    <span className="text-xs font-bold">Public search results enabled</span>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
