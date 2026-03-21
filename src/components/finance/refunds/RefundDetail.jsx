import { X, Undo2, ClipboardList, User, ShieldAlert, History, MessageSquarePlus } from 'lucide-react';

export default function RefundDetail({ refund, isOpen, onClose, onProcess }) {
  if (!isOpen || !refund) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-6 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-500/20">
                <Undo2 size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block mb-1">Refund Request</span>
                <h2 className="text-xl font-black italic">{refund.id}</h2>
              </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
             <X size={20} />
           </button>
        </div>

        <div className="p-6 space-y-8">
           {/* Amount Hero */}
           <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Total Refund Amount</p>
              <p className="text-5xl font-black font-mono">£{refund.amount.toLocaleString()}</p>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest text-[#1a6644]">
                 <ShieldAlert size={12} /> Stripe SCA Verified
              </div>
           </div>

           {/* Core Details */}
           <section className="grid grid-cols-2 gap-6 px-4">
              <div>
                 <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Recipent Tenant</p>
                 <p className="text-sm font-bold">{refund.tenant}</p>
              </div>
              <div>
                 <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Initiating Admin</p>
                 <p className="text-sm font-bold italic">{refund.admin}</p>
              </div>
              <div className="col-span-2">
                 <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Reason / Justification</p>
                 <blockquote className="text-sm font-medium text-gray-700 dark:text-gray-300 border-l-4 border-amber-400 pl-4 py-1 italic">
                   "{refund.reason}"
                 </blockquote>
              </div>
           </section>

           {/* History Log */}
           <section className="bg-blue-50/30 dark:bg-blue-900/10 rounded-3xl p-6 border border-blue-50">
              <div className="flex items-center gap-2 mb-4">
                 <History size={16} className="text-blue-500" />
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-800">Processing Timeline</h3>
              </div>
              <div className="space-y-4 text-xs font-bold text-blue-700">
                 <div className="flex justify-between items-center opacity-70">
                    <span>Requested</span>
                    <span>{new Date(refund.date).toLocaleDateString()}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span>Security Review</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Completed</span>
                 </div>
                 <div className="flex justify-between items-center animate-pulse">
                    <span>Stripe Payout</span>
                    <span>{refund.status}</span>
                 </div>
              </div>
           </section>

           {/* Actions */}
           <section className="space-y-3 pt-4">
              <button 
                onClick={() => onProcess(refund)}
                disabled={refund.status !== 'Pending'}
                className="w-full py-4 bg-[#1a6644] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl shadow-[#1a6644]/20 hover:bg-[#155236] transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center gap-3"
              >
                <ClipboardList size={18} /> Confirm & Process Refund
              </button>
              <button className="w-full py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                 <MessageSquarePlus size={16} /> Add Internal Note
              </button>
           </section>

           {/* Compliance Warning */}
           <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100 flex gap-3">
              <ShieldAlert className="text-red-500 flex-shrink-0" size={14} />
              <p className="text-[9px] text-red-900 font-bold leading-normal">
                FEDERAL COMPLIANCE: Refunds exceeding £1,000 require manual CFO override under AML-4 regulations. This action is immutable and will be visible in the annual audit trail.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
