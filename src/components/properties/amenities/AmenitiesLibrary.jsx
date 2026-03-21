import { Hash, Building, Edit3, Trash2, MoreVertical, Wifi, Dumbbell, Sunset, Utensils, Bike, Laptop, Waves } from 'lucide-react';

const iconMap = {
  Wifi, Dumbbell, Sunset, Utensils, Bike, Laptop, Waves
};

export default function AmenitiesLibrary({ amenities, onAction, canDeprecate }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/50">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amenity Name</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Icon Preview</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Global Usage</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {amenities.map((am) => {
              const IconComp = iconMap[am.icon] || Hash;
              return (
                <tr key={am.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                     <span className="text-sm font-black italic text-gray-900 dark:text-white uppercase tracking-tight">{am.name}</span>
                  </td>
                  <td className="px-8 py-6">
                     <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1a6644] border border-emerald-100 flex items-center justify-center">
                        <IconComp size={16} />
                     </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full">
                        <Building size={12} className="text-gray-400" />
                        <span className="text-[10px] font-black font-mono">{am.usage}</span>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onAction('edit', am)}
                          className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 hover:text-[#1a6644] transition-all shadow-sm border border-transparent hover:border-gray-100"
                        >
                           <Edit3 size={14} />
                        </button>
                        {canDeprecate && (
                          <button 
                            onClick={() => onAction('deprecate', am)}
                            className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 hover:text-red-600 transition-all shadow-sm border border-transparent hover:border-gray-100"
                          >
                             <Trash2 size={14} />
                          </button>
                        )}
                        <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-all">
                           <MoreVertical size={14} />
                        </button>
                     </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
