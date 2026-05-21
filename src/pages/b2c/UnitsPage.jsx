import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropertiesView from '../../components/b2c/units/PropertiesView';
import UnitsTable from '../../components/b2c/units/UnitsTable';
import UnitDetailView from '../../components/b2c/units/UnitDetailView';
import { mockProperties } from '../../mockdata/propertiesData';

export default function UnitsPage() {
  const { propertyId, unitId } = useParams();
  const navigate = useNavigate();
  
  const [propertySearch, setPropertySearch] = useState('');
  const [unitSearch, setUnitSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [unitStatus, setUnitStatus] = useState('All');

  // Determine current level based on URL params
  const level = unitId ? 'unit' : propertyId ? 'units' : 'properties';

  // Helper to get selected objects
  const selectedProperty = useMemo(() => 
    mockProperties.find(p => p.id === propertyId), 
    [propertyId]
  );
  
  const selectedUnit = useMemo(() => 
    selectedProperty?.units.find(u => u.id === unitId), 
    [selectedProperty, unitId]
  );

  // Filtered Data
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(propertySearch.toLowerCase()) ||
                          p.city.toLowerCase().includes(propertySearch.toLowerCase()) ||
                          p.address.toLowerCase().includes(propertySearch.toLowerCase());
      const matchCity = selectedCity === 'All' || p.city === selectedCity;
      return matchSearch && matchCity;
    });
  }, [propertySearch, selectedCity]);

  const filteredUnits = useMemo(() => {
    if (!selectedProperty) return [];
    return selectedProperty.units.filter(u => {
      const matchSearch = u.id.toLowerCase().includes(unitSearch.toLowerCase()) ||
                          u.type.toLowerCase().includes(unitSearch.toLowerCase()) ||
                          (u.tenant?.name || '').toLowerCase().includes(unitSearch.toLowerCase());
      const matchStatus = unitStatus === 'All' || u.status === unitStatus;
      return matchSearch && matchStatus;
    });
  }, [selectedProperty, unitSearch, unitStatus]);

  // Handlers
  const handleSelectProperty = (id) => {
    navigate(`/admin/b2c/properties/${id}`);
    window.scrollTo(0, 0);
  };

  const handleSelectUnit = (id) => {
    navigate(`/admin/b2c/properties/${propertyId}/${id}`);
    window.scrollTo(0, 0);
  };

  const handleBackToProperties = () => {
    navigate('/admin/b2c/properties');
    setUnitSearch('');
    window.scrollTo(0, 0);
  };

  const handleBackToUnits = () => {
    navigate(`/admin/b2c/properties/${propertyId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Breadcrumbs / Header Context */}
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2C OPERATION | PROPERTY INVENTORY</p>
      </div>

      {/* Levels */}
      <div className="animate-in fade-in duration-500">
        {level === 'properties' && (
          <PropertiesView 
            properties={filteredProperties} 
            allProperties={mockProperties}
            onSelectProperty={handleSelectProperty} 
            onSearch={setPropertySearch}
            searchValue={propertySearch}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        )}

        {level === 'units' && selectedProperty && (
          <UnitsTable 
            property={selectedProperty} 
            units={filteredUnits}
            onSelectUnit={handleSelectUnit}
            onBack={handleBackToProperties}
            onSearch={setUnitSearch}
            searchValue={unitSearch}
            unitStatus={unitStatus}
            onStatusChange={setUnitStatus}
          />
        )}

        {level === 'unit' && selectedUnit && (
          <UnitDetailView 
            unit={selectedUnit} 
            onBack={handleBackToUnits}
          />
        )}
      </div>
    </div>
  );
}
