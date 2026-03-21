import { ArrowUpRight, ArrowDownLeft, Clock, Search, MoreHorizontal } from 'lucide-react';

export default function RecentTransactions({ transactions }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Recent Transactions</h3>
          <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">unified feed (B2C & B2B)</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="relative">
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
             <input 
               type="text" 
               placeholder="Search TRX..." 
               className="pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-[10px] font-bold focus:ring-1 focus:ring-[#1a6644] w-32"
             />
           </div>
           <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-colors">
             <MoreHorizontal size={16} />
           </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30 dark:bg-gray-900/10">
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Entity / User</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {transactions.map((trx, i) => {
              const IsInflow = trx.amount > 0;
              
              return (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-mono font-bold text-gray-400 group-hover:text-[#1a6644] transition-colors">{trx.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-bold text-gray-800 dark:text-gray-200">{trx.user}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-md ${IsInflow ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                        {IsInflow ? <ArrowDownLeft size={10} /> : <ArrowUpRight size={10} />}
                      </div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">{trx.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                      <Clock size={10} />
                      {new Date(trx.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[13px] font-black ${IsInflow ? 'text-[#1a6644]' : 'text-amber-600'}`}>
                      {IsInflow ? '+' : ''}£{Math.abs(trx.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      trx.status === 'Success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 border-t border-gray-50 dark:border-gray-700 flex justify-center">
        <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700">
          Load Full Audit Log
        </button>
      </div>
    </div>
  );
}
