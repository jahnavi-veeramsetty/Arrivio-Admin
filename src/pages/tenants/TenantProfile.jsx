import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MessageSquare, FileText, Clock } from 'lucide-react';
import { allTenants, paymentHistory, activityTimeline } from '../../mockdata/tenantsData';

export default function TenantProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tenant = allTenants.find((t) => t.id === id) || allTenants[0];
  const [activeTab, setActiveTab] = useState('payments');

  const tabs = [
    { id: 'payments', label: 'Payment history' },
    { id: 'documents', label: 'Documents' },
    { id: 'support', label: 'Support cases' },
    { id: 'notes', label: 'Notes' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
        <span>Tenants</span>
        <ChevronRight size={10} />
        <span className="cursor-pointer hover:text-gray-900 transition-colors" onClick={() => navigate('/admin/tenants/all')}>All Tenants</span>
        <ChevronRight size={10} />
        <span className="text-gray-900 font-bold">{tenant.name}</span>
      </div>

      <div className="flex gap-6">
        <div className="w-[270px] flex-shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-[#e8e8e4] p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-[#f0f7f3] text-[#1a6b3a] text-xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
              {tenant.initials}
            </div>
            <h2 className="text-base font-bold text-gray-900">{tenant.name}</h2>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Mail size={12} /> {tenant.email}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Phone size={12} /> {tenant.phone}
              </div>
            </div>

            <div className="my-6 border-t border-[#f0f0ec]" />

            <div className="space-y-3">
              {[
                { label: 'Unit', value: tenant.unit },
                { label: 'Property', value: tenant.property },
                { label: 'City', value: tenant.city },
                { label: 'Monthly rent', value: `€${tenant.monthlyRent}`, bold: true },
                { label: 'Lease start', value: tenant.leaseStart },
                { label: 'Lease end', value: tenant.leaseEnd },
                { label: 'Sec. deposit', value: `€${tenant.deposit}` },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-gray-400">{item.label}</span>
                  <span className={item.bold ? 'font-bold text-gray-900' : 'text-gray-700'}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-[#f0f0ec]" />

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-3 py-2 border border-[#a8d5b8] bg-[#f0f7f3] text-[#1a6b3a] text-[11px] font-bold rounded hover:bg-[#1a6b3a] hover:text-white transition-all">
                <MessageSquare size={14} /> Message
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 border border-[#e8e8e4] text-gray-600 text-[11px] font-bold rounded hover:bg-[#fafaf8] transition-all">
                <FileText size={14} /> View lease
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow space-y-6">
          <div className="bg-white rounded-xl border border-[#e8e8e4] shadow-sm overflow-hidden">
            <div className="flex border-b border-[#f0f0ec] px-2 bg-[#fafaf8]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'text-[#1a6b3a] border-[#1a6b3a]'
                      : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'payments' ? (
                <div className="space-y-8">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-gray-400 font-bold uppercase tracking-wider border-b border-[#f0f0ec]">
                        <tr>
                          <th className="pb-3 text-[10px]">Period</th>
                          <th className="pb-3 text-[10px]">Due date</th>
                          <th className="pb-3 text-[10px]">Amount</th>
                          <th className="pb-3 text-[10px]">Paid on</th>
                          <th className="pb-3 text-[10px]">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f0ec]">
                        {paymentHistory.map((payment, idx) => (
                          <tr key={idx} className="hover:bg-[#fafaf8] transition-colors">
                            <td className="py-4 font-bold text-gray-900">{payment.period}</td>
                            <td className="py-4 text-gray-500">{payment.dueDate}</td>
                            <td className="py-4 font-bold text-gray-900">€{payment.amount}</td>
                            <td className="py-4 text-gray-500">{payment.paidDate}</td>
                            <td className="py-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f0f7f3] text-[#1a6b3a] border border-[#a8d5b8]">
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#f0f0ec]">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Activity timeline</h3>
                    </div>
                    <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100">
                      {activityTimeline.map((event) => (
                        <div key={event.id} className="relative">
                          <div className={`absolute -left-[19px] top-1.5 w-2 h-2 rounded-full border-2 border-white shadow-sm ${event.recent ? 'bg-emerald-500 ring-4 ring-emerald-50' : 'bg-gray-300'}`} />
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-xs font-bold ${event.recent ? 'text-gray-900' : 'text-gray-500'}`}>{event.title}</span>
                            <span className="text-[10px] text-gray-400">{event.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-300 gap-3">
                  <div className="p-4 bg-gray-50 rounded-full"><FileText size={32} /></div>
                  <p className="text-[11px] font-bold uppercase tracking-widest">{activeTab} section empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
