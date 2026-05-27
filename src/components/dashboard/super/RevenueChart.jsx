// src/components/dashboard/super/RevenueChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-lg shadow-xl">
        <p className="text-[10px] text-gray-400 uppercase mb-2">{label}</p>
        {payload.map((point, index) => (
          <p key={index} className="text-sm flex items-center gap-2" style={{ color: point.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: point.color }} />
            {point.name}: €{(point.value / 1000000).toFixed(2)}M
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default function RevenueChart({ data }) {
  const chartData = data.points || [];
  const summaryAnnualRevenue = data.summaryAnnualRevenue || 0;
  const summaryMonthlyRevenue = data.summaryMonthlyRevenue || 0;

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm p-6 relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Annual Revenue</p>
          <p className="text-4xl text-emerald-500">€{(summaryAnnualRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-2">
            Monthly Run-Rate €{summaryMonthlyRevenue.toLocaleString()}
          </p>
        </div>
        <button className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 400, textTransform: 'uppercase' }}
              className="text-gray-400 dark:text-gray-600"
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `€${(value / 1000000).toFixed(1)}M`}
              tick={{ fontSize: 10, fontWeight: 400 }}
              className="text-gray-400 dark:text-gray-600"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: 10, fontWeight: 400, textTransform: 'uppercase', paddingTop: 20 }}
            />
            <Line
              name="Community Buildings"
              type="monotone"
              dataKey="b2b"
              stroke="#1a6644"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              name="Apartments"
              type="monotone"
              dataKey="b2c"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              name="Services"
              type="monotone"
              dataKey="services"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
