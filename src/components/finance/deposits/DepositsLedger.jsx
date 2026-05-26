import { Search, Shield, Download, ArrowRight } from 'lucide-react';

export default function DepositsLedger({ deposits, onViewDetail }) {
  const totalLiability = deposits.reduce((accumulator, current) => accumulator + current.amount, 0);

  return (
    <div className="space-y-6">
      <div className="bg-[#0f4c3a] text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-[#0f4c3a]/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400/80 mb-2">Escrow Management</p>
            <h3 className="text-4xl font-black italic tracking-tight">Total Deposit Liability</h3>
            <p className="text-sm text-emerald-100/60 mt-2 font-medium">Funds currently held across all residential units.</p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-black font-mono tracking-tighter text-emerald-400">€{totalLiability.toLocaleString()}</p>
            <div className="flex items-center justify-end gap-2 mt-2 text-[10px] font-black uppercase tracking-widest text-emerald-200/50">
              <Shield size={12} /> Protected in Ring-fenced Account
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search tenant or unit..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#1a6644] transition-all"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={16} /> Export Detailed Ledger
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/30 dark:bg-gray-900/10">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tenant / User</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit Reference</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount Held</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Deductions</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Move-out Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Lifecycle Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {deposits.map((deposit, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer"
                  onClick={() => onViewDetail(deposit)}
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{deposit.tenant}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{deposit.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded inline-block uppercase">
                      {deposit.unit}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-gray-900 dark:text-gray-100">€{deposit.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className={`text-sm font-black ${deposit.deductions > 0 ? 'text-red-500' : 'text-gray-300'}`}>
                      -€{deposit.deductions.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[11px] font-bold text-gray-500">
                      {new Date(deposit.moveOut).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      deposit.status === 'Held'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : deposit.status === 'Returning'
                          ? 'bg-amber-50 text-amber-700 border-amber-100 italic'
                          : 'bg-red-50 text-red-700 border-red-100 shadow-sm shadow-red-50'
                    }`}>
                      {deposit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-gray-400 hover:text-[#1a6644] transition-all">
                      <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
