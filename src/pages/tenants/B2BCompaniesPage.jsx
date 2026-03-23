import React, { useState } from 'react';
import { Building2, Users, Calendar, PoundSterling, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { b2bCompanies, tenantStats } from '../../mockdata/tenantsData';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-[#f5f5f0] p-5 rounded-xl flex flex-col gap-1">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</span>
      <Icon size={16} className={colorClass || 'text-gray-400'} />
    </div>
    <span className={`text-2xl font-bold ${colorClass || 'text-gray-900'}`}>{value}</span>
  </div>
);

export default function B2BCompaniesPage() {
  const navigate = useNavigate();
  const [expandedCompanies, setExpandedCompanies] = useState({});

  const toggleExpand = (id) => {
    setExpandedCompanies(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
        <span>Tenants</span>
        <ChevronRight size={10} />
        <span className="text-gray-900 font-bold">B2B Companies</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900">B2B Companies</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Active Companies" value={tenantStats.totalB2BCompanies} icon={Building2} colorClass="text-[#1a6b3a]" />
        <StatCard title="Total Employees" value={tenantStats.b2bEmployees} icon={Users} />
        <StatCard title="Contracts Expiring" value="3" icon={Calendar} colorClass="text-[#92600a]" />
        <StatCard title="Monthly B2B Revenue" value={`£${(tenantStats.monthlyB2BRevenue / 1000).toFixed(0)}k`} icon={PoundSterling} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e8e8e4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fafaf8] text-gray-400 font-bold uppercase tracking-wider border-b border-[#f0f0ec]">
              <tr>
                <th className="px-5 py-3 w-8"></th>
                <th className="px-3 py-3">Company</th>
                <th className="px-3 py-3">Contact</th>
                <th className="px-3 py-3">Headcount</th>
                <th className="px-3 py-3">City</th>
                <th className="px-3 py-3">Monthly value</th>
                <th className="px-3 py-3">Occupancy</th>
                <th className="px-3 py-3">Contract end</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ec]">
              {b2bCompanies.map(company => (
                <React.Fragment key={company.id}>
                  {/* Company Row */}
                  <tr 
                    className={`hover:bg-[#fafaf8] cursor-pointer transition-colors ${expandedCompanies[company.id] ? 'bg-[#fafaf8]' : ''}`}
                    onClick={() => toggleExpand(company.id)}
                  >
                    <td className="px-5 py-4 w-8">
                      {expandedCompanies[company.id] ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                    </td>
                    <td className="px-3 py-4 font-bold text-gray-900">{company.name}</td>
                    <td className="px-3 py-4 text-gray-600">{company.contact}</td>
                    <td className="px-3 py-4 text-gray-400">{company.headcount}</td>
                    <td className="px-3 py-4 text-gray-500">{company.city}</td>
                    <td className="px-3 py-4 font-bold text-gray-700">£{company.monthlyValue}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1a6b3a]" style={{ width: `${company.occupancy}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-600">{company.occupancy}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        new Date(company.contractEnd) < new Date('2026-03-01') ? 'bg-[#fffbeb] text-[#92600a] border-[#fcd34d]' : 'bg-[#f0f7f3] text-[#1a6b3a] border-[#a8d5b8]'
                      }`}>
                        {company.contractEnd}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="px-3 py-1 border border-[#e8e8e4] text-gray-500 text-[10px] font-bold rounded hover:bg-[#fafaf8] transition-all">
                        Manage
                      </button>
                    </td>
                  </tr>

                  {/* Employee Rows (Indented) */}
                  {expandedCompanies[company.id] && company.employees.map(emp => (
                    <tr key={emp.id} className="bg-white hover:bg-white/50 transition-colors">
                      <td className="px-5 py-3 w-8"></td>
                      <td className="px-3 py-3 pl-12 text-gray-700 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                        {emp.name}
                      </td>
                      <td className="px-3 py-3 text-gray-400">{emp.unit}</td>
                      <td className="px-3 py-3 text-gray-400">{emp.property}</td>
                      <td className="px-3 py-3" colSpan="2">
                        <span className="text-[10px] text-gray-400">Ends {emp.leaseEnd}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-3 py-3"></td>
                      <td className="px-5 py-3 text-right">
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate(`/admin/tenants/profile/${emp.id}`); }}
                          className="px-2 py-0.5 border border-[#e8e8e4] text-gray-400 text-[9px] font-bold rounded hover:bg-[#fafaf8] flex items-center gap-1 ml-auto"
                        >
                          <ExternalLink size={10} /> Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
