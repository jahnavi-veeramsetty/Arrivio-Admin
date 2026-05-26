import { MoreVertical } from 'lucide-react';

const STATUS_COLORS = {
  'Pipeline Hold': 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900',
  'Maintenance Buffer': 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900',
};

export default function CapacityTable({ reservations, partners, onRowClick }) {
  const getPartner = (id) => partners.find((partner) => partner.id === id) || { name: 'Unknown', type: 'Employers' };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Partner Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Reservation</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Rooms</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Start Window</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {reservations.map((reservation) => {
              const partner = getPartner(reservation.partnerId);

              return (
                <tr
                  key={reservation.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group"
                  onClick={() => onRowClick(reservation)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#1a6644] transition-colors">{partner.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{reservation.id}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-medium">{partner.type}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400">{reservation.label}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{reservation.roomsFilled} / {reservation.roomsReserved}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {reservation.daysRemaining ? `${reservation.daysRemaining} days` : 'Rolling'}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-tight text-gray-400">
                      {reservation.daysRemaining ? 'Until cohort start' : 'Operational buffer'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${STATUS_COLORS[reservation.status]}`}>
                      {reservation.status.toUpperCase()}
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
