import { mockInvoices, mockRefunds, mockDeposits } from '../../mockdata/financeData';

const metrics = [
  { label: 'Annual revenue', value: '€19,679,179', color: 'text-green-700' },
  { label: 'Monthly run-rate', value: '€1,639,932', color: 'text-green-700' },
  { label: 'Pending service fees', value: '€127,400', color: 'text-amber-600' },
  { label: 'Overdue invoices', value: `${mockInvoices.filter((invoice) => invoice.status === 'Overdue').length}`, color: 'text-red-600' },
  { label: 'Refunds pending', value: `${mockRefunds.filter((refund) => refund.status === 'Pending').length}`, color: 'text-amber-600' },
  { label: 'Security deposit liability', value: `€${mockDeposits.reduce((sum, deposit) => sum + deposit.amount, 0).toLocaleString()}`, color: 'text-gray-900' },
];

const overdue = mockInvoices
  .filter((invoice) => invoice.status === 'Overdue')
  .map((invoice) => ({
    partner: invoice.partner,
    invoice: invoice.id,
    days: `${invoice.daysOverdue} days`,
    color: 'bg-red-50 text-red-800',
  }));

const upcoming = mockInvoices
  .filter((invoice) => invoice.status === 'Sent' || invoice.status === 'Draft')
  .map((invoice) => ({
    partner: invoice.partner,
    due: `Due ${new Date(invoice.dueDate).toLocaleDateString()}`,
    amount: `€${invoice.amount.toLocaleString()}`,
  }));

const refunds = mockRefunds.map((refund) => ({
  name: refund.tenant,
  reason: refund.reason,
  amount: `€${refund.amount.toLocaleString()}`,
}));

function Badge({ children, color }) {
  return <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${color}`}>{children}</span>;
}

function Block({ title, badge, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-colors">
      <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm text-gray-800 dark:text-gray-100 uppercase tracking-wide">{title}</span>
        {badge}
      </div>
      {children}
    </div>
  );
}

export default function FinanceDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Overview</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-4 border border-transparent dark:border-white/5 transition-colors">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-2">{metric.label}</p>
              <p className={`text-2xl ${metric.color}`}>{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Block
          title="Overdue B2B invoices"
          badge={<Badge color="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400">{overdue.length} overdue</Badge>}
        >
          {overdue.map((item, index) => (
            <div key={index} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-100">{item.partner}</p>
                <p className="text-[10px] text-gray-400 uppercase">{item.invoice}</p>
              </div>
              <Badge color={item.color}>{item.days}</Badge>
            </div>
          ))}
        </Block>

        <Block title="Upcoming invoice dates">
          {upcoming.map((item, index) => (
            <div key={index} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-100">{item.partner}</p>
                <p className="text-[10px] text-gray-400 uppercase">{item.due}</p>
              </div>
              <Badge color="bg-gray-100 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400">{item.amount}</Badge>
            </div>
          ))}
        </Block>

        <Block
          title="Refunds pending"
          badge={<Badge color="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400">{mockRefunds.filter((refund) => refund.status === 'Pending').length} pending</Badge>}
        >
          {refunds.map((refund, index) => (
            <div key={index} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-100">{refund.name}</p>
                <p className="text-[10px] text-gray-400 uppercase">{refund.reason}</p>
              </div>
              <Badge color="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400">{refund.amount}</Badge>
            </div>
          ))}
        </Block>
      </div>
    </div>
  );
}
