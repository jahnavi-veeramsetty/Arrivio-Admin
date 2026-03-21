const mockData = {
  metrics: [
    { label: 'Revenue this month',        value: '£214k', color: 'text-green-700' },
    { label: 'vs last month',             value: '+12%',  color: 'text-green-700' },
    { label: 'Outstanding invoices total',value: '£48k',  color: 'text-amber-600' },
    { label: 'Overdue invoices',          value: '3',     color: 'text-red-600'   },
    { label: 'Refunds pending',           value: '5',     color: 'text-amber-600' },
    { label: 'Security deposit liability',value: '£92k',  color: 'text-gray-900'  },
  ],
  overdue: [
    { partner: 'Accenture Ltd',  invoice: 'Invoice #1042', days: '12 days', color: 'bg-red-50 text-red-800'    },
    { partner: 'Deloitte UK',    invoice: 'Invoice #1039', days: '5 days',  color: 'bg-red-50 text-red-800'    },
    { partner: 'EY Relocation',  invoice: 'Invoice #1041', days: '2 days',  color: 'bg-amber-50 text-amber-800'},
  ],
  upcoming: [
    { partner: 'Wipro Technologies', due: 'Due Apr 1', amount: '£8,400'  },
    { partner: 'KPMG Partners',      due: 'Due Apr 1', amount: '£5,200'  },
    { partner: 'Siemens AG',         due: 'Due Apr 1', amount: '£11,600' },
    { partner: 'Accenture Ltd',      due: 'Due Apr 1', amount: '£14,200' },
  ],
  refunds: [
    { name: 'Marco Silva',  reason: 'Rejected applicant', amount: '£500'   },
    { name: 'Yuki Tanaka',  reason: 'Early departure',    amount: '£1,200' },
    { name: 'Chen Wei',     reason: 'Rejected applicant', amount: '£500'   },
    { name: 'Leila Haddad', reason: 'Overpayment',        amount: '£320'   },
  ],
};

function Badge({ children, color }) {
  return <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${color}`}>{children}</span>;
}

function Block({ title, badge, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-colors">
      <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm font-black italic text-gray-800 dark:text-gray-100 uppercase tracking-tight">{title}</span>
        {badge}
      </div>
      {children}
    </div>
  );
}

export default function FinanceDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics */}
      <div>
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Overview</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {mockData.metrics.map((m, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-4 border border-transparent dark:border-white/5 transition-colors">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-tight mb-2">{m.label}</p>
              <p className={`text-2xl font-black italic font-mono ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Overdue invoices */}
        <Block
          title="Overdue B2B invoices"
          badge={<Badge color="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400">3 overdue</Badge>}
        >
          {mockData.overdue.map((o, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black italic text-gray-800 dark:text-gray-100">{o.partner}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{o.invoice}</p>
              </div>
              <Badge color={o.color}>{o.days}</Badge>
            </div>
          ))}
        </Block>

        {/* Upcoming invoice dates */}
        <Block title="Upcoming invoice dates">
          {mockData.upcoming.map((u, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black italic text-gray-800 dark:text-gray-100">{u.partner}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{u.due}</p>
              </div>
              <Badge color="bg-gray-100 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 font-mono italic">{u.amount}</Badge>
            </div>
          ))}
        </Block>

        {/* Refunds pending */}
        <Block
          title="Refunds pending"
          badge={<Badge color="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400">5 pending</Badge>}
        >
          {mockData.refunds.map((r, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black italic text-gray-800 dark:text-gray-100">{r.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{r.reason}</p>
              </div>
              <Badge color="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 font-mono italic">{r.amount}</Badge>
            </div>
          ))}
        </Block>
      </div>
    </div>
  );
}
