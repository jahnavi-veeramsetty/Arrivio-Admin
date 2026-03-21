// src/components/dashboard/super/ApplicationFunnel.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

export default function ApplicationFunnel({ data }) {
  // We use a vertical bar chart to simulate a funnel
  const colors = ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#10b981'];

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm p-6 transition-colors">
      <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6">Application Pipeline</p>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, left: 10, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="stage" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}
              className="text-gray-700 dark:text-gray-300"
              width={80}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={35}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <LabelList 
                dataKey="count" 
                position="right" 
                formatter={(val, i) => `${val} (${data[i]?.conversion || ''})`}
                style={{ fontSize: 10, fontWeight: 900, fill: 'currentColor' }}
                className="text-gray-700 dark:text-gray-300"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-[10px] font-black text-gray-400 uppercase text-center italic">Conversion rates track progress from previous stage</p>
      </div>
    </div>
  );
}
