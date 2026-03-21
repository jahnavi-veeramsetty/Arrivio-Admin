export default function PartnersByType({ partners }) {
  const types = [...new Set(partners.map(p => p.type))];
  const stats = types.map(type => {
    const filtered = partners.filter(p => p.type === type);
    return {
      type,
      count: filtered.length,
      revenue: filtered.reduce((sum, p) => sum + p.revenue, 0),
    };
  }).sort((a, b) => b.revenue - a.revenue);

  const colors = {
    Employer: 'bg-blue-500',
    Agency: 'bg-purple-500',
    University: 'bg-teal-500',
    Investor: 'bg-amber-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-6 px-1 uppercase tracking-tight">Partners by Type</h3>
      <div className="space-y-5">
        {stats.map(s => {
          const maxRevenue = Math.max(...stats.map(x => x.revenue));
          const width = (s.revenue / maxRevenue) * 100;
          
          return (
            <div key={s.type} className="group">
              <div className="flex justify-between text-xs mb-1.5 px-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{s.type}</span>
                <span className="text-gray-400 font-medium">
                  <span className="text-gray-700 dark:text-gray-200">{s.count}</span> Partners · <span className="text-gray-700 dark:text-gray-200">${s.revenue.toLocaleString()}</span>
                </span>
              </div>
              <div className="h-2.5 bg-gray-50 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${colors[s.type] || 'bg-gray-400'} transition-all duration-500 group-hover:brightness-110`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
