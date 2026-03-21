import { X, Building2, UserCircle, ShieldCheck, Mail, Phone, Calendar, ArrowRight, CheckCircle2, XCircle, Edit3, UserPlus } from 'lucide-react';
import { useRole } from '../../../utils/rbac';

export default function PartnerDetail({ partner, onClose, onAction }) {
  const canModify = useRole(['super_admin', 'sales_partnership']);
  const isPending = partner.status === 'Pending';

  if (!partner) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
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

        {/* Content */}
        <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Revenue</p>
              <p className="text-xl font-bold text-[#1a6644]">${partner.revenue.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Employees</p>
              <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{partner.employees}</p>
            </div>
          </div>

          {/* Company Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Building2 size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-wider">Company Details</h3>
            </div>
            <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 space-y-3">
              {[
                ['Type', partner.type],
                ['City', partner.city],
                ['Status', partner.status],
                ['Account Manager', partner.manager],
              ].map(([k,v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{k}</span>
                  <span className={`font-bold ${k === 'Status' ? 'text-[#1a6644]' : 'text-gray-800 dark:text-gray-200'}`}>{v}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Point of Contact */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <UserCircle size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-wider">Lead Contact</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                  <UserCircle size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200">Alex Thompson</div>
                  <div className="text-xs text-gray-500">Director of Operations</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button className="flex items-center justify-center gap-2 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors">
                  <Mail size={14} /> Email
                </button>
                <button className="flex items-center justify-center gap-2 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors">
                  <Phone size={14} /> Call
                </button>
              </div>
            </div>
          </section>

          {/* Agreement Status */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-wider">Compliance & Agreements</h3>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#1a6644]/5 border border-[#1a6644]/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1a6644] text-white rounded-lg">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 dark:text-gray-200">Master Service Agreement</div>
                  <div className="text-[10px] text-gray-500 font-medium">Signed on 12 Jan 2025</div>
                </div>
              </div>
              <button className="text-[10px] font-bold text-[#1a6644] hover:underline uppercase">View PDF</button>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        {canModify && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap gap-3">
            {isPending ? (
              <>
                <button 
                  onClick={() => onAction('Approve')} 
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1a6644] text-white text-sm font-bold rounded-xl hover:bg-[#155236] transition-all shadow-lg shadow-[#1a6644]/20"
                >
                  <CheckCircle2 size={16} /> Approve Account
                </button>
                <button 
                  onClick={() => onAction('Reject')} 
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <XCircle size={16} /> Reject Account
                </button>
              </>
            ) : (
              <>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  <Edit3 size={16} /> Edit Profile
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  <UserPlus size={16} /> Reassign Manager
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
