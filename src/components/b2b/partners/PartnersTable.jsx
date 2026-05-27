import { User, MoreVertical } from 'lucide-react';

const TYPE_COLORS = {
  Employers: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
  'Recruitment Agencies': 'bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-900',
  Universities: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900',
};

const STATUS_COLORS = {
  Active: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export default function PartnersTable({ partners, onRowClick }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Partner Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Account Manager</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Partner Count</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Active Housed</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Monthly Value</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {partners.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-gray-400 italic">
                  No partners found matching your filters.
                </td>
              </tr>
            ) : partners.map((partner) => (
              <tr
                key={partner.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group"
                onClick={() => onRowClick(partner)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1a6644]/5 flex items-center justify-center text-[#1a6644] font-bold text-lg border border-[#1a6644]/10">
                      {partner.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#1a6644] transition-colors">{partner.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium">{partner.id} · {partner.city}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${TYPE_COLORS[partner.type]}`}>
                    {partner.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_COLORS[partner.status]}`}>
                    <div className="w-1 h-1 rounded-full bg-green-500" />
                    {partner.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <User size={14} className="text-gray-400" />
                    {partner.manager}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{partner.partnerCount || 1}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{partner.employees}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="text-sm font-bold text-[#1a6644]">€{partner.revenue.toLocaleString()}</div>
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
