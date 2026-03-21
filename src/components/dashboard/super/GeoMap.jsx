// src/components/dashboard/super/GeoMap.jsx
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function GeoMap({ tenants, properties, occupancy }) {
  const [mode, setMode] = useState('tenants'); // 'tenants' | 'properties'
  const [tooltip, setTooltip] = useState(null); // { name, count, rate, type }

  const colorScale = scaleLinear()
    .domain([0, Math.max(...tenants.map(t => t.count), 1)])
    .range(["#f0fdf4", "#10b981"]);

  // Dynamic projection for World vs Germany
  const projectionConfig = mode === 'properties'
    ? { center: [10.45, 51.16], scale: 1800 }
    : { scale: 140, center: [0, 0] };

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm p-6 transition-colors relative group/map h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          {mode === 'tenants' ? 'Tenant Nationalities' : 'Property Locations'}
        </p>

        <div className="flex bg-gray-50 dark:bg-gray-900 p-1 rounded-lg">
          <button
            onClick={() => setMode('tenants')}
            className={`px-3 py-1 rounded text-[10px] uppercase transition-all ${mode === 'tenants'
                ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            Tenants
          </button>
          <button
            onClick={() => setMode('properties')}
            className={`px-3 py-1 rounded text-[10px] uppercase transition-all ${mode === 'properties'
                ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            Properties
          </button>
        </div>
      </div>

      <div className="flex-grow h-[340px] w-full bg-gray-50/50 dark:bg-gray-900/20 rounded-lg overflow-hidden relative transition-all duration-700">
        <ComposableMap projectionConfig={projectionConfig} height={340}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryData = tenants.find(t => t.country === geo.properties.name);
                const isHovered = tooltip?.type === 'country' && tooltip?.name === geo.properties.name;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={mode === 'tenants' && countryData ? colorScale(countryData.count) : "currentColor"}
                    stroke="#fff"
                    strokeWidth={isHovered ? 1 : 0.5}
                    className="text-gray-200 dark:text-gray-800 outline-none transition-all cursor-pointer"
                    onMouseEnter={() => {
                      setTooltip({
                        type: 'country',
                        name: geo.properties.name,
                        count: countryData ? countryData.count : 0
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      hover: { fill: mode === 'tenants' && countryData ? "#059669" : "#cbd5e1", outline: "none" }
                    }}
                  />
                )
              })
            }
          </Geographies>

          {mode === 'properties' && properties.map(({ city, coordinates, count }) => {
            const cityOccupancy = occupancy?.find(o => o.city === city);
            const isHovered = tooltip?.type === 'city' && tooltip?.name === city;

            return (
              <Marker
                key={city}
                coordinates={coordinates}
                onMouseEnter={() => {
                  setTooltip({
                    type: 'city',
                    name: city,
                    count: count,
                    rate: cityOccupancy ? cityOccupancy.rate : null
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                <circle
                  r={isHovered ? 6 : 4}
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth={2}
                  className="cursor-pointer transition-all duration-300"
                />
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Floating Tooltip */}
        {tooltip && (
          <div className="absolute bottom-4 right-4 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-100 dark:border-gray-800 px-4 py-3 rounded-lg shadow-xl">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-1.5">
                {tooltip.type === 'country' ? 'Region Intelligence' : 'City Performance'}
              </p>
              <div className="space-y-1">
                <p className="text-sm text-gray-900 dark:text-white">{tooltip.name}</p>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {tooltip.count} {tooltip.type === 'country' ? 'Tenants' : 'Properties'}
                  </p>
                  {tooltip.type === 'city' && tooltip.rate !== null && (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                      {tooltip.rate}% Occupancy
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {mode === 'tenants' && (
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#f0fdf4]" />
            <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Low</span>
          </div>
          <div className="flex-grow h-1 bg-gradient-to-r from-[#f0fdf4] to-[#10b981] rounded-full opacity-60" />
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-[10px] text-gray-400 uppercase tracking-tighter">High</span>
          </div>
        </div>
      )}
    </div>
  );
}
