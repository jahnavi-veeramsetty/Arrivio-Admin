import MoveCalendar from '../../components/b2c/move/MoveCalendar';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { mockMoveEvents } from '../../mockdata/b2cData';

export default function MovePage() {
  const canAction = useRole(['super_admin', 'ops_manager']);
  const { toasts, show, dismiss } = useToast();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2">B2C Operations → Schedule</p>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Move-ins & Move-outs</h1>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
            A comprehensive visual timeline of all resident transitions. Monitor upcoming arrivals and departures across your portfolio.
          </p>
        </div>
      </div>
      
      <MoveCalendar events={mockMoveEvents} />
      
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
