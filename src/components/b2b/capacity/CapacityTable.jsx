import { Clock, CheckCircle2, AlertTriangle, XCircle, MoreVertical } from 'lucide-react';

const STATUS_COLORS = {
  Active: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900',
  'Expiring Soon': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900',
  Expired: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900',
  Pending: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
};

export default function CapacityTable({ reservations, partners, onRowClick }) {
  const getPartner = (id) => partners.find(p => p.id === id) || { name: 'Unknown', type: 'Employer' };

  const getDaysRemaining = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Partner Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Rooms</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Fill Rate</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Expiry</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {reservations.map((r) => {
              const partner = getPartner(r.partnerId);
              const fillRate = (r.roomsFilled / r.roomsReserved) * 100;
              const days = getDaysRemaining(r.expiry);
              
              return (
                <tr 
                  key={r.id} 
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group"
                  onClick={() => onRowClick(r)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#1a6644] transition-colors">{partner.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{r.id}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-medium">{partner.type}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{r.roomsFilled} / {r.roomsReserved}</div>
                  </td>
                  <td className="px-6 py-4 max-w-[150px]">
                    <div className="flex items-center gap-3">
                      <div className="flex-grow h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            fillRate >= 90 ? 'bg-green-500' : fillRate >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${fillRate}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-gray-500">{Math.round(fillRate)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{new Date(r.expiry).toLocaleDateString()}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-tight ${days < 30 ? 'text-amber-500' : 'text-gray-400'}`}>
                      {days > 0 ? `${days} days remaining` : 'Expired'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${STATUS_COLORS[r.status]}`}>
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
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
