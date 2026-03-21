import { Building2, Home, MapPin, Percent, Wrench } from 'lucide-react';

export default function PropertiesMetricCards({ properties, cities, maintenance }) {
  const totalUnits = properties.reduce((acc, curr) => acc + curr.units, 0);
  const avgOccupancy = Math.round(properties.reduce((acc, curr) => acc + curr.occupancy, 0) / properties.length);
  const maintenanceCount = maintenance.length;

  const metrics = [
    { 
      label: 'Total Properties', 
      value: properties.length, 
      sub: 'Across active cities',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      label: 'Total Units', 
      value: totalUnits, 
      sub: 'Platform capacity',
      icon: Home,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    { 
      label: 'Active Cities', 
      value: cities.filter(c => c.status === 'Active').length, 
      sub: `${cities.length} total territories`,
      icon: MapPin,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    { 
      label: 'Avg Occupancy', 
      value: `${avgOccupancy}%`, 
      sub: avgOccupancy < 75 ? 'Below Target' : 'On Track',
      icon: Percent,
      color: avgOccupancy < 75 ? 'text-red-600' : 'text-[#1a6644]',
      bg: avgOccupancy < 75 ? 'bg-red-50' : 'bg-[#1a6644]/10',
      alert: avgOccupancy < 75
    },
    { 
      label: 'In Maintenance', 
      value: maintenanceCount, 
      sub: 'Action required',
      icon: Wrench,
      color: maintenanceCount > 5 ? 'text-amber-600' : 'text-gray-600',
      bg: maintenanceCount > 5 ? 'bg-amber-50' : 'bg-gray-50',
      alert: maintenanceCount > 5
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                <m.icon size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{m.label}</span>
            </div>
            <div>
              <div className={`text-2xl font-black italic font-mono ${m.color}`}>
                {m.value}
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{m.sub}</p>
            </div>
          </div>
          {m.alert && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          )}
        </div>
      ))}
    </div>
  );
}
