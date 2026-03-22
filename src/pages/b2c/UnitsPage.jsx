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
      <div className="mb-8 group">
        <nav className="flex text-[10px] text-gray-400 dark:text-gray-500 mb-2 font-black uppercase tracking-[0.2em]">
          <span 
            className="hover:text-blue-600 transition-colors cursor-pointer" 
            onClick={() => navigate('/admin/b2c')}
          >
            B2C Admin
          </span>
          <span className="mx-3 opacity-30">/</span>
          <span 
            className={`transition-colors cursor-pointer ${level === 'properties' ? 'text-blue-600 dark:text-blue-400 font-black' : 'hover:text-blue-600'}`}
            onClick={handleBackToProperties}
          >
            Properties
          </span>
          {selectedProperty && (
            <>
              <span className="mx-3 opacity-30">/</span>
              <span 
                className={`transition-colors cursor-pointer ${level === 'units' ? 'text-blue-600 dark:text-blue-400 font-black' : 'hover:text-blue-600'}`}
                onClick={handleBackToUnits}
              >
                {selectedProperty.name}
              </span>
            </>
          )}
          {selectedUnit && (
            <>
              <span className="mx-3 opacity-30">/</span>
              <span className="text-blue-600 dark:text-blue-400 font-black">
                Unit {selectedUnit.id}
              </span>
            </>
          )}
        </nav>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">
          {level === 'units' && 'Property Inventory'}
          {level === 'unit' && 'Unit Specifications'}
        </h1>
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
