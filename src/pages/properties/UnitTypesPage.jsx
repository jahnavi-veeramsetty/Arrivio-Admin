import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import UnitTypesTable from '../../components/properties/types/UnitTypesTable';
import UnitTypeDetail from '../../components/properties/types/UnitTypeDetail';
import { mockUnitTypes } from '../../mockdata/propertiesData';
import { useToast } from '../../components/ui/Toast';
import { Plus, Search, Info } from 'lucide-react';

export default function UnitTypesPage() {
  const { addToast } = useToast();
  const [selectedType, setSelectedType] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleAction = (type, unitType) => {
    if (type === 'view' || type === 'edit') {
      setSelectedType(unitType);
      setIsDetailOpen(true);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader 
          title="Unit Types" 
          description="Define standardized unit configurations, size ranges, and baseline amenities for the portfolio."
          breadcrumbs={['Properties', 'Types']}
        />
        <button className="flex items-center gap-2 px-6 py-3 bg-[#1a6644] text-white rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-[#155236] transition-all shadow-lg shadow-[#1a6644]/20 active:scale-95">
           <Plus size={18} /> New Unit Type
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-4 animate-in fade-in duration-700">
         <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-6 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex-grow max-w-md">
            <Search className="text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by type name or description..." 
              className="bg-transparent border-none text-sm font-bold focus:ring-0 w-full"
            />
         </div>
         <div className="flex items-center gap-3 px-4 py-2 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
            <Info size={14} className="text-purple-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-700">Taxonomy impacts B2C Listings</span>
         </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
         <UnitTypesTable 
            types={mockUnitTypes} 
            onAction={handleAction} 
         />
      </div>

      <UnitTypeDetail 
        type={selectedType}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
