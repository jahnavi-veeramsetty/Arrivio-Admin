import { X, Building2, UserCircle, ShieldCheck, Euro, Users } from 'lucide-react';
import { useRole } from '../../../utils/rbac';

export default function PartnerDetail({ partner, onClose }) {
  const canModify = useRole(['super_admin', 'sales_partnership']);

  if (!partner) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a6644]/10 flex items-center justify-center text-[#1a6644] font-bold border border-[#1a6644]/20 uppercase">
              {partner.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{partner.name}</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{partner.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Monthly Value</p>
              <p className="text-xl font-bold text-[#1a6644]">€{partner.revenue.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Active Housed</p>
              <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{partner.employees}</p>
            </div>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Building2 size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-wider">Partner Details</h3>
            </div>
            <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 space-y-3">
              {[
                ['Type', partner.type],
                ['City', partner.city],
                ['Status', partner.status],
                ['Account Manager', partner.manager],
                ['Portfolio Count', partner.partnerCount || 1],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
                  <span className={`font-bold ${label === 'Status' ? 'text-[#1a6644]' : 'text-gray-800 dark:text-gray-200'}`}>{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <UserCircle size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-wider">Primary Contact</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                  <UserCircle size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{partner.contactName}</div>
                  <div className="text-xs text-gray-500">{partner.contactRole}</div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-wider">Agreement Status</h3>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#1a6644]/5 border border-[#1a6644]/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1a6644] text-white rounded-lg">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 dark:text-gray-200">{partner.agreementStatus}</div>
                  <div className="text-[10px] text-gray-500 font-medium">Snapshot status at end of FY27-28</div>
                </div>
              </div>
              <div className="text-right text-[#1a6644] font-bold text-xs uppercase tracking-widest">Active</div>
            </div>
          </section>
        </div>

        {canModify && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Users size={16} /> View Allocations
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1a6644] text-white text-sm font-bold rounded-xl hover:bg-[#155236] transition-all shadow-lg shadow-[#1a6644]/20">
              <Euro size={16} /> Review Billing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
