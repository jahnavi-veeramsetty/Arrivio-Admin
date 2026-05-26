export default function PartnersByType({ partners }) {
  const order = ['Employers', 'Recruitment Agencies', 'Universities'];
  const stats = order.map((type) => {
    const filtered = partners.filter((partner) => partner.type === type);

    return {
      type,
      count: filtered.reduce((sum, partner) => sum + (partner.partnerCount || 1), 0),
      revenue: filtered.reduce((sum, partner) => sum + partner.revenue, 0),
    };
  });

  const colors = {
    Employers: 'bg-[#1a6644]',
    'Recruitment Agencies': 'bg-[#0ea5e9]',
    Universities: 'bg-[#f59e0b]',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-6 px-1 uppercase tracking-tight">Partners by Type</h3>
      <div className="space-y-5">
        {stats.map((stat) => {
          const maxRevenue = Math.max(...stats.map((entry) => entry.revenue), 1);
          const width = (stat.revenue / maxRevenue) * 100;

          return (
            <div key={stat.type} className="group">
              <div className="flex justify-between text-xs mb-1.5 px-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{stat.type}</span>
                <span className="text-gray-400 font-medium">
                  <span className="text-gray-700 dark:text-gray-200">{stat.count}</span> partners · <span className="text-gray-700 dark:text-gray-200">€{stat.revenue.toLocaleString()}</span>
                </span>
              </div>
              <div className="h-2.5 bg-gray-50 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors[stat.type] || 'bg-gray-400'} transition-all duration-500 group-hover:brightness-110`}
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
