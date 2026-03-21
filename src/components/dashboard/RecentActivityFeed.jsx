// src/components/dashboard/RecentActivityFeed.jsx
import React from 'react';
import { Badge, Block } from './common/DashboardUI';

const activityStyle = {
  success: { dot: 'bg-green-500', icon: '✓', ring: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' },
  warning: { dot: 'bg-amber-500', icon: '!', ring: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' },
  info:    { dot: 'bg-blue-500',  icon: 'i', ring: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'   },
  error:   { dot: 'bg-red-500',   icon: '✕', ring: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'     },
};

export default function RecentActivityFeed({ activity }) {
  return (
    <Block
      title="Recent activity feed"
      badge={<Badge color="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400">● Live</Badge>}
    >
      {activity.map((a, i) => {
        const s = activityStyle[a.type];
        return (
          <div key={i} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black flex-shrink-0 ${s.ring}`}>
              {s.icon}
            </span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 flex-grow">{a.text}</span>
            <span className="text-[10px] font-black text-gray-400 uppercase">{a.time}</span>
          </div>
        );
      })}
    </Block>
  );
}
