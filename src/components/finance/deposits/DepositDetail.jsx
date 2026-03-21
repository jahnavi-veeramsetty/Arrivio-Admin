import { X, ShieldCheck, Trash2, Undo2, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function DepositDetail({ deposit, isOpen, onClose, onAction }) {
  if (!isOpen || !deposit) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1 block">Escrow Record</span>
            <h2 className="text-xl font-black italic">{deposit.id}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Summary Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-700">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                   <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-black uppercase tracking-widest">
                      {deposit.status}
                   </span>
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Move-out Date</p>
                   <p className="text-sm font-black text-gray-800 dark:text-gray-100">{new Date(deposit.moveOut).toLocaleDateString([], { dateStyle: 'medium' })}</p>
                </div>
             </div>
             
             <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                   <span>Initial Deposit</span>
                   <span>£{deposit.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-red-500 border-b border-gray-200 dark:border-gray-700 pb-3">
                   <span className="flex items-center gap-2 italic">Deductions Recorded <AlertCircle size={14} /></span>
                   <span>-£{deposit.deductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                   <span className="text-xs font-black uppercase tracking-widest text-gray-400">Net Refundable</span>
                   <span className="text-3xl font-black font-mono text-[#1a6644]">£{(deposit.amount - deposit.deductions).toLocaleString()}</span>
                </div>
             </div>
          </div>

          {/* Unit Info */}
          <section className="px-2">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Tenant & Unit Link</h3>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                   <FileText size={24} />
                </div>
                <div>
                   <p className="text-sm font-black text-gray-800 dark:text-gray-100">{deposit.tenant}</p>
                   <p className="text-xs font-bold text-gray-500">{deposit.unit}</p>
                </div>
             </div>
          </section>

          {/* Action List */}
          <section className="space-y-3">
             <button 
                onClick={() => onAction('deduction', deposit)}
                className="w-full py-4 bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/30 text-red-600 rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-3 active:scale-95"
             >
                <Trash2 size={16} /> Record Deduction
             </button>
             <button 
                onClick={() => onAction('return', deposit)}
                disabled={deposit.status === 'Returning'}
                className="w-full py-4 bg-[#1a6644] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl shadow-[#1a6644]/20 hover:bg-[#155236] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-30"
             >
                <Undo2 size={18} /> Process Return to Tenant
             </button>
          </section>

          {/* Compliance Log */}
          <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 flex gap-3">
             <ShieldCheck className="text-blue-500 flex-shrink-0" size={16} />
             <div className="space-y-1">
                <p className="text-[9px] font-black text-blue-800 tracking-widest uppercase">Escrow Compliance</p>
                <p className="text-[10px] text-blue-700 font-bold leading-relaxed">
                  Funds are secured in UK Client Monies Account (CMA-882). Interest generated (currently 0.2% p.a.) is credited to Arrivio General Fund.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
