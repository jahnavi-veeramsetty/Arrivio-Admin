import { X, Mail, Download, CheckCircle, FileX2, History, Send, CreditCard } from 'lucide-react';

export default function InvoiceDetail({ invoice, isOpen, onClose, onAction }) {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${
              invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              <FileX2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Invoice Record</p>
              <h2 className="text-2xl font-black italic text-gray-900 dark:text-gray-100">{invoice.id}</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-10">
          {/* Top Grid */}
          <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Partner Organization</p>
              <p className="text-base font-bold text-gray-800 dark:text-gray-100">{invoice.partner}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Billing Period</p>
              <p className="text-sm font-black text-[#1a6644] italic uppercase">{invoice.period}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                invoice.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200 shadow-sm shadow-red-100'
              }`}>
                {invoice.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Due</p>
              <p className="text-2xl font-black font-mono">£{invoice.amount.toLocaleString()}</p>
            </div>
          </div>

          {/* Timeline / History */}
          <section>
             <div className="flex items-center gap-2 mb-6">
                <History className="text-gray-400" size={16} />
                <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200">Invoice Timeline</h3>
             </div>
             <div className="space-y-4 ml-2 border-l-2 border-gray-50 dark:border-gray-800 pl-6">
                <div className="relative">
                   <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 shadow-sm"></div>
                   <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Invoice Generated</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">System Automated · March 01, 2026</p>
                </div>
                {invoice.sentDate && (
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-gray-900 shadow-sm"></div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Invoice Sent to Partner</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Admin Action · {new Date(invoice.sentDate).toLocaleDateString()}</p>
                  </div>
                )}
                {invoice.status === 'Paid' && (
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#1a6644] border-2 border-white dark:border-gray-900 shadow-sm"></div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Payment Confirmed</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Bank Transfer Ref: #BNK-9921</p>
                  </div>
                )}
             </div>
          </section>

          {/* Action List */}
          <section className="bg-[#f8f8f6] dark:bg-gray-800/40 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
             <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group active:scale-95">
                   <Download size={20} className="text-gray-400 group-hover:text-[#1a6644] mb-2" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Download PDF</span>
                </button>
                <button 
                  onClick={() => onAction('send', invoice)}
                  disabled={invoice.status === 'Paid' || invoice.status === 'Sent'}
                  className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group active:scale-95 disabled:opacity-30"
                >
                   <Mail size={20} className="text-gray-400 group-hover:text-blue-600 mb-2" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Resend to Partner</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group active:scale-95">
                   <CheckCircle size={20} className="text-gray-400 group-hover:text-green-600 mb-2" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Mark as Paid</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group active:scale-95">
                   <CreditCard size={20} className="text-gray-400 group-hover:text-amber-600 mb-2" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Issue Credit</span>
                </button>
             </div>
             
             <button className="w-full mt-6 py-4 bg-[#1a6644] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl shadow-[#1a6644]/20 hover:bg-[#155236] transition-all active:scale-95 flex items-center justify-center gap-3">
                <Send size={18} /> Send Reminders Now
             </button>
          </section>

          {/* Quick Note */}
          <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-900 flex gap-3 italic">
             <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
               <strong>Financial Note:</strong> Overdue status triggers 3% monthly compounding interest according to Service Level Agreement (SLA) clause 4.2.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
