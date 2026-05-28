import { Building2, Users, Home, Percent, Clock, Euro } from 'lucide-react';

export default function MetricCards({ partners, employees, reservations }) {
  const totalPartners = partners.reduce((sum, partner) => sum + (partner.partnerCount || 1), 0);
  const totalReserved = reservations.reduce((sum, reservation) => sum + reservation.roomsReserved, 0);
  const pipelineReserved = reservations
    .filter((reservation) => reservation.status === 'Reserved')
    .reduce((sum, reservation) => sum + reservation.roomsReserved, 0);
  const maintenanceBuffer = reservations
    .filter((reservation) => reservation.status === 'Maintenance Buffer')
    .reduce((sum, reservation) => sum + reservation.roomsReserved, 0);
  const pipelineEmployees = employees.filter((employee) => employee.daysUntilStart);

  const cards = [
    { label: 'B2B Partners', value: totalPartners, sub: '27 employers · 12 agencies · 8 universities', icon: Building2, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-900/30' },
    { label: 'B2B2C Tenants', value: '2,097', sub: '', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-900/30' },
    { label: 'Reserved Rooms', value: totalReserved, sub: `${pipelineReserved} pipeline · ${maintenanceBuffer} Ready`, icon: Home, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-100 dark:border-amber-900/30' },
    { label: 'B2B Occupancy', value: '96%', sub: '', icon: Percent, color: 'text-[#1a6644]', bg: 'bg-[#1a6644]/10 dark:bg-[#1a6644]/20', border: 'border-[#1a6644]/20 dark:border-[#1a6644]/30' },
    { label: 'Pipeline Move-ins', value: pipelineEmployees.length, sub: 'Average start lead time ~34 days', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-100 dark:border-purple-900/30' },
    { label: 'Service Fee', value: '€127,400', sub: 'Employer, agency, and university invoices', icon: Euro, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-100 dark:border-red-900/30' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div key={index} className={`p-4 rounded-2xl border ${card.bg} ${card.border}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-white dark:bg-gray-900 shadow-sm ${card.color}`}>
              <card.icon size={18} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</span>
          </div>
          <div className={`text-2xl font-bold ${card.color}`}>
            {card.value}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-2">
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
