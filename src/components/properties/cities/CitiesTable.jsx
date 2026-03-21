import { MapPin, Building, Globe, Edit3, Power, MoreVertical, Eye } from 'lucide-react';

export default function CitiesTable({ cities, onAction, canEdit }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/50">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">City & Country</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Properties</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Unit Count</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Manager</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {cities.map((city) => (
              <tr key={city.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#1a6644]/5 flex items-center justify-center text-[#1a6644]">
                         <Globe size={18} />
                      </div>
                      <div>
                         <p className="text-sm font-black italic text-gray-900 dark:text-white uppercase tracking-tight">{city.name}</p>
                         <p className="text-[10px] font-bold text-gray-400 uppercase">{city.country}</p>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6 text-center">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black italic">
                      <Building size={12} /> {city.properties}
                   </div>
                </td>
                <td className="px-8 py-6 text-center">
                   <span className="text-sm font-black font-mono text-gray-600 dark:text-gray-400">{city.units}</span>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                         <MapPin size={10} className="text-gray-400" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{city.manager}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      city.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' :
                      city.status === 'Coming Soon' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-gray-100 text-gray-500 border-gray-200'
                   }`}>
                      {city.status}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onAction('view', city)}
                        className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 hover:text-blue-600 transition-all shadow-sm border border-transparent hover:border-gray-100"
                      >
                         <Eye size={14} />
                      </button>
                      {canEdit && (
                        <>
                           <button 
                             onClick={() => onAction('edit', city)}
                             className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 hover:text-[#1a6644] transition-all shadow-sm border border-transparent hover:border-gray-100"
                           >
                              <Edit3 size={14} />
                           </button>
                           <button 
                             onClick={() => onAction('toggle', city)}
                             className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 hover:text-amber-600 transition-all shadow-sm border border-transparent hover:border-gray-100"
                           >
                              <Power size={14} />
                           </button>
                        </>
                      )}
                      <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-all">
                         <MoreVertical size={14} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
