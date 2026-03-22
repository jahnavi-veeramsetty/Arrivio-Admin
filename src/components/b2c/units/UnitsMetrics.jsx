import React from 'react';

export default function UnitsMetrics({ units }) {
  const counts = {
    Occupied: units.filter(u => u.status === 'Occupied').length,
    Available: units.filter(u => u.status === 'Available').length,
    Reserved: units.filter(u => u.status === 'Reserved').length,
    Maintenance: units.filter(u => u.status === 'Maintenance').length,
  };

  const metrics = [
    { label: 'Occupied', value: counts.Occupied, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Available', value: counts.Available, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Reserved', value: counts.Reserved, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Maintenance', value: counts.Maintenance, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {metrics.map((m, i) => (
        <div key={i} className={`${m.bg} p-3 rounded-lg border border-transparent flex flex-col items-center justify-center text-center`}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">{m.label}</p>
          <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
        </div>
      ))}
    </div>
  );
}
