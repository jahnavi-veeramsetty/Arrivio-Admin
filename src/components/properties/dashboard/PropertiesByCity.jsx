import { MapPin, Users, Building } from 'lucide-react';

export default function PropertiesByCity({ properties, cities }) {
  // Group properties by city
  const cityGroups = cities.filter(c => c.properties > 0).map(city => ({
    ...city,
    propertyList: properties.filter(p => p.city === city.name)
  }));

  return (
    <div className="space-y-8">
      {cityGroups.map((city, idx) => (
        <section key={idx}>
          <div className="flex items-center gap-4 mb-4">
             <div className="h-px bg-gray-100 dark:bg-gray-800 flex-grow" />
             <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm">
                <MapPin size={12} className="text-[#1a6644]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800 dark:text-gray-200">{city.name}</span>
             </div>
             <div className="h-px bg-gray-100 dark:bg-gray-800 flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {city.propertyList.map((prop, pIdx) => (
              <div key={pIdx} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden group hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer active:scale-[0.98]">
                 <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                       <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${prop.occupancyRate > 85 ? 'bg-green-500' : prop.occupancyRate < 75 ? 'bg-red-500' : 'bg-amber-500'}`} />
                          <span className="text-[10px] font-black italic">{prop.occupancyRate}% OCC</span>
                       </div>
                    </div>
                 </div>
                 <div className="p-6">
                    <h4 className="text-base font-black italic text-gray-900 dark:text-gray-100 mb-2 truncate group-hover:text-[#1a6644] transition-colors">{prop.name}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase truncate mb-4">{prop.address}</p>
                    
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50 dark:border-gray-700">
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-tight text-gray-500">{prop.units?.length || 0} Units</span>
                       </div>
                       <div className="flex items-center gap-2 justify-end">
                          <Users size={14} className="text-gray-300" />
                          <span className="text-[10px] font-black uppercase tracking-tight text-gray-500 truncate">{prop.manager.split(' ')[0]}</span>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
