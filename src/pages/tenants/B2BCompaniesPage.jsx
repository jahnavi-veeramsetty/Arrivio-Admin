import React, { useState } from 'react';
import { Building2, Users, Activity, Euro, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { b2bCompanies, tenantStats, tenantById } from '../../mockdata/tenantsData';

const hydrateEmployees = (ids) =>
  ids
    .map((id) => tenantById(id))
    .filter(Boolean)
    .map((tenant) => ({
      id: tenant.id,
      name: tenant.name,
      unit: tenant.unit,
      property: tenant.property,
      leaseEnd: tenant.leaseEnd,
      status: tenant.status === 'Active' ? 'Lease Active' : tenant.status,
    }));

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
    setExpandedCompanies((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
        <span>Tenants</span>
        <ChevronRight size={10} />
        <span className="text-gray-900 font-bold">B2B Companies</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900">B2B Companies</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="B2B Partners" value={tenantStats.totalB2BCompanies} icon={Building2} colorClass="text-[#1a6b3a]" />
        <StatCard title="Partner-Routed Tenants" value={tenantStats.b2b2cTenants} icon={Users} />
        <StatCard title="Portfolio Occupancy" value="96%" icon={Activity} colorClass="text-[#92600a]" />
        <StatCard title="Monthly B2B Revenue" value={`€${tenantStats.monthlyB2BRevenue.toLocaleString()}`} icon={Euro} />
      </div>

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
              {b2bCompanies.map((company) => (
                <React.Fragment key={company.id}>
                  <tr className={`hover:bg-[#fafaf8] cursor-pointer transition-colors ${expandedCompanies[company.id] ? 'bg-[#fafaf8]' : ''}`} onClick={() => toggleExpand(company.id)}>
                    <td className="px-5 py-4 w-8">
                      {expandedCompanies[company.id] ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                    </td>
                    <td className="px-3 py-4 font-bold text-gray-900">{company.name}</td>
                    <td className="px-3 py-4 text-gray-600">{company.contact}</td>
                    <td className="px-3 py-4 text-gray-400">{company.headcount}</td>
                    <td className="px-3 py-4 text-gray-500">{company.city}</td>
                    <td className="px-3 py-4 font-bold text-gray-700">€{company.monthlyValue.toLocaleString()}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1a6b3a]" style={{ width: `${company.occupancy}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-600">{company.occupancy}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border bg-[#f0f7f3] text-[#1a6b3a] border-[#a8d5b8]">
                        {company.contractEnd}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="px-3 py-1 border border-[#e8e8e4] text-gray-500 text-[10px] font-bold rounded hover:bg-[#fafaf8] transition-all">
                        Manage
                      </button>
                    </td>
                  </tr>

                  {expandedCompanies[company.id] && (
                    <tr className="bg-[#fafaf8]">
                      <td className="px-5 py-4 w-8"></td>
                      <td className="px-3 py-4" colSpan="8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          {company.paymentBreakdown && (
                            <div className="bg-white border border-[#e8e8e4] rounded-xl p-4">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Breakdown · Monthly</p>
                              <div className="space-y-2">
                                {[
                                  { label: 'Rent', value: company.paymentBreakdown.rent },
                                  { label: 'Services', value: company.paymentBreakdown.services },
                                  { label: 'Platform Fee', value: company.paymentBreakdown.platformFee },
                                ].map((line) => (
                                  <div key={line.label} className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">{line.label}</span>
                                    <span className="font-bold text-gray-800 tabular-nums">€{line.value.toLocaleString()}</span>
                                  </div>
                                ))}
                                <div className="pt-2 mt-2 border-t border-[#f0f0ec] flex items-center justify-between text-xs">
                                  <span className="font-bold text-gray-800">Total</span>
                                  <span className="font-black text-[#1a6b3a] tabular-nums">€{company.monthlyValue.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          {company.rentPaymentHistory && (
                            <div className="bg-white border border-[#e8e8e4] rounded-xl p-4">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Rent Payment History</p>
                              <div className="space-y-2">
                                {company.rentPaymentHistory.map((entry, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-xs">
                                    <div>
                                      <p className="font-bold text-gray-800">{entry.period}</p>
                                      <p className="text-[10px] text-gray-400">Due {entry.dueDate}{entry.paidDate ? ` · Paid ${entry.paidDate}` : ''}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-gray-800 tabular-nums">€{entry.amount.toLocaleString()}</p>
                                      <span className={`text-[9px] font-bold uppercase tracking-tight px-2 py-0.5 rounded-full ${entry.status === 'Paid' ? 'bg-[#f0f7f3] text-[#1a6b3a]' : 'bg-amber-50 text-amber-700'}`}>{entry.status}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Active Employees</p>
                        <div className="space-y-1">
                          {hydrateEmployees(company.employees).map((employee) => (
                            <div key={employee.id} className="flex items-center justify-between bg-white border border-[#f0f0ec] rounded-lg px-3 py-2">
                              <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                <span className="text-xs font-bold text-gray-800">{employee.name}</span>
                                <span className="text-[10px] text-gray-400">{employee.unit} · {employee.property}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] text-gray-400">Ends {employee.leaseEnd}</span>
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">{employee.status}</span>
                                <button onClick={(event) => { event.stopPropagation(); navigate(`/admin/tenants/profile/${employee.id}`); }} className="px-2 py-0.5 border border-[#e8e8e4] text-gray-500 text-[9px] font-bold rounded hover:bg-[#fafaf8] flex items-center gap-1">
                                  <ExternalLink size={10} /> Profile
                                </button>
                              </div>
                            </div>
                          ))}
                          {company.portfolioNote && (
                            <div className="bg-white border border-[#f0f0ec] rounded-lg px-3 py-2 text-[11px] italic text-gray-500">
                              {company.portfolioNote}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
