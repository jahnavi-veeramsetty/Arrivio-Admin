import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import CitiesTable from '../../components/properties/cities/CitiesTable';
import CityDetail from '../../components/properties/cities/CityDetail';
import { mockCities } from '../../mockdata/propertiesData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import { Plus, Search, Info } from 'lucide-react';

export default function CitiesPage() {
  const { activeRole, user } = useAuth();
  const { addToast } = useToast();
  const role = activeRole || user?.roles?.[0];

  const canManageCities = role === 'super_admin';
  const [selectedCity, setSelectedCity] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleAction = (type, city) => {
    if (type === 'view') {
      setSelectedCity(city);
      setIsDetailOpen(true);
    } else if (type === 'toggle') {
      addToast({
        title: 'Status Update Requested',
        description: `Submitting status change for ${city.name} to global configuration.`,
        type: 'info'
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader 
          title="City Management" 
          description="Manage active territories, regional managers, and market availability status."
          breadcrumbs={['Properties', 'Cities']}
        />
        {canManageCities && (
          <button className="flex items-center gap-2 px-6 py-3 bg-[#1a6644] text-white rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-[#155236] transition-all shadow-lg shadow-[#1a6644]/20">
             <Plus size={18} /> New Territory
          </button>
        )}
      </div>

      {!canManageCities && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
           <div className="p-2 bg-white rounded-xl shadow-sm">
              <Info className="text-blue-600" size={18} />
           </div>
           <div>
              <p className="text-xs font-black text-blue-900 uppercase tracking-widest">Regional View Only</p>
              <p className="text-[10px] text-blue-700 font-bold uppercase tracking-tight">Your role allows viewing city metrics but restricts modifications to territory-level settings.</p>
           </div>
        </div>
      )}

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
         <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm mb-6 flex items-center gap-4">
            <Search className="text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Filter territories by name, country or manager..." 
              className="bg-transparent border-none text-sm font-bold focus:ring-0 w-full"
            />
         </div>
         <CitiesTable 
            cities={mockCities} 
            onAction={handleAction} 
            canEdit={canManageCities} 
         />
      </div>

      <CityDetail 
        city={selectedCity}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
