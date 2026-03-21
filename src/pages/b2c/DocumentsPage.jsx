import { Lock } from 'lucide-react';
import DocumentsTable from '../../components/b2c/documents/DocumentsTable';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useRole } from '../../utils/rbac';

export default function DocumentsPage() {
  const canAccess = useRole(['super_admin', 'ops_manager']);
  const { toasts, show, dismiss } = useToast();

  if (!canAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Lock size={32} className="text-gray-300 dark:text-gray-600" />
        <p className="text-base font-semibold text-gray-500 dark:text-gray-400">Access Denied</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-xs">
          Document review is only available to Super Admin and Ops Manager roles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">B2C Applications → Documents</p>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Document Review</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review uploaded documents per applicant. Select a section to see applicants by type, then click an applicant to review their documents.
        </p>
      </div>

      <DocumentsTable showToast={show} />
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
