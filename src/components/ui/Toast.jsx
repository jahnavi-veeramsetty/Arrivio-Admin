import { useState, useCallback } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';

let _id = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success') => {
    const id = ++_id;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, show, dismiss };
}

const icons = {
  success: <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />,
  error:   <XCircle     size={15} className="text-red-500 flex-shrink-0"   />,
  warn:    <AlertTriangle size={15} className="text-amber-500 flex-shrink-0" />,
};

export function ToastContainer({ toasts, dismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 shadow-lg pointer-events-auto max-w-sm"
        >
          {icons[t.type] || icons.success}
          <span className="text-sm text-gray-700 dark:text-gray-200 flex-grow">{t.message}</span>
          <button onClick={() => dismiss(t.id)} className="text-gray-300 hover:text-gray-500 dark:hover:text-gray-400">
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
