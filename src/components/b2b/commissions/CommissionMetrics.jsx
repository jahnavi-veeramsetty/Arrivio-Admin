import { DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CommissionMetrics({ commissions }) {
  const totalPaid = commissions.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.amount, 0);
  const totalPending = commissions.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.amount, 0);
  const overdueCount = commissions.filter(c => c.status === 'Pending' && new Date(c.dueDate) < new Date()).length;

  const cards = [
    {
      label: 'Total Paid Out',
      value: `$${totalPaid.toLocaleString()}`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50/50 dark:bg-green-900/10',
    },
    {
      label: 'Pending Invoices',
      value: `$${totalPending.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-amber-600',
      bg: 'bg-amber-50/50 dark:bg-amber-900/10',
    },
    {
      label: 'Avg. Commission',
      value: `$${Math.round(totalPaid / (commissions.filter(c => c.status === 'Paid').length || 1))}`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50/50 dark:bg-blue-900/10',
    },
    {
      label: 'Overdue Payments',
      value: overdueCount,
      icon: AlertCircle,
      color: overdueCount > 0 ? 'text-red-500' : 'text-gray-400',
      bg: overdueCount > 0 ? 'bg-red-50/50 dark:bg-red-900/10' : 'bg-gray-50/50 dark:bg-gray-800/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className={`p-6 rounded-3xl border border-gray-100 dark:border-gray-800 ${card.bg} relative overflow-hidden group hover:shadow-lg transition-all duration-300`}>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl bg-white dark:bg-gray-900 shadow-sm ${card.color}`}>
                <card.icon size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{card.label}</span>
            </div>
            <div className={`text-2xl font-black italic font-mono ${card.color}`}>
              {card.value}
            </div>
          </div>
          <card.icon size={80} className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform" />
        </div>
      ))}
    </div>
  );
}
