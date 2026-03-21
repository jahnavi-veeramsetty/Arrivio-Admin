import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import AmenitiesLibrary from '../../components/properties/amenities/AmenitiesLibrary';
import { mockAmenities } from '../../mockdata/propertiesData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import { Plus, Search, ShieldAlert } from 'lucide-react';

export default function AmenitiesPage() {
  const { activeRole, user } = useAuth();
  const { addToast } = useToast();
  const role = activeRole || user?.roles?.[0];

  const canDeprecate = role === 'super_admin';

  const handleAction = (type, amenity) => {
    if (type === 'edit') {
      addToast({
        title: 'Editing Global Library',
        description: `Name or icon changes for ${amenity.name} will reflect across all properties.`,
        type: 'info'
      });
    } else if (type === 'deprecate') {
       addToast({
         title: 'Amenity Deprecated',
         description: `${amenity.name} has been marked as legacy and removed from active selection.`,
         type: 'error'
       });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader 
          title="Amenities Library" 
          description="Manage the global list of building and unit features used for platform listing filters."
          breadcrumbs={['Properties', 'Amenities']}
        />
        <button className="flex items-center gap-2 px-6 py-3 bg-[#1a6644] text-white rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-[#155236] transition-all shadow-lg shadow-[#1a6644]/20 active:scale-95">
           <Plus size={18} /> Add Amenity
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
               <Search className="text-gray-400" size={20} />
               <input 
                 type="text" 
                 placeholder="Search global amenities..." 
                 className="bg-transparent border-none text-sm font-bold focus:ring-0 w-full"
               />
            </div>
            <AmenitiesLibrary 
               amenities={mockAmenities} 
               onAction={handleAction} 
               canDeprecate={canDeprecate} 
            />
         </div>

         <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700">
            <section className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl border border-gray-800">
               <div className="flex items-center gap-3 mb-6">
                  <ShieldAlert className="text-[#1a6644]" size={20} />
                  <h3 className="text-xs font-black uppercase tracking-widest">Data Consistency</h3>
               </div>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed mb-6">
                  Managing amenities centrally ensures search filters are accurate across the B2C platform.
               </p>
               <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                     <span className="text-gray-500">Global Registry</span>
                     <span className="text-[#1a6644]">{mockAmenities.length} Items</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                     <div className="w-3/4 h-full bg-[#1a6644]" />
                  </div>
               </div>
            </section>
         </div>
      </div>
    </div>
  );
}
