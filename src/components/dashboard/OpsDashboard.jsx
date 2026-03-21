const mockData = {
  metrics: [
    { label: 'Applications pending review', value: '14', color: 'text-amber-600' },
    { label: 'Move-ins this week',          value: '6',  color: 'text-blue-600'  },
    { label: 'Move-outs this week',         value: '4',  color: 'text-gray-900'  },
    { label: 'Units available',             value: '23', color: 'text-green-700' },
    { label: 'Unsigned agreements',         value: '6',  color: 'text-amber-600' },
    { label: 'Open maintenance requests',   value: '8',  color: 'text-red-600'   },
  ],
  applications: [
    { name: 'Priya Nair',      unit: 'Studio · London',    badge: 'Day 3',       color: 'bg-amber-50 text-amber-800' },
    { name: 'Marco Silva',     unit: '1BR · Berlin',       badge: 'Day 5 ⚠',    color: 'bg-red-50 text-red-800'     },
    { name: 'Aisha Okonkwo',   unit: 'Studio · Amsterdam', badge: 'Docs needed', color: 'bg-blue-50 text-blue-800'   },
    { name: 'Jin Park',        unit: '1BR · Amsterdam',    badge: 'Day 1',       color: 'bg-gray-100 text-gray-600'  },
  ],
  unsigned: [
    { name: 'Tomás Bravo',  unit: '2BR · London'    },
    { name: 'Leila Haddad', unit: 'Studio · Berlin'  },
    { name: 'Jin Park',     unit: '1BR · Amsterdam'  },
  ],
  schedule: [
    { day: 'Mon', type: 'Move-in',  name: 'Priya Nair · London',  badge: 'Confirmed',   color: 'bg-green-50 text-green-800'  },
    { day: 'Wed', type: 'Move-out', name: 'James Wu · Berlin',    badge: 'Confirmed',   color: 'bg-green-50 text-green-800'  },
    { day: 'Fri', type: 'Move-in',  name: 'Leila Haddad · Berlin',badge: 'Pending docs',color: 'bg-amber-50 text-amber-800'  },
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

export default function OpsDashboard() {
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

      {/* Content blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Applications under review */}
        <Block
          title="Applications under review"
          badge={<Badge color="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400">14 pending</Badge>}
        >
          {mockData.applications.map((a, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-100">{a.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tight">{a.unit}</p>
              </div>
              <Badge color={a.color}>{a.badge}</Badge>
            </div>
          ))}
        </Block>

        {/* Unsigned agreements */}
        <Block
          title="Unsigned agreements"
          badge={<Badge color="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400">Action needed</Badge>}
        >
          {mockData.unsigned.map((u, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-100">{u.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tight">{u.unit}</p>
              </div>
              <Badge color="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400">Countersign</Badge>
            </div>
          ))}
        </Block>

        {/* Schedule */}
        <Block title="This week's schedule">
          {mockData.schedule.map((s, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="w-8 text-center flex-shrink-0">
                <p className="text-[10px] text-gray-500 uppercase">{s.day}</p>
                <p className="text-[8px] text-gray-400 uppercase">{s.type}</p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">{s.name}</p>
              <Badge color={s.color}>{s.badge}</Badge>
            </div>
          ))}
        </Block>
      </div>
    </div>
  );
}
