// src/components/dashboard/common/DashboardUI.jsx
import React from 'react';

export function Badge({ children, color }) {
  return (
    <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${color}`}>
      {children}
    </span>
  );
}

export function Block({ title, badge, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-colors">
      <div className="bg-gray-50 dark:bg-gray-900/50 px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm text-gray-800 dark:text-gray-100 uppercase tracking-wide">{title}</span>
        {badge}
      </div>
      {children}
    </div>
  );
}
