const mockData = {
  metrics: [
    { label: 'Active partners',            value: '18',  color: 'text-green-700' },
    { label: 'New partner applications',   value: '4',   color: 'text-amber-600' },
    { label: 'Capacity fill rate',         value: '78%', color: 'text-green-700' },
    { label: 'Employees awaiting housing', value: '11',  color: 'text-red-600'   },
    { label: 'Reservations expiring soon', value: '3',   color: 'text-amber-600' },
    { label: 'Open partner cases',         value: '7',   color: 'text-gray-900'  },
  ],
  applications: [
    { company: 'Wipro Technologies', type: 'Employer · India',       badge: 'Review',      color: 'bg-amber-50 text-amber-800' },
    { company: 'EY Relocation Agency',type: 'Agency · UK',           badge: 'Docs needed', color: 'bg-blue-50 text-blue-800'   },
    { company: 'TU Berlin',          type: 'University · Germany',   badge: 'Review',      color: 'bg-amber-50 text-amber-800' },
    { company: 'GlobalMove Ltd',     type: 'Agency · Netherlands',   badge: 'Review',      color: 'bg-amber-50 text-amber-800' },
  ],
  employees: [
    { company: 'Accenture', count: '4 employees', detail: 'London · Start Apr 1', badge: 'Urgent', color: 'bg-red-50 text-red-800'    },
    { company: 'Deloitte',  count: '3 employees', detail: 'Berlin · Start Apr 5', badge: 'Soon',   color: 'bg-amber-50 text-amber-800' },
    { company: 'Siemens',   count: '4 employees', detail: 'Amsterdam · Apr 10',   badge: 'Planned',color: 'bg-gray-100 text-gray-600'  },
  ],
  reservations: [
    { company: 'KPMG',  rooms: '8 rooms',   city: 'London',    badge: 'Expires Apr 2',  color: 'bg-red-50 text-red-800'    },
    { company: 'Wipro', rooms: '12 rooms',  city: 'Berlin',    badge: 'Expires Apr 15', color: 'bg-amber-50 text-amber-800'},
    { company: 'EY',    rooms: '6 rooms',   city: 'Amsterdam', badge: 'Expires May 1',  color: 'bg-gray-100 text-gray-600' },
  ],
};

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

export default function SalesDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics */}
      <div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Overview</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {mockData.metrics.map((m, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-4 border border-transparent dark:border-white/5 transition-colors">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-tight mb-2">{m.label}</p>
              <p className={`text-2xl ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Partner applications */}
        <Block
          title="Partner applications pending"
          badge={<Badge color="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400">4 pending</Badge>}
        >
          {mockData.applications.map((a, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-100">{a.company}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tight">{a.type}</p>
              </div>
              <Badge color={a.color}>{a.badge}</Badge>
            </div>
          ))}
        </Block>

        {/* Employees awaiting housing */}
        <Block
          title="Employees awaiting housing"
          badge={<Badge color="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400">11 unassigned</Badge>}
        >
          {mockData.employees.map((e, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-100">{e.company} — {e.count}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tight">{e.detail}</p>
              </div>
              <Badge color={e.color}>{e.badge}</Badge>
            </div>
          ))}
        </Block>

        {/* Reservations expiring */}
        <Block title="Reservations expiring soon">
          {mockData.reservations.map((r, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-100">{r.company} — {r.rooms}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tight">{r.city}</p>
              </div>
              <Badge color={r.color}>{r.badge}</Badge>
            </div>
          ))}
        </Block>
      </div>
    </div>
  );
}
