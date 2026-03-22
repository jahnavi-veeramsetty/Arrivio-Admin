import { useNavigate } from 'react-router-dom';
import { statusBreakdown } from '../../../mockdata/b2cData';
import { ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function StatusBreakdown() {
  const navigate = useNavigate();
  
  const data = Object.entries(statusBreakdown).map(([label, {count, color, statusKey}]) => ({
    name: label,
    value: count,
    color: color,
    statusKey: statusKey
  }));

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm h-full flex flex-col items-center">
      <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8 self-start">Applications by Status</h2>

      {/* Chart Section */}
      <div className="h-44 w-full relative mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Primary Metric Below */}
      <div className="text-center mb-8">
        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 leading-tight">
          {total} applications active
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Tracking processing stages across the portfolio
        </p>
      </div>

      {/* Legend Grid Below */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full max-w-[320px]">
        {data.map((item) => (
          <div 
            key={item.name} 
            onClick={() => navigate('/admin/b2c/applications', { state: { filterStatus: item.statusKey } })}
            className="flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
              <span className="text-[11px] text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-wider font-bold">{item.name}</span>
            </div>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-200 tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
