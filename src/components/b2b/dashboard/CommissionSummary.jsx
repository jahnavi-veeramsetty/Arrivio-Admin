import { DollarSign } from 'lucide-react';

export default function CommissionSummary({ commissions }) {
  const outstanding = commissions
    .filter(c => c.status === 'Pending')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const totalOutstanding = outstanding.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="bg-[#1a6644] text-white rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Decorative icon background */}
      <DollarSign size={80} className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md">
            <DollarSign size={18} />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Pending Commissions</h3>
        </div>
        
        <div className="mb-6">
          <div className="text-3xl font-bold tracking-tighter mb-1">${totalOutstanding.toLocaleString()}</div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Total Outstanding Across {new Set(outstanding.map(o => o.agency)).size} Agencies</p>
        </div>

        <div className="mt-auto space-y-2.5">
          {outstanding.slice(0, 3).map(c => (
            <div key={c.id} className="flex justify-between items-center bg-white/10 hover:bg-white/15 transition-colors p-2.5 rounded-xl backdrop-blur-sm border border-white/5">
              <div className="min-w-0">
                <div className="text-[11px] font-bold truncate">{c.agency}</div>
                <div className="text-[9px] uppercase font-bold text-white/50 tracking-wider">Due {new Date(c.dueDate).toLocaleDateString()}</div>
              </div>
              <div className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white">${c.amount}</div>
            </div>
          ))}
          {outstanding.length > 3 && (
            <div className="text-[10px] font-bold text-center text-white/50 tracking-wider uppercase">
              + {outstanding.length - 3} more records
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
