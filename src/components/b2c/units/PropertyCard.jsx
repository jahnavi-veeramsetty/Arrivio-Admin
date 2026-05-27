import React from 'react';

export default function PropertyCard({ property, onClick }) {
  const breakdown = property.unitBreakdown || {};

  const roomTypes = [
    { label: 'Single Room', count: breakdown['Single Room'] || 0 },
    { label: 'Shared Room', count: breakdown['Shared Room'] || 0 },
    { label: 'Studio', count: breakdown['Studio'] || 0 },
  ];

  const totalDisplayedUnits = property.rooms || roomTypes.reduce((sum, rt) => sum + rt.count, 0);

  return (
    <div 
      onClick={() => onClick(property.id)}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="h-40 overflow-hidden bg-gray-200 relative">
        <img 
          src={property.image || `https://picsum.photos/seed/${property.id}/400/200`} 
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/20">
          {totalDisplayedUnits} Total Units
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{property.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{property.city} · {property.address}</p>
          </div>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
            property.status === 'active' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
          }`}>
            {property.status}
          </span>
        </div>

        <div className="my-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Occupancy</span>
            <span className="font-semibold text-gray-900 dark:text-white">{property.occupancyRate}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full" 
              style={{ width: `${property.occupancyRate}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {roomTypes.map((rt, idx) => (
            <div key={idx} className="flex-1 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-lg p-2 text-center">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">{rt.label}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{rt.count}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
