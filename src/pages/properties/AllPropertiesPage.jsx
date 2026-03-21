import { useState, useMemo } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import PropertyCard from '../../components/properties/properties/PropertyCard';
import PropertyDetail from '../../components/properties/properties/PropertyDetail';
import { mockProperties } from '../../mockdata/propertiesData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import { Plus, Search, Filter } from 'lucide-react';

export default function AllPropertiesPage() {
  const { activeRole, user } = useAuth();
  const { addToast } = useToast();
  const role = activeRole || user?.roles?.[0];

  const canAddProperty = role === 'super_admin';
  const canArchive = role === 'super_admin';

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const cities = ['All', ...new Set(mockProperties.map(p => p.city))];

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase());
      const matchCity = selectedCity === 'All' || p.city === selectedCity;
      return matchSearch && matchCity;
    });
  }, [search, selectedCity]);

  const handleCardClick = (property) => {
    setSelectedProperty(property);
    setIsDetailOpen(true);
  };

  const handleAction = (type) => {
    if (type === 'add_unit') {
      addToast({
        title: 'Entering Creation Mode',
        description: 'Specify unit reference, type, and starting rate for the new listing.',
        type: 'info'
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader 
          title="Portfolio Management" 
          description="Manage Arrivio's global property inventory, units, and operational status."
          breadcrumbs={['Properties', 'All']}
        />
        {canAddProperty && (
          <button className="flex items-center gap-2 px-6 py-3 bg-[#1a6644] text-white rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-[#155236] transition-all shadow-lg shadow-[#1a6644]/20 active:scale-95">
             <Plus size={18} /> Add Property
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm flex flex-wrap items-center gap-6">
         <div className="relative flex-grow max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, address, or manager..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-3xl text-sm font-bold focus:ring-2 focus:ring-[#1a6644] transition-all"
            />
         </div>
         
         <div className="flex items-center gap-3">
            <Filter size={16} className="text-gray-400" />
            <div className="flex bg-gray-50/50 dark:bg-gray-900/50 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800">
               {cities.map(city => (
                  <button 
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                       selectedCity === city 
                       ? 'bg-white dark:bg-gray-800 text-[#1a6644] shadow-md shadow-gray-200/20' 
                       : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                     {city}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         {filteredProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={handleCardClick}
            />
         ))}
      </div>

      <PropertyDetail 
        property={selectedProperty}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAction={handleAction}
        canArchive={canArchive}
      />
    </div>
  );
}
