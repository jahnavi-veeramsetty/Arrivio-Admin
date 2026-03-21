import MoveList from '../../components/b2c/move/MoveList';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';
import { mockMoveEvents } from '../../mockdata/b2cData';

export default function MovePage() {
  const canAction = useRole(['super_admin', 'ops_manager']);
  const { toasts, show, dismiss } = useToast();

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">B2C Applications → Move-ins / Move-outs</p>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Move-ins & Move-outs</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Scheduled and completed move events across all properties. Toggle between list and calendar view.
        </p>
      </div>
      <MoveList events={mockMoveEvents} canAction={canAction} showToast={show} />
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
