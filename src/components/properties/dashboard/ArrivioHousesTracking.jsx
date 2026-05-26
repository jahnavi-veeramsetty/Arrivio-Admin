import { Home, ClipboardList, Hammer, CalendarClock, AlertCircle, Plug } from 'lucide-react';

export default function ArrivioHousesTracking({ stats, properties }) {
  const averageOccupancy = properties && properties.length
    ? Math.round(properties.reduce((sum, p) => sum + (p.occupancyRate || 0), 0) / properties.length)
    : 0;

  const cards = [
    { label: 'Live Houses', value: stats.liveHouses, sub: 'Across 8 cities', icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-100 dark:border-emerald-900/30' },
    { label: 'Houses Onboarding', value: stats.housesOnboarding, sub: 'Lease signed · pre-handover', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-900/30' },
    { label: 'Under Renovation', value: stats.housesUnderRenovation, sub: 'Fit-out in progress', icon: Hammer, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-100 dark:border-amber-900/30' },
    { label: 'Avg House Age', value: `${stats.averageHouseAgeMonths} mo`, sub: 'Months since first move-in', icon: CalendarClock, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-100 dark:border-violet-900/30' },
    { label: 'Open Tickets', value: stats.openOperationalTickets, sub: 'Maintenance · partner coord', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-100 dark:border-red-900/30' },
    { label: 'Avg House Occupancy', value: `${averageOccupancy}%`, sub: `${stats.servicePartnersConnected} service partners connected`, icon: Plug, color: 'text-[#1a6644]', bg: 'bg-[#1a6644]/10 dark:bg-[#1a6644]/20', border: 'border-[#1a6644]/20 dark:border-[#1a6644]/30' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">Arrivio Operations | House Portfolio</p>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Arrivio Houses Tracking</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((card, index) => (
          <div key={index} className={`p-4 rounded-2xl border ${card.bg} ${card.border}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-white dark:bg-gray-900 shadow-sm ${card.color}`}>
                <card.icon size={18} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</span>
            </div>
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-2">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
