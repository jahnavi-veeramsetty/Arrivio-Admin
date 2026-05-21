import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Filter, LayoutGrid, Mail, MapPin, Building2, Globe } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { waitlistProperties } from '../../mockdata/b2cData';

export default function WaitlistPage() {
  const canAction = useRole(['super_admin', 'ops_manager']);
  const { show, addToast } = useToast();

  const [cityFilter, setCityFilter] = useState('All');
  const [unitTypeFilter, setUnitTypeFilter] = useState('All');
  const [search, setSearch] = useState('');

  const cities = ['All', 'Aachen', 'Berlin', 'Bonn'];
  const unitTypes = ['All', 'Studio', '1 Bedroom', '2 Bedroom'];

  const matchesType = (type, filter) => {
    if (filter === 'All') return true;
    if (filter === '1 Bedroom') return type === '1BR';
    if (filter === '2 Bedroom') return type === '2BR';
    return type === filter;
  };

  // Calculate overall stats from mock data
  const stats = useMemo(() => {
    let tenantCount = 0;
    let citiesSet = new Set();
    let propCount = 0;

    waitlistProperties.forEach(cityGroup => {
      let cityHasWaitlist = false;
      cityGroup.properties.forEach(prop => {
        let propHasWaitlist = false;
        prop.units.forEach(unit => {
          if (unit.waitlist && unit.waitlist.length > 0) {
            tenantCount += unit.waitlist.length;
            propHasWaitlist = true;
            cityHasWaitlist = true;
          }
        });
        if (propHasWaitlist) propCount++;
      });
      if (cityHasWaitlist) citiesSet.add(cityGroup.city);
    });

    return {
      cities: citiesSet.size,
      properties: propCount,
      tenants: tenantCount
    };
  }, []);

  // Filtered rows for the table
  const flatTableRows = useMemo(() => {
    const allRows = [];

    waitlistProperties
      .filter(cityGroup => cityFilter === 'All' || cityGroup.city === cityFilter)
      .forEach(cityGroup => {
        cityGroup.properties.forEach(property => {
          const filteredUnits = property.units.filter(u => {
            const typeMatch = matchesType(u.type, unitTypeFilter);
            if (!typeMatch) return false;

            // If search is active, check if property/unit or any applicant in waitlist matches
            if (search) {
              const searchLower = search.toLowerCase();
              const propMatch = property.name.toLowerCase().includes(searchLower);
              if (propMatch) return true;

              const waitlistMatch = u.waitlist?.some(a =>
                a.name.toLowerCase().includes(searchLower) ||
                a.email.toLowerCase().includes(searchLower)
              );
              return waitlistMatch;
            }
            return true;
          });

          if (filteredUnits.length === 0 && property.units.length > 0) return;

          const propStartIndex = allRows.length;

          filteredUnits.forEach((unit, uIdx) => {
            const unitWaitlist = unit.waitlist || [];

            // Filter applicants within the unit if search is active
            const filteredWaitlist = search
              ? unitWaitlist.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()))
              : unitWaitlist;

            const unitStartIndex = allRows.length;

            if (filteredWaitlist.length === 0) {
              // Only show "available" or "empty" if specifically requested or if search matched the property name
              if (!search || property.name.toLowerCase().includes(search.toLowerCase())) {
                allRows.push({
                  type: 'available',
                  property,
                  unit,
                  city: cityGroup.city,
                  isFirstInProperty: uIdx === 0 && unitStartIndex === propStartIndex,
                  isFirstInUnit: true,
                  unitRowCount: 1
                });
              }
            } else {
              filteredWaitlist.forEach((applicant, aIdx) => {
                allRows.push({
                  type: 'applicant',
                  property,
                  unit,
                  applicant,
                  city: cityGroup.city,
                  isFirstInProperty: uIdx === 0 && aIdx === 0 && unitStartIndex === propStartIndex,
                  isFirstInUnit: aIdx === 0,
                  unitRowCount: filteredWaitlist.length
                });
              });
            }
          });

          const propRowCount = allRows.length - propStartIndex;
          if (allRows[propStartIndex]) {
            allRows[propStartIndex].propertyRowCount = propRowCount;
          }
        });
      });
    return allRows;
  }, [cityFilter, unitTypeFilter, search]);

  const labelCls = "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block ml-1";
  const inputBase = "text-sm border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 outline-none hover:border-emerald-500 shadow-sm transition-all focus:ring-2 focus:ring-emerald-500/10";

  return (
    <div>
      <div className="p-8 max-w-[1440px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2C OPERATION | WAITLIST</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
                <Globe size={18} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cities with waitlist</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stats.cities}</p>
          </div>

          <div className="bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
                <Building2 size={18} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Properties with waitlist</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stats.properties}</p>
          </div>

          <div className="bg-emerald-50/30 dark:bg-emerald-900/10 p-6 rounded-2xl border border-[#a8d5b8] dark:border-emerald-500/30 shadow-sm flex flex-col justify-center group hover:bg-[#1a6b3a] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#1a6b3a] text-white rounded-lg shadow-inner group-hover:bg-white group-hover:text-[#1a6b3a] transition-colors">
                <Building2 size={18} />
              </div>
              <span className="text-xs font-bold text-[#1a6b3a] dark:text-emerald-400 uppercase tracking-widest group-hover:text-white transition-colors">Tenants waiting</span>
            </div>
            <p className="text-4xl font-black text-[#1a6b3a] dark:text-emerald-400 tracking-tighter group-hover:text-white transition-colors">
              {stats.tenants}
              <span className="text-xs  ml-2 font-medium opacity-60">Applicants Total</span>
            </p>
          </div>
        </div>

        {/* Filters & Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end bg-gray-50/50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
          <div className="md:col-span-3">
            <label className={labelCls}>Search Waitlist</label>
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by property, tenant name or email..."
                className={`${inputBase} w-full pl-10`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-1.5">
            <label className={labelCls}>City</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                className={`${inputBase} w-full pl-9 appearance-none cursor-pointer`}
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="md:col-span-1.5">
            <label className={labelCls}>Unit Type</label>
            <div className="relative">
              <LayoutGrid size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                className={`${inputBase} w-full pl-9 appearance-none cursor-pointer`}
                value={unitTypeFilter}
                onChange={(e) => setUnitTypeFilter(e.target.value)}
              >
                {unitTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Multi-row span Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md ring-1 ring-black/[0.02] overflow-hidden">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <th className="w-[180px] px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Property</th>
                <th className="w-[100px] px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Unit</th>
                <th className="w-[44px] px-2 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">#</th>
                <th className="w-[160px] px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Name</th>
                <th className="w-[140px] px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">City</th>
                <th className="w-[180px] px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">Stay Period</th>
                <th className="w-[80px] px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Waiting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {flatTableRows.length > 0 ? (
                flatTableRows.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-[#f0f7f3]/50 dark:hover:bg-emerald-900/10 transition-colors">
                    {/* Property Cell */}
                    {row.isFirstInProperty && (
                      <td
                        rowSpan={row.propertyRowCount}
                        className="px-6 py-6 align-top border-l-4 border-emerald-600 bg-white dark:bg-gray-900 relative"
                      >
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] opacity-40 mb-1 block">
                          {row.city}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                          {row.property.name}
                        </h4>
                        <div className="mt-2 flex items-start gap-1 text-gray-400 group-hover:text-gray-500 transition-colors">
                          <MapPin size={10} className="mt-0.5 shrink-0" />
                          <span className="text-[10px] leading-tight italic">{row.property.address}</span>
                        </div>
                      </td>
                    )}

                    {/* Unit Cell */}
                    {row.isFirstInUnit && row.type !== 'empty' && (
                      <td
                        rowSpan={row.unitRowCount}
                        className="px-4 py-6 align-top border-l border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900"
                      >
                        <div className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-500/20 rounded-lg text-center">
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                            {row.unit.name.split(' ')[1] || row.unit.name}
                          </span>
                        </div>
                        <p className="text-[9px] text-gray-400 mt-1 text-center font-bold uppercase tracking-wider">
                          {row.unit.type}
                        </p>
                      </td>
                    )}

                    {/* Applicant data */}
                    {row.type === 'applicant' ? (
                      <>
                        <td className="px-2 py-6 text-center">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${row.applicant.position === 1 ? 'bg-[#1a6b3a] text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                            }`}>
                            {row.applicant.position}
                          </span>
                        </td>
                        <td className="px-4 py-6">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{row.applicant.name}</p>
                        </td>
                        <td className="px-4 py-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {row.city}
                          </p>
                        </td>
                        <td className="px-4 py-6">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-bold text-emerald-600 uppercase w-6">In</span>
                              <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                {row.applicant.moveIn ? new Date(row.applicant.moveIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-bold text-rose-500 uppercase w-6">Out</span>
                              <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                {row.applicant.moveOut ? new Date(row.applicant.moveOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-6 text-right">
                          <span className="text-xs font-bold text-[#1a6b3a] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                            {row.applicant.daysWaiting}d
                          </span>
                        </td>
                      </>
                    ) : (
                      <td colSpan={5} className="px-6 py-8 text-center bg-gray-50/20 italic text-gray-400 text-xs">
                        Category currently available • No waiting list
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <MapPin className="mx-auto text-gray-200 mb-4" size={48} />
                    <p className="text-gray-400 font-medium">No waitlist entries found matches your filters.</p>
                    <button onClick={() => { setSearch(''); setCityFilter('All'); setUnitTypeFilter('All'); }} className="mt-4 text-emerald-600 font-bold text-xs uppercase tracking-widest">Clear all filters</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
