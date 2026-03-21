import { Users, FilePlus, Percent, Home, Clock, LifeBuoy } from 'lucide-react';

export default function MetricCards({ partners, employees, reservations }) {
  // Logic for metrics
  const activePartners = partners.filter(p => p.status === 'Active').length;
  const pendingApps = partners.filter(p => p.status === 'Pending').length;
  
  const totalReserved = reservations.reduce((sum, r) => sum + r.roomsReserved, 0);
  const totalFilled = reservations.reduce((sum, r) => sum + r.roomsFilled, 0);
  const fillRate = totalReserved > 0 ? (totalFilled / totalReserved) * 100 : 0;
  
  const unhousedCount = employees.filter(e => e.status === 'Awaiting Housing').length;
  const expiringCount = reservations.filter(r => r.status === 'Expiring Soon').length;
  
  // Mocking open cases since they aren't in the base mock data yet
  const openCases = 4;

  const cards = [
    {
      label: 'Active Partners',
      value: activePartners,
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-100 dark:border-green-900/30',
    },
    {
      label: 'New Applications',
      value: pendingApps,
      icon: FilePlus,
      color: pendingApps > 2 ? 'text-amber-600' : 'text-gray-600',
      bg: pendingApps > 2 ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-gray-50 dark:bg-gray-800',
      border: pendingApps > 2 ? 'border-amber-100 dark:border-amber-900/30' : 'border-gray-100 dark:border-gray-700',
    },
    {
      label: 'Capacity Fill Rate',
      value: `${fillRate.toFixed(1)}%`,
      icon: Percent,
      color: fillRate < 60 ? 'text-red-600' : 'text-blue-600',
      bg: fillRate < 60 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20',
      border: fillRate < 60 ? 'border-red-100 dark:border-red-900/30' : 'border-blue-100 dark:border-blue-900/30',
    },
    {
      label: 'Employees Unhoused',
      value: unhousedCount,
      icon: Home,
      color: unhousedCount > 5 ? 'text-red-600' : 'text-gray-600',
      bg: unhousedCount > 5 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-800',
      border: unhousedCount > 5 ? 'border-red-100 dark:border-red-900/30' : 'border-gray-100 dark:border-gray-700',
    },
    {
      label: 'Reservations Expiring',
      value: expiringCount,
      icon: Clock,
      color: expiringCount > 0 ? 'text-amber-600' : 'text-gray-600',
      bg: expiringCount > 0 ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-gray-50 dark:bg-gray-800',
      border: expiringCount > 0 ? 'border-amber-100 dark:border-amber-900/30' : 'border-gray-100 dark:border-gray-700',
    },
    {
      label: 'Open Partner Cases',
      value: openCases,
      icon: LifeBuoy,
      color: openCases > 3 ? 'text-amber-600' : 'text-gray-600',
      bg: openCases > 3 ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-gray-50 dark:bg-gray-800',
      border: openCases > 3 ? 'border-amber-100 dark:border-amber-900/30' : 'border-gray-100 dark:border-gray-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <div key={i} className={`p-4 rounded-2xl border ${card.bg} ${card.border}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-white dark:bg-gray-900 shadow-sm ${card.color}`}>
              <card.icon size={18} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</span>
          </div>
          <div className={`text-2xl font-bold ${card.color}`}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
