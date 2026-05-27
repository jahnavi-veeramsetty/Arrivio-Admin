import { Euro } from 'lucide-react';

export default function ServiceFeeSummary({ serviceFees }) {
  const outstanding = serviceFees.filter((serviceFee) => serviceFee.status === 'Pending');
  const totalOutstanding = outstanding.reduce((sum, serviceFee) => sum + serviceFee.amount, 0);

  return (
    <div className="bg-[#1a6644] text-white rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
      <Euro size={80} className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md">
            <Euro size={18} />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Pending Service Fees</h3>
        </div>

        <div className="mb-6">
          <div className="text-3xl font-bold tracking-tighter mb-1">€{totalOutstanding.toLocaleString()}</div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Three-week outstanding balance at end of Y2</p>
        </div>

        <div className="mt-auto space-y-2.5">
          {outstanding.map((serviceFee) => (
            <div key={serviceFee.id} className="flex justify-between items-center bg-white/10 hover:bg-white/15 transition-colors p-2.5 rounded-xl backdrop-blur-sm border border-white/5">
              <div className="min-w-0">
                <div className="text-[11px] font-bold truncate">{serviceFee.agency}</div>
                <div className="text-[9px] uppercase font-bold text-white/50 tracking-wider">{serviceFee.category}</div>
              </div>
              <div className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white">€{serviceFee.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
