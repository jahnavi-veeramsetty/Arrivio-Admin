// src/components/dashboard/super/RevenueChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-lg shadow-xl">
        <p className="text-[10px] text-gray-400 uppercase mb-2">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm flex items-center gap-2" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            {p.name}: £{(p.value / 1000).toFixed(0)}k
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ data }) {
  const totalCombined = data.reduce((acc, curr) => acc + curr.b2c + curr.b2b, 0);

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm p-6 relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Total Revenue</p>
          <p className="text-4xl text-emerald-500">£{(totalCombined / 1000).toFixed(0)}k</p>
        </div>
        <button className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 400, textTransform: 'uppercase' }}
              className="text-gray-400 dark:text-gray-600"
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `£${value / 1000}k`}
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
              name="B2C"
              type="monotone" 
              dataKey="b2c" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              name="B2B"
              type="monotone" 
              dataKey="b2b" 
              stroke="#8b5cf6" 
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
