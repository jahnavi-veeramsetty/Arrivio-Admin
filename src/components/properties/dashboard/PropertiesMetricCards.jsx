import { Building2, Home, MapPin, Percent, Wrench } from 'lucide-react';

export default function PropertiesMetricCards({ properties, cities, maintenance }) {
  const communityBuildings = properties.filter((property) => property.category === 'Community Building');
  const apartmentPortfolios = properties.filter((property) => property.category === 'Apartment Portfolio');
  const totalRooms = properties.reduce((sum, property) => sum + (property.rooms || 0), 0);
  const weightedOccupancy = Math.round(properties.reduce((sum, property) => sum + ((property.rooms || 0) * property.occupancyRate), 0) / totalRooms);

  const metrics = [
    { label: 'Community Buildings', value: communityBuildings.length, sub: 'Live at end of Y2', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Apartments Leased', value: apartmentPortfolios.reduce((sum, property) => sum + (property.apartments || 0), 0), sub: 'Distributed across six cities', icon: Home, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Rooms Under Management', value: totalRooms.toLocaleString(), sub: '2,400 in buildings · 720 in apartments', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Portfolio Occupancy', value: `${weightedOccupancy}%`, sub: 'Wave 1 stabilized · Wave 2 ramping', icon: Percent, color: 'text-[#1a6644]', bg: 'bg-[#1a6644]/10' },
    { label: 'Maintenance Buffer', value: maintenance.length, sub: 'Low operational load in live assets', icon: Wrench, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${metric.bg} ${metric.color}`}>
                <metric.icon size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{metric.label}</span>
            </div>
            <div>
              <div className={`text-2xl font-black italic font-mono ${metric.color}`}>
                {metric.value}
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{metric.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
