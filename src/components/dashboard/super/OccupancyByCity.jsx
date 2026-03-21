// src/components/dashboard/super/OccupancyByCity.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

export default function OccupancyByCity({ data }) {
  const getBarColor = (rate) => {
    if (rate >= 85) return '#10b981';
    if (rate >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm p-6 transition-colors">
      <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Occupancy by City</p>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 40, left: 10, bottom: 0 }}>
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis 
              dataKey="city" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase' }}
              className="text-gray-700 dark:text-gray-300"
              width={80}
            />
            <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.rate)} />
              ))}
              <LabelList 
                dataKey="rate" 
                position="right" 
                formatter={(val) => `${val}%`}
                style={{ fontSize: 11, fontWeight: 900, fill: 'currentColor' }}
                className="text-gray-700 dark:text-gray-300"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
