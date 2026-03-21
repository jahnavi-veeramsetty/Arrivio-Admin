import { TrendingUp, TrendingDown, DollarSign, FileText, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

export default function FinanceMetricCards({ data }) {
  const metrics = [
    { 
      label: 'Revenue this Month', 
      value: `£175,000`, 
      sub: '+6.5% vs last month',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      label: 'MoM Change', 
      value: '+£10,700', 
      sub: 'Trend: Upward',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      label: 'Outstanding Invoices', 
      value: `£22,100`, 
      sub: 'Across 8 partners',
      icon: FileText,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      alert: true // > £20k
    },
    { 
      label: 'Overdue Invoices', 
      value: '2', 
      sub: 'Requires immediate action',
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
      alert: true // exists
    },
    { 
      label: 'Refunds Pending', 
      value: '4', 
      sub: 'Processing time: 1.2d',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      alert: true // > 3
    },
    { 
      label: 'Security Liability', 
      value: '£184,500', 
      sub: 'Held in escrow',
      icon: ShieldCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className={`p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow`}>
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                <m.icon size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{m.label}</span>
            </div>
            <div>
              <div className={`text-xl font-black italic font-mono ${m.color}`}>
                {m.value}
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{m.sub}</p>
            </div>
          </div>
          {m.alert && (
            <div className="absolute top-0 right-0 p-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
