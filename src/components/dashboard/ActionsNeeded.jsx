// src/components/dashboard/ActionsNeeded.jsx
import React from 'react';
import { Badge, Block } from './common/DashboardUI';

export default function ActionsNeeded({ actions }) {
  return (
    <Block
      title="Actions needed"
      badge={<Badge color="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400">{actions.length} items</Badge>}
    >
      {actions.map((a, i) => (
        <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight">{a.label}</span>
          <Badge color={a.color}>{a.badge}</Badge>
        </div>
      ))}
    </Block>
  );
}
