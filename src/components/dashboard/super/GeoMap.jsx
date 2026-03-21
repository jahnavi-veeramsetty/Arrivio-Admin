// src/components/dashboard/super/GeoMap.jsx
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function GeoMap({ tenants, properties }) {
  const [mode, setMode] = useState('tenants'); // 'tenants' | 'properties'

  const colorScale = scaleLinear()
    .domain([0, Math.max(...tenants.map(t => t.count))])
    .range(["#f0fdf4", "#10b981"]);

  return (
    <div className="bg-white dark:bg-[#0f1724] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm p-6 transition-colors relative">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
          {mode === 'tenants' ? 'Tenant Nationalities' : 'Property Locations'}
        </p>
        
        <div className="flex bg-gray-50 dark:bg-gray-900 p-1 rounded-lg">
          <button 
            onClick={() => setMode('tenants')}
            className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-all ${
              mode === 'tenants' 
                ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white' 
                : 'text-gray-400'
            }`}
          >
            Tenants
          </button>
          <button 
            onClick={() => setMode('properties')}
            className={`px-3 py-1 rounded text-[10px] font-black uppercase transition-all ${
              mode === 'properties' 
                ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white' 
                : 'text-gray-400'
            }`}
          >
            Properties
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full bg-gray-50/50 dark:bg-gray-900/20 rounded-lg overflow-hidden">
        <ComposableMap projectionConfig={{ scale: 140 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = tenants.find(t => t.country === geo.properties.name);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={mode === 'tenants' && country ? colorScale(country.count) : "currentColor"}
                    stroke="#fff"
                    strokeWidth={0.5}
                    className="text-gray-200 dark:text-gray-800 outline-none transition-colors"
                    style={{
                      hover: { fill: mode === 'tenants' && country ? "#059669" : "#cbd5e1", outline: "none" }
                    }}
                  />
                )
              })
            }
          </Geographies>

          {mode === 'properties' && properties.map(({ city, coordinates, count }) => (
            <Marker key={city} coordinates={coordinates}>
              <circle r={4} fill="#10b981" stroke="#fff" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontSize: 8, fontWeight: 900, fill: "currentColor", textTransform: 'uppercase' }}
                className="text-gray-900 dark:text-white"
              >
                {city}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {mode === 'tenants' && (
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#f0fdf4]" />
            <span className="text-[10px] font-black text-gray-400 uppercase">Low</span>
          </div>
          <div className="flex-grow h-1 bg-gradient-to-right from-[#f0fdf4] to-[#10b981] rounded-full" />
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-[10px] font-black text-gray-400 uppercase">High</span>
          </div>
        </div>
      )}
    </div>
  );
}
