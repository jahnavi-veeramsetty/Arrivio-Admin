// src/components/dashboard/SystemHealth.jsx
import React from 'react';
import { Badge, Block } from './common/DashboardUI';

export default function SystemHealth({ health }) {
  return (
    <Block
      title="System health"
      badge={<Badge color="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400">All OK</Badge>}
    >
      {health.map((h, i) => (
        <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
          <span className="text-sm text-gray-700 dark:text-gray-300 uppercase">{h.service}</span>
          <Badge color={h.color}>{h.status}</Badge>
        </div>
      ))}
    </Block>
  );
}
