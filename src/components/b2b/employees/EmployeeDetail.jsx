import { X, User, Building2, MapPin, Calendar, Home, CheckCircle2, Mail, ExternalLink, Briefcase } from 'lucide-react';
import { useRole } from '../../../utils/rbac';

export default function EmployeeDetail({ employee, onClose, onAction }) {
  const canAssign = useRole(['super_admin', 'ops_manager']);
  
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
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

        {/* Content */}
        <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8">
          
          {/* Status Banner */}
          <div className={`p-4 rounded-2xl flex items-center gap-4 border ${
            employee.status === 'Housed' ? 'bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30' : 
            employee.status === 'Departed' ? 'bg-gray-50 border-gray-100 dark:bg-gray-800 dark:border-gray-700' :
            'bg-amber-50/50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30'
          }`}>
            <div className={`p-2 rounded-xl ${
              employee.status === 'Housed' ? 'bg-green-500 text-white' : 
              employee.status === 'Departed' ? 'bg-gray-500 text-white' :
              'bg-amber-500 text-white shadow-lg shadow-amber-500/20 animate-pulse'
            }`}>
              {employee.status === 'Housed' ? <CheckCircle2 size={18} /> : <Home size={18} />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Status</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{employee.status}</p>
            </div>
          </div>

          {/* Logistics */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 border-b border-gray-50 dark:border-gray-800 pb-2">
              <Briefcase size={16} />
              <h3 className="text-[11px] font-black uppercase tracking-widest">Assignment Details</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Company', value: employee.company, icon: Building2 },
                { label: 'Destination City', value: employee.city, icon: MapPin },
                { label: 'Employment Start', value: new Date(employee.startDate).toLocaleDateString(), icon: Calendar },
                { label: 'Housing Unit', value: employee.unit, icon: Home, highlight: employee.unit === 'Unassigned' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-[#1a6644] transition-colors">
                      <item.icon size={14} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{item.label}</span>
                  </div>
                  <span className={`text-sm font-bold ${item.highlight ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Lease Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400 border-b border-gray-50 dark:border-gray-800 pb-2">
              <Calendar size={16} />
              <h3 className="text-[11px] font-black uppercase tracking-widest">Lease Agreement</h3>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/20 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-blue-800 dark:text-blue-300">Contract End Date</span>
                <span className="font-black text-blue-900 dark:text-blue-200">{new Date(employee.leaseEnd).toLocaleDateString()}</span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-white dark:bg-gray-800 hover:bg-white/50 border border-blue-200 dark:border-blue-800 rounded-xl text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-all">
                <ExternalLink size={12} /> View DocuSign Record
              </button>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        {canAssign && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col gap-3">
            {employee.status === 'Awaiting Housing' ? (
              <button 
                onClick={() => onAction('Assign Unit')} 
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1a6644] text-white text-sm font-black uppercase tracking-widest rounded-xl hover:bg-[#155236] transition-all shadow-xl shadow-[#1a6644]/20"
              >
                <Home size={16} /> Assign Specific Unit
              </button>
            ) : (
              <button 
                onClick={() => onAction('Update Status')} 
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-mono"
              >
                Update Occupancy Status
              </button>
            )}
            <button className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors text-center">
              Internal Move History →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
