import { Home, Layers, Maximize, Edit3, Plus, MoreHorizontal } from 'lucide-react';

export default function UnitTypesTable({ types, onAction }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/50">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type Name</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Size Range</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Default Amenities</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {types.map((type) => (
              <tr key={type.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                         <Home size={16} />
                      </div>
                      <span className="text-sm font-black italic text-gray-900 dark:text-white uppercase tracking-tight">{type.name}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <p className="text-xs text-gray-500 font-bold max-w-xs line-clamp-1">{type.description}</p>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                      <Maximize size={12} className="text-gray-300" />
                      <span className="text-[10px] font-black font-mono">{type.size}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex flex-wrap gap-1.5">
                      {type.amenities.slice(0, 2).map((a, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[9px] font-black text-gray-500 uppercase tracking-widest">
                           {a}
                        </span>
                      ))}
                      {type.amenities.length > 2 && (
                        <span className="text-[9px] font-black text-gray-400 uppercase">+{type.amenities.length - 2} more</span>
                      )}
                   </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onAction('edit', type)}
                        className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 hover:text-[#1a6644] transition-all shadow-sm border border-transparent hover:border-gray-100"
                      >
                         <Edit3 size={14} />
                      </button>
                      <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-all">
                         <MoreHorizontal size={14} />
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
