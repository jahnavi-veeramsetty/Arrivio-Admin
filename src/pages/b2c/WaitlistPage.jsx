import WaitlistTable from '../../components/b2c/waitlist/WaitlistTable';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { mockWaitlist } from '../../mockdata/b2cData';

export default function WaitlistPage() {
  const canAction   = useRole(['super_admin', 'ops_manager']);
  const isSuperAdmin = useRole(['super_admin']);
  const { toasts, show, dismiss } = useToast();

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">B2C Applications → Waitlist</p>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Waitlist</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Applicants waiting for a unit type that is currently fully occupied. {mockWaitlist.length} entries.
          {isSuperAdmin && <span className="ml-1 text-[#1a6644] font-medium">Drag rows to reorder.</span>}
        </p>
      </div>
      <WaitlistTable entries={mockWaitlist} canAction={canAction} isSuperAdmin={isSuperAdmin} showToast={show} />
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
