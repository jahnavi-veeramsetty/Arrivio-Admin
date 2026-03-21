import { User, CheckCircle2, MoreVertical, ExternalLink } from 'lucide-react';

const TYPE_COLORS = {
  Employer: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
  Agency: 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-900',
  University: 'bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-900',
  Investor: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900',
};

const STATUS_COLORS = {
  Active: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

export default function PartnersTable({ partners, onRowClick }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Account Manager</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Employees</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Revenue</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {partners.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-400 italic">
                  No partners found matching your filters.
                </td>
              </tr>
            ) : partners.map((p) => (
              <tr 
                key={p.id} 
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group"
                onClick={() => onRowClick(p)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1a6644]/5 flex items-center justify-center text-[#1a6644] font-bold text-lg border border-[#1a6644]/10">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#1a6644] transition-colors">{p.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium">{p.id} · {p.city}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${TYPE_COLORS[p.type]}`}>
                    {p.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_COLORS[p.status]}`}>
                    <div className={`w-1 h-1 rounded-full ${p.status === 'Active' ? 'bg-green-500' : p.status === 'Pending' ? 'bg-amber-500' : 'bg-gray-500'}`} />
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <User size={14} className="text-gray-400" />
                    {p.manager}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{p.employees}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="text-sm font-bold text-[#1a6644]">${p.revenue.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
