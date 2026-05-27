import { Euro, TrendingUp, AlertCircle, FileText } from 'lucide-react';

export default function ServiceFeeMetrics({ serviceFees }) {
  const totalPending = serviceFees
    .filter((serviceFee) => serviceFee.status === 'Pending')
    .reduce((sum, serviceFee) => sum + serviceFee.amount, 0);

  const cards = [
    { label: 'Pending Total', value: `€${totalPending.toLocaleString()}`, icon: Euro, color: 'text-amber-600', bg: 'bg-amber-50/50 dark:bg-amber-900/10' },
    { label: 'Employer Fees', value: '€74,200', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50/50 dark:bg-green-900/10' },
    { label: 'Agency Service Fees', value: '€31,800', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50/50 dark:bg-blue-900/10' },
    { label: 'University Invoices', value: '€21,400', icon: AlertCircle, color: 'text-purple-600', bg: 'bg-purple-50/50 dark:bg-purple-900/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className={`p-6 rounded-3xl border border-gray-100 dark:border-gray-800 ${card.bg} relative overflow-hidden group hover:shadow-lg transition-all duration-300`}>
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
