import PageHeader from '../../components/layout/PageHeader';
import PropertiesMetricCards from '../../components/properties/dashboard/PropertiesMetricCards';
import PropertiesByCity from '../../components/properties/dashboard/PropertiesByCity';
import MaintenanceAlerts from '../../components/properties/dashboard/MaintenanceAlerts';
import RecentPropertyUpdates from '../../components/properties/dashboard/RecentPropertyUpdates';
import { mockProperties, mockCities, mockMaintenance, mockUpdates } from '../../mockdata/propertiesData';

export default function PropertiesDashboard() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader 
        title="Portfolio Overview" 
        description="Comprehensive view of property performance, occupancy, and operational alerts across all territories."
        breadcrumbs={['Properties', 'Dashboard']}
      />

      <div className="animate-in fade-in slide-in-from-top-4 duration-700">
         <PropertiesMetricCards 
            properties={mockProperties} 
            cities={mockCities} 
            maintenance={mockMaintenance} 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
         <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-left duration-700">
            <PropertiesByCity properties={mockProperties} cities={mockCities} />
         </div>
         
         <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right duration-700 sticky top-4">
            <MaintenanceAlerts alerts={mockMaintenance} />
            <RecentPropertyUpdates updates={mockUpdates} />
         </div>
      </div>
    </div>
  );
}
