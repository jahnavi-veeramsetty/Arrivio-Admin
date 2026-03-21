const mockData = {
  metrics: [
    { label: 'Upcoming events (7 days)', value: '5',   color: 'text-blue-600'  },
    { label: 'Total registrations',      value: '142', color: 'text-green-700' },
    { label: 'New club join requests',   value: '3',   color: 'text-amber-600' },
    { label: 'Flagged posts',            value: '1',   color: 'text-red-600'   },
    { label: 'Active residents',         value: '312', color: 'text-green-700' },
  ],
  events: [
    { name: 'Rooftop Social',   detail: 'London · Thu 23 Mar',  badge: '42 going', color: 'bg-green-50 text-green-800' },
    { name: 'Language Exchange',detail: 'Berlin · Fri 24 Mar',  badge: '18 going', color: 'bg-green-50 text-green-800' },
    { name: 'Yoga Morning',     detail: 'Amsterdam · Sat 25 Mar',badge: 'Open',    color: 'bg-blue-50 text-blue-800'   },
    { name: 'Film Night',       detail: 'London · Sun 26 Mar',  badge: '31 going', color: 'bg-green-50 text-green-800' },
    { name: 'Board Games',      detail: 'Berlin · Mon 27 Mar',  badge: 'Open',     color: 'bg-blue-50 text-blue-800'   },
  ],
  clubs: [
    { name: 'Photography Club', requests: '2 requests' },
    { name: 'Running Club',     requests: '1 request'  },
  ],
  flagged: [
    { post: 'Post by @user_4821', by: 'Reported by 3 residents' },
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

export default function CommunityDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics — 5 cards */}
      <div>
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Overview</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {mockData.metrics.map((m, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-4 border border-transparent dark:border-white/5 transition-colors">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-tight mb-2">{m.label}</p>
              <p className={`text-2xl font-black italic font-mono ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming events */}
        <Block title="Upcoming events">
          {mockData.events.map((e, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black italic text-gray-800 dark:text-gray-100">{e.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{e.detail}</p>
              </div>
              <Badge color={e.color}>{e.badge}</Badge>
            </div>
          ))}
        </Block>

        {/* Club join requests */}
        <Block
          title="Club join requests"
          badge={<Badge color="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400">3 pending</Badge>}
        >
          {mockData.clubs.map((c, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black italic text-gray-800 dark:text-gray-100">{c.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{c.requests}</p>
              </div>
              <Badge color="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400">Approve?</Badge>
            </div>
          ))}
        </Block>

        {/* Flagged posts */}
        <Block
          title="Flagged posts"
          badge={<Badge color="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400">1 flagged</Badge>}
        >
          {mockData.flagged.map((f, i) => (
            <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex-grow min-w-0">
                <p className="text-sm font-black italic text-gray-800 dark:text-gray-100">{f.post}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{f.by}</p>
              </div>
              <Badge color="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400">Review</Badge>
            </div>
          ))}
        </Block>
      </div>
    </div>
  );
}
