import React from 'react';

export default function PropertiesMetrics({ properties }) {
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((acc, p) => acc + (p.rooms || p.units.length), 0);
  const occupiedUnits = properties.reduce((acc, p) => {
    const rooms = p.rooms || p.units.length;
    const rate = (p.occupancyRate || 0) / 100;
    return acc + Math.round(rooms * rate);
  }, 0);

  const metrics = [
    { label: 'Total Properties', value: totalProperties, color: 'text-blue-600' },
    { label: 'Total Units', value: totalUnits.toLocaleString(), color: 'text-purple-600' },
    { label: 'Occupied Units', value: occupiedUnits.toLocaleString(), color: 'text-green-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {metrics.map((m, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{m.label}</p>
          <p className={`text-2xl font-bold mt-1 ${m.color}`}>{m.value}</p>
        </div>
      ))}
    </div>
  );
}
