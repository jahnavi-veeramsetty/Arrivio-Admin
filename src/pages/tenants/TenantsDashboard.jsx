import React from 'react';
import { Users, UserCheck, Briefcase, Calendar, AlertCircle, Send } from 'lucide-react';
import { tenantStats, upcomingMoveOuts, overdueRentRecords } from '../../mockdata/tenantsData';

const StatCard = ({ title, value, icon: Icon, colorClass, subtext }) => (
  <div className="bg-[#f5f5f0] p-5 rounded-xl flex flex-col gap-1">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</span>
      <Icon size={16} className={colorClass || 'text-gray-400'} />
    </div>
    <div className="flex items-baseline gap-2">
      <span className={`text-2xl font-bold ${colorClass || 'text-gray-900'}`}>{value}</span>
      {subtext && <span className="text-[10px] text-gray-400">{subtext}</span>}
    </div>
  </div>
);

export default function TenantsDashboard() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
        <span>Tenants</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 leading-none">Tenants Dashboard</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard title="Active Tenants" value={tenantStats.activeTenants} icon={Users} colorClass="text-[#1a6b3a]" />
        <StatCard title="B2C Individuals" value={tenantStats.b2cIndividuals} icon={UserCheck} />
        <StatCard title="B2B Employees" value={tenantStats.b2bEmployees} icon={Briefcase} subtext={`across ${tenantStats.totalB2BCompanies} companies`} />
        <StatCard title="Leases Expiring" value={tenantStats.leasesExpiring} icon={Calendar} colorClass="text-[#92600a]" subtext="within 30 days" />
        <StatCard title="Overdue Rent" value={tenantStats.overdueRent} icon={AlertCircle} colorClass="text-[#b91c1c]" subtext="needs follow-up" />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-2">
        {/* Upcoming Move-outs */}
        <div className="bg-white rounded-xl border border-[#e8e8e4] overflow-hidden">
          <div className="bg-[#fafaf8] px-5 py-3 border-b border-[#e8e8e4]">
            <h3 className="text-sm font-bold text-gray-900">Upcoming move-outs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafaf8] text-gray-400 font-bold uppercase tracking-wider border-b border-[#f0f0ec]">
                <tr>
                  <th className="px-5 py-3">Tenant</th>
                  <th className="px-3 py-3">Unit</th>
                  <th className="px-3 py-3">Property</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Type</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0ec]">
                {upcomingMoveOuts.map(mo => (
                  <tr key={mo.id} className="hover:bg-[#fafaf8] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-900">{mo.name}</div>
                      <div className="text-gray-400">{mo.email}</div>
                    </td>
                    <td className="px-3 py-4 text-gray-700 font-medium">{mo.unit}</td>
                    <td className="px-3 py-4 text-gray-500">{mo.property}</td>
                    <td className="px-3 py-4 text-gray-700">{mo.date}</td>
                    <td className="px-3 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        mo.type === 'B2C' 
                        ? 'text-[#6d28d9] bg-[#f5f3ff] border-[#ddd6fe]' 
                        : 'text-[#1d4ed8] bg-[#eff6ff] border-[#bfdbfe]'
                      }`}>
                        {mo.type}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-gray-500">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef2f2] text-[#b91c1c] border border-[#fca5a5]">
                        {mo.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Overdue Rent */}
        <div className="bg-white rounded-xl border border-[#e8e8e4] overflow-hidden">
          <div className="bg-[#fafaf8] px-5 py-3 border-b border-[#e8e8e4]">
            <h3 className="text-sm font-bold text-gray-900">Overdue rent</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafaf8] text-gray-400 font-bold uppercase tracking-wider border-b border-[#f0f0ec]">
                <tr>
                  <th className="px-5 py-3">Tenant</th>
                  <th className="px-3 py-3">Unit</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Overdue</th>
                  <th className="px-3 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0ec]">
                {overdueRentRecords.map(or => (
                  <tr key={or.id} className="hover:bg-[#fafaf8] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-900">{or.name}</div>
                      <div className="text-[10px] uppercase font-bold tracking-tight text-gray-400">{or.type}</div>
                    </td>
                    <td className="px-3 py-4 text-gray-700 font-medium">{or.unit}</td>
                    <td className="px-3 py-4 font-bold text-gray-900">£{or.amount}</td>
                    <td className="px-3 py-4 text-red-600 font-bold">{or.daysOverdue} days</td>
                    <td className="px-3 py-4 text-center">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#a8d5b8] bg-[#f0f7f3] text-[#1a6644] text-[10px] font-bold rounded hover:bg-[#1a6644] hover:text-white transition-all">
                        <Send size={10} /> Send reminder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
