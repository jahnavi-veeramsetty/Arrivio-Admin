import { Search, Filter, ExternalLink, MoreVertical, LayoutGrid, List } from 'lucide-react';

export default function InvestorsTable({ investors, onViewDetail, canAdjust }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-grow max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search investor..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#1a6644] transition-all"
            />
          </div>
        </div>
        
        <div className="flex bg-gray-50 dark:bg-gray-900 p-1 rounded-xl">
           <button className="p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-[#1a6644]">
              <List size={14} />
           </button>
           <button className="p-1.5 text-gray-400 hover:text-gray-600">
              <LayoutGrid size={14} />
           </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30 dark:bg-gray-900/10">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Investor Partner</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Payout</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Gross Rent</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Mgmt Fee (10%)</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Net Payout</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {investors.map((inv, i) => (
              <tr 
                key={i} 
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer"
                onClick={() => onViewDetail(inv)}
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{inv.name}</p>
                </td>
                <td className="px-6 py-4 text-[11px] font-bold text-gray-500">
                  {new Date(inv.nextPayout).toLocaleDateString([], { dateStyle: 'medium' })}
                </td>
                <td className="px-6 py-4 text-right text-xs font-bold text-gray-500">
                  £{inv.grossRent.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-xs font-bold text-red-400">
                  -£{inv.fee.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-black text-gray-900 dark:text-gray-100">£{inv.netPayout.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                    inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end gap-2 text-gray-400">
                      {canAdjust && (
                        <button className="text-[10px] font-black uppercase hover:text-[#1a6644] transition-colors border-b border-gray-200 hover:border-[#1a6644] pb-0.5">
                          Adjust
                        </button>
                      )}
                      <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
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
