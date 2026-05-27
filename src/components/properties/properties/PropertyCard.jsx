import { MapPin, Building, Users } from 'lucide-react';

export default function PropertyCard({ property, onClick }) {
  return (
    <div
      onClick={() => onClick(property)}
      className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden group hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer active:scale-[0.98] flex flex-col h-full"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm flex items-center gap-1.5 border border-gray-100">
          <div className={`w-1.5 h-1.5 rounded-full ${property.occupancyRate >= 94 ? 'bg-green-500' : property.occupancyRate >= 88 ? 'bg-amber-500' : 'bg-red-500'}`} />
          <span className="text-[10px] font-black italic text-gray-800">{property.occupancyRate}% OCC</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-[#1a6644] text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#1a6644]/20">
            {property.city}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-black italic text-gray-900 dark:text-gray-100 group-hover:text-[#1a6644] transition-colors truncate">
            {property.name}
          </h4>
        </div>

        <div className="flex items-center gap-1.5 text-gray-400 mb-6">
          <MapPin size={12} className="flex-shrink-0" />
          <p className="text-[10px] font-bold uppercase truncate tracking-tight">{property.address}</p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-gray-50 dark:border-gray-700">
          <div className="space-y-1">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">
              {property.category === 'Community Building' ? 'Building Detail' : 'Apartment Detail'}
            </span>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Building size={14} className="text-gray-300" />
              <span className="text-xs font-black">{property.rooms} Rooms</span>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">Monthly Revenue</span>
            <div className="flex items-center gap-2 justify-end text-gray-700 dark:text-gray-300">
              <Users size={14} className="text-gray-300" />
              <span className="text-xs font-black truncate">€{property.monthlyRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
