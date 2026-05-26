import { X, Calendar, Activity, Users, FileText } from 'lucide-react';

export default function ReservationDetail({ reservation, partner, onClose }) {
  if (!reservation || !partner) return null;

  const fillRate = reservation.roomsReserved > 0 ? (reservation.roomsFilled / reservation.roomsReserved) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
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

        <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8">
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
              <div className="h-full transition-all duration-700 rounded-full bg-[#1a6644]" style={{ width: `${fillRate}%` }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <FileText size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Reserved</span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{reservation.roomsReserved} Rooms</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2 text-blue-400">
                  <Users size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Allocated</span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{reservation.roomsFilled} Rooms</p>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-wider">Reservation Window</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center bg-amber-50/50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100/50 dark:border-amber-900/30">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-400">Timing</div>
                <div className="text-sm font-black text-amber-800 dark:text-amber-200 italic font-mono">
                  {reservation.daysRemaining ? `${reservation.daysRemaining} days` : 'Rolling'}
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 px-1 leading-relaxed italic">
                {reservation.notes}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
