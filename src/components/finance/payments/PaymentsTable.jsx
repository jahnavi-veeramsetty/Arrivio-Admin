import { Search, Filter, Download, ExternalLink, MoreVertical } from 'lucide-react';

export default function PaymentsTable({ payments, onViewDetail }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
      {/* Table Header / Filters */}
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by tenant or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#1a6644] transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-xs font-bold px-4 py-2 text-gray-600 focus:ring-2 focus:ring-[#1a6644]">
              <option>All Status</option>
              <option>Succeeded</option>
              <option>Failed</option>
              <option>Pending</option>
            </select>
            <select className="bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-xs font-bold px-4 py-2 text-gray-600 focus:ring-2 focus:ring-[#1a6644]">
              <option>All Cities</option>
              <option>London</option>
              <option>Berlin</option>
              <option>Tokyo</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30 dark:bg-gray-900/10">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment ID</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tenant</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">City</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {payments.map((p, i) => (
              <tr 
                key={i} 
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer"
                onClick={() => onViewDetail(p)}
              >
                <td className="px-6 py-4">
                  <span className="text-[11px] font-mono font-bold text-gray-400 group-hover:text-[#1a6644] transition-colors">{p.id}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{p.tenant}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight bg-gray-100/50 dark:bg-gray-700/50 px-2 py-1 rounded-md">
                    {p.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-black text-gray-900 dark:text-gray-100">
                    £{p.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
                    {new Date(p.date).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[11px] font-bold text-gray-500 underline decoration-gray-200 underline-offset-4">{p.city}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      p.status === 'Succeeded' ? 'bg-green-50 text-green-700 border-green-100 italic' : 
                      p.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-100' : 
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-400 hover:text-[#1a6644] transition-all">
                      <ExternalLink size={14} />
                    </button>
                    <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-gray-400 transition-colors">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Placeholder */}
      <div className="p-6 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Showing 1-10 of 244 payments</p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg text-xs font-bold disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1.5 bg-[#1a6644] text-white rounded-lg text-xs font-bold">1</button>
          <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">2</button>
          <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
