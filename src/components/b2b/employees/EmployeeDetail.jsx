import { X, User, Building2, MapPin, Calendar, Home, CheckCircle2, Briefcase, Clock, Receipt } from 'lucide-react';

export default function EmployeeDetail({ employee, onClose }) {
  if (!employee) return null;

  const statusClass = employee.status === 'Lease Active'
    ? 'bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30'
    : employee.status === 'Awaiting Visa Clearance'
      ? 'bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30'
      : 'bg-amber-50/50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-100 dark:border-gray-700 shadow-sm">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{employee.name}</h2>
              <p className="text-xs font-semibold text-[#1a6644] uppercase tracking-wide">{employee.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8">
          <div className={`p-4 rounded-2xl flex items-center gap-4 border ${statusClass}`}>
            <div className="p-2 rounded-xl bg-[#1a6644] text-white">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Status</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{employee.status}</p>
            </div>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 border-b border-gray-50 dark:border-gray-800 pb-2">
              <Briefcase size={16} />
              <h3 className="text-[11px] font-black uppercase tracking-widest">Assignment Details</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Company', value: employee.company, icon: Building2 },
                { label: 'Destination City', value: employee.city, icon: MapPin },
                { label: 'Move-in Date', value: employee.moveInDate, icon: Calendar },
                { label: 'Room / Building', value: employee.roomBuilding, icon: Home },
                { label: 'Lease Duration', value: employee.leaseDuration, icon: Clock },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-[#1a6644] transition-colors">
                      <item.icon size={14} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200 text-right max-w-[180px]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 border-b border-gray-50 dark:border-gray-800 pb-2">
              <Calendar size={16} />
              <h3 className="text-[11px] font-black uppercase tracking-widest">Lease Agreement</h3>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/20 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-blue-800 dark:text-blue-300">Contract End Date</span>
                <span className="font-black text-blue-900 dark:text-blue-200">{employee.leaseEnd}</span>
              </div>
              {employee.daysUntilStart && (
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-blue-800 dark:text-blue-300">Days Until Start</span>
                  <span className="font-black text-blue-900 dark:text-blue-200">{employee.daysUntilStart}</span>
                </div>
              )}
            </div>
          </section>

          {employee.paymentHistory && employee.paymentHistory.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400 border-b border-gray-50 dark:border-gray-800 pb-2">
                <Receipt size={16} />
                <h3 className="text-[11px] font-black uppercase tracking-widest">Payment History</h3>
              </div>
              <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-3 py-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">Period</th>
                      <th className="px-3 py-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">Paid</th>
                      <th className="px-3 py-2 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                      <th className="px-3 py-2 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Payer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {employee.paymentHistory.map((entry, index) => (
                      <tr key={index} className="bg-white dark:bg-gray-900">
                        <td className="px-3 py-2 text-xs font-bold text-gray-800 dark:text-gray-200">{entry.period}</td>
                        <td className="px-3 py-2 text-[11px] text-gray-500 dark:text-gray-400 tabular-nums">{entry.paidDate}</td>
                        <td className="px-3 py-2 text-xs font-bold text-gray-800 dark:text-gray-200 text-right tabular-nums">€{entry.amount.toLocaleString()}</td>
                        <td className="px-3 py-2 text-right">
                          <span className={`text-[9px] font-bold uppercase tracking-tight px-2 py-0.5 rounded-full ${
                            entry.payer === 'Employer'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {entry.payer}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
