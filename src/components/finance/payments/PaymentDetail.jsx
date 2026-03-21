import { X, Copy, ExternalLink, CheckCircle2, AlertTriangle, Undo2, Download, ShieldCheck } from 'lucide-react';

export default function PaymentDetail({ payment, isOpen, onClose, onRefund }) {
  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Slide-over */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a6644] mb-1 block">Payment Record</span>
            <h2 className="text-xl font-black italic text-gray-900 dark:text-gray-100">Details for {payment.id}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Status Header */}
          <div className={`p-6 rounded-3xl border ${
            payment.status === 'Succeeded' ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'
          } flex items-center justify-between`}>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Current Status</p>
              <div className="flex items-center gap-2">
                {payment.status === 'Succeeded' ? (
                  <CheckCircle2 className="text-green-600" size={24} />
                ) : (
                  <AlertTriangle className="text-red-600" size={24} />
                )}
                <span className={`text-2xl font-black italic ${
                  payment.status === 'Succeeded' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {payment.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Amount</p>
              <p className="text-3xl font-black font-mono">£{payment.amount.toLocaleString()}</p>
            </div>
          </div>

          {/* Transaction Metadata */}
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Transaction Metadata</h3>
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Tenant Name</p>
                <p className="text-sm font-bold">{payment.tenant}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Payment Type</p>
                <span className="text-[10px] font-black bg-gray-100 px-2 py-0.5 rounded uppercase">{payment.type}</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Date Processed</p>
                <p className="text-sm font-bold">{new Date(payment.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Location</p>
                <p className="text-sm font-bold underline underline-offset-4 decoration-gray-200">{payment.city}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Stripe Reference</p>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <code className="text-[11px] font-mono font-bold text-[#1a6644] flex-grow">{payment.stripeRef}</code>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors"><Copy size={14} /></button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors"><ExternalLink size={14} /></button>
                </div>
              </div>
            </div>
          </section>

          {/* Verification Log */}
          <section className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">Payment Verified</h3>
             </div>
             <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
               This payment was successfully matched with the 3DS verification from <strong>Stripe SCA</strong>. 
               Funds were settled to Arrivio Operating Account (Ending in 9904) on {new Date(payment.date).toLocaleDateString()}.
             </p>
             <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a6644] hover:underline">
               Download Full Audit Trail →
             </button>
          </section>

          {/* Actions */}
          <section className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button 
              onClick={() => onRefund(payment)}
              disabled={payment.status !== 'Succeeded'}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-amber-500 text-white rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all hover:bg-amber-600 disabled:opacity-50 shadow-xl shadow-amber-500/20 active:scale-[0.98]"
            >
              <Undo2 size={18} /> Initiate Stripe Refund
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all hover:bg-gray-50 active:scale-[0.98]">
              <Download size={18} /> Download Receipt PDF
            </button>
          </section>

          {/* Context Note */}
          <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
             <div className="flex gap-3">
                <AlertTriangle className="text-amber-600 flex-shrink-0" size={16} />
                <p className="text-[10px] text-amber-800 font-bold leading-normal">
                  Refunding this payment will trigger an automated email to {payment.tenant} and update the lease ledger in the B2C section. This action cannot be undone on Stripe.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
