import { AlertTriangle, Clock } from 'lucide-react';

export default function ExpiringReservations({ partners, reservations }) {
  const expiring = reservations
    .filter(r => r.status === 'Expiring Soon')
    .map(r => ({
      ...r,
      partner: partners.find(p => p.id === r.partnerId) || { name: 'Unknown Partner', type: 'Employer' },
    }))
    .sort((a, b) => new Date(a.expiry) - new Date(b.expiry));

  const getDaysRemaining = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-tight">Expiring Reservations</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-50 dark:border-gray-700 text-gray-400 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Partner</th>
              <th className="py-3 px-2">Rooms</th>
              <th className="py-3 px-2">Expiry</th>
              <th className="py-3 px-2 text-right">Days Left</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {expiring.map(r => {
              const days = getDaysRemaining(r.expiry);
              const isUrgent = days < 7;
              
              return (
                <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-2">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{r.partner.name}</div>
                    <div className="text-[10px] text-gray-400 capitalize">{r.partner.type}</div>
                  </td>
                  <td className="py-3 px-2 font-medium text-gray-600 dark:text-gray-400">
                    {r.roomsFilled}/{r.roomsReserved}
                  </td>
                  <td className="py-3 px-2 text-gray-500 font-medium">
                    {new Date(r.expiry).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg font-bold ${
                      isUrgent ? 'bg-red-50 text-red-600 dark:bg-red-900/40 border border-red-100 dark:border-red-900/50' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30'
                    }`}>
                      {isUrgent && <AlertTriangle size={12} />}
                      {days}d
                    </span>
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
