const mockData = {
  metrics: [
    { label: 'Open cases',           value: '9',   color: 'text-red-600'   },
    { label: 'Assigned to me',       value: '4',   color: 'text-amber-600' },
    { label: 'Avg resolution time',  value: '1.4d',color: 'text-green-700' },
    { label: 'Escalated today',      value: '2',   color: 'text-gray-900'  },
  ],
  myCases: [
    { name: 'Priya Nair',        desc: 'Application status query',  badge: 'High',   color: 'bg-red-50 text-red-800'    },
    { name: 'Tomás Bravo',       desc: 'Move-in date question',      badge: 'Medium', color: 'bg-amber-50 text-amber-800' },
    { name: 'Accenture contact', desc: 'Partner housing query',      badge: 'Low',    color: 'bg-gray-100 text-gray-600'  },
    { name: 'Yuki Tanaka',       desc: 'Document resubmission',      badge: 'Medium', color: 'bg-amber-50 text-amber-800' },
  ],
  actionRequired: [
    { name: 'Aisha Okonkwo', missing: 'Missing visa document',    badge: 'Waiting', color: 'bg-red-50 text-red-800'    },
    { name: 'Jin Park',       missing: 'Proof of income needed',   badge: 'Waiting', color: 'bg-red-50 text-red-800'    },
    { name: 'Chen Wei',       missing: 'Passport expiry issue',    badge: 'Flagged', color: 'bg-amber-50 text-amber-800' },
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

export default function SupportDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics */}
      <div>
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Overview</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {mockData.metrics.map((m, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-4 border border-transparent dark:border-white/5 transition-colors">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-tight mb-2">{m.label}</p>
              <p className={`text-2xl font-black italic font-mono ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout for content blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* My open cases */}
        <Block
          title="My open cases"
          badge={<Badge color="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">4 assigned</Badge>}
        >
          {mockData.myCases.map((c, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black italic text-gray-800 dark:text-gray-100">{c.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{c.desc}</p>
              </div>
              <Badge color={c.color}>{c.badge}</Badge>
            </div>
          ))}
        </Block>

        {/* Action required applications */}
        <Block title="Action required applications">
          {mockData.actionRequired.map((a, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black italic text-gray-800 dark:text-gray-100">{a.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{a.missing}</p>
              </div>
              <Badge color={a.color}>{a.badge}</Badge>
            </div>
          ))}
        </Block>
      </div>
    </div>
  );
}
