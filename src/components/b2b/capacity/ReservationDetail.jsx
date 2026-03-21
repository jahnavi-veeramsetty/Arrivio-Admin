import { X, Calendar, Activity, Users, Send, CheckCircle2, AlertTriangle, FileText, Download } from 'lucide-react';
import { useRole } from '../../../utils/rbac';

export default function ReservationDetail({ reservation, partner, onClose, onAction }) {
  const canModify = useRole(['super_admin', 'sales_partnership']);
  const fillRate = (reservation.roomsFilled / reservation.roomsReserved) * 100;

  if (!reservation || !partner) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-[#1a6644]/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a6644] text-white flex items-center justify-center font-bold shadow-md">
              <Activity size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Reservation Detail</h2>
              <p className="text-[10px] font-bold text-[#1a6644] uppercase tracking-widest">{reservation.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8">
          
          {/* Partner & Fill Rate */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Partner</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{partner.name}</p>
              </div>
              <div className="text-right">
                <p className="text-[32px] font-black text-[#1a6644] leading-none">{Math.round(fillRate)}%</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fill Rate</p>
              </div>
            </div>
            
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex shadow-inner">
              <div 
                className={`h-full transition-all duration-700 rounded-full ${fillRate >= 90 ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${fillRate}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <FileText size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Reserved</span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{reservation.roomsReserved} Units</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2 text-blue-400">
                  <Users size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Filled</span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{reservation.roomsFilled} Occupied</p>
              </div>
            </div>
          </div>

          {/* Expiry Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-wider">Rotation & Expiry</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100/50 dark:border-amber-900/30">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-400">Contract Expiry</div>
                <div className="text-sm font-black text-amber-800 dark:text-amber-200 italic font-mono">{new Date(reservation.expiry).toLocaleDateString()}</div>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 px-1 leading-relaxed italic">
                Reservations are auto-renewed unless notice is given 60 days before the contract expiry date.
              </p>
            </div>
          </section>

          {/* Pending Changes */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <Send size={16} />
                <h3 className="text-[11px] font-bold uppercase tracking-wider">Pending Amendments</h3>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-tighter">0 Requests</span>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-400 font-medium italic">No pending capacity amendment requests found.</p>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        {canModify && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap gap-3">
            <button 
              onClick={() => onAction('Approve Flag')} 
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1a6644] text-white text-sm font-bold rounded-xl hover:bg-[#155236] transition-all shadow-lg shadow-[#1a6644]/20"
            >
              <CheckCircle2 size={16} /> Approve Status
            </button>
            <button 
              onClick={() => onAction('Flag Renewal')} 
              className="px-4 flex items-center justify-center bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
              title="Flag for Renewal Outreach"
            >
              <AlertTriangle size={18} />
            </button>
            <div className="w-full flex gap-3">
              <button 
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-mono"
              >
                <Download size={16} /> EXPORT CSV
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
