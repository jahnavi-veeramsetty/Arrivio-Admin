import { unsignedAgreements } from '../../../mockdata/b2cData';
import { FileSignature, ExternalLink } from 'lucide-react';

export default function UnsignedAgreements() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/30 rounded-xl p-5">
      <h2 className="text-sm font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
        <FileSignature size={14} />
        Unsigned Agreements
        <span className="ml-auto bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {unsignedAgreements.length} pending
        </span>
      </h2>
      <div className="space-y-0 divide-y divide-gray-50 dark:divide-gray-700">
        {unsignedAgreements.map(app => (
          <div key={app.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{app.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{app.unit} · {app.city}</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1a6644] hover:underline">
              <ExternalLink size={11} />
              DocuSign
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
