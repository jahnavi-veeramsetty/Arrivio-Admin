import { Euro, BarChart3, Percent, Wallet, Users, FileClock } from 'lucide-react';
import { mockInvoices } from '../../../mockdata/financeData';
import { overdueRentRecords, tenantStats } from '../../../mockdata/tenantsData';

export default function FinanceMetricCards() {
  const b2bPendingServiceFees = tenantStats.outstandingRent;
  const b2bOverdueInvoices = mockInvoices
    .filter((invoice) => invoice.status === 'Overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const b2cOverdueRent = overdueRentRecords.reduce((sum, record) => sum + record.amount, 0);
  const outstandingPayments = b2bPendingServiceFees + b2bOverdueInvoices + b2cOverdueRent;

  const metrics = [
    {
      label: 'Annual Revenue',
      value: '€19,679,179',
      sub: 'FY27-28 end-of-Y2 snapshot',
      icon: Euro,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Monthly Run-Rate',
      value: '€1,639,932',
      sub: 'Buildings + apartments + services',
      icon: BarChart3,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      label: 'Outstanding Payments',
      value: `€${outstandingPayments.toLocaleString()}`,
      sub: 'B2B service fees · B2B invoices · B2C rent',
      icon: FileClock,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      alert: true,
    },
    {
      label: 'Gross Margin',
      value: '47.8%',
      sub: 'Gross profit €10,464,534',
      icon: Percent,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Annual EBITDA',
      value: '€5,865,482',
      sub: 'EBITDA margin 26.8%',
      icon: Wallet,
      color: 'text-violet-600',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
    },
    {
      label: 'Team Cost',
      value: '€1,145,800',
      sub: '21 FTE operating team',
      icon: Users,
      color: 'text-slate-600',
      bg: 'bg-slate-50 dark:bg-slate-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${metric.bg} ${metric.color}`}>
                <metric.icon size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{metric.label}</span>
            </div>
            <div>
              <div className={`text-xl font-black italic font-mono ${metric.color}`}>
                {metric.value}
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{metric.sub}</p>
            </div>
          </div>
          {metric.alert && (
            <div className="absolute top-0 right-0 p-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
