import React from 'react';
import { Users, UserCheck, Briefcase, TrendingUp, Activity } from 'lucide-react';
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
      <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
        <span>Tenants</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 leading-none">Tenants Dashboard</h1>

      <div className="grid grid-cols-5 gap-4">
        <StatCard title="Active Tenants" value={tenantStats.activeTenants} icon={Users} colorClass="text-[#1a6b3a]" />
        <StatCard title="B2B2C Tenants" value={tenantStats.b2b2cTenants} icon={Briefcase} subtext="partner-routed" />
        <StatCard title="Direct B2C Tenants" value={tenantStats.b2cDirectTenants} icon={UserCheck} />
        <StatCard title="YoY Growth" value={tenantStats.yoyGrowth} icon={TrendingUp} colorClass="text-[#1a6b3a]" />
        <StatCard title="MoM Growth" value={tenantStats.momGrowth} icon={Activity} colorClass="text-[#92600a]" subtext="end of Y2" />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-2">
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
                {upcomingMoveOuts.map((moveOut) => (
                  <tr key={moveOut.id} className="hover:bg-[#fafaf8] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-900">{moveOut.name}</div>
                      <div className="text-gray-400">{moveOut.email}</div>
                    </td>
                    <td className="px-3 py-4 text-gray-700 font-medium">{moveOut.unit}</td>
                    <td className="px-3 py-4 text-gray-500">{moveOut.property}</td>
                    <td className="px-3 py-4 text-gray-700">{moveOut.date}</td>
                    <td className="px-3 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        moveOut.type === 'B2C'
                          ? 'text-[#6d28d9] bg-[#f5f3ff] border-[#ddd6fe]'
                          : 'text-[#1d4ed8] bg-[#eff6ff] border-[#bfdbfe]'
                      }`}>
                        {moveOut.type}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-gray-500">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef2f2] text-[#b91c1c] border border-[#fca5a5]">
                        {moveOut.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0ec]">
                {overdueRentRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-[#fafaf8] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-900">{record.name}</div>
                      <div className="text-[10px] uppercase font-bold tracking-tight text-gray-400">{record.type}</div>
                    </td>
                    <td className="px-3 py-4 text-gray-700 font-medium">{record.unit}</td>
                    <td className="px-3 py-4 font-bold text-gray-900">€{record.amount}</td>
                    <td className="px-3 py-4 text-red-600 font-bold">{record.daysOverdue} days</td>
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
