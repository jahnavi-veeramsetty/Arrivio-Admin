import { useState } from 'react';
import { X, CheckCircle2, XCircle, AlertTriangle, MessageSquare, Eye, Lock } from 'lucide-react';

export default function ApplicationDetail({ app, canAction, isSupport, onClose, showToast }) {
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('visible');
  const [showAction, setShowAction] = useState(false);
  const [actionNote, setActionNote] = useState('');

  if (!app) return null;

  const statusBadge = {
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'In Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Action Required': 'bg-orange-50 text-orange-700 border-orange-200',
  };

  const handleApprove = () => { showToast('Application approved — full payment email sent.', 'success'); onClose(); };
  const handleReject = () => { showToast('Application rejected — holding deposit refunded, rejection email sent.', 'success'); onClose(); };
  const handleAction = () => { if (!actionNote.trim()) return; showToast('Application paused — instruction sent to applicant.', 'warn'); setShowAction(false); setActionNote(''); };
  const handleNote = () => { if (!noteText.trim()) return; showToast(noteType === 'visible' ? 'Note sent to applicant.' : 'Internal note saved.', 'success'); setNoteText(''); };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Slide-over */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{app.name}</h2>
            <p className="text-xs text-gray-400">{app.id} · {app.city}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusBadge[app.status] || ''}`}>{app.status}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><X size={18} /></button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-5 space-y-5">
          {/* Applicant Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Applicant Info</p>
            {[['Email', app.email], ['Unit Applied', app.unit], ['Property', app.property], ['Submitted', app.submitted], ['Reviewer', app.reviewer], ['Payment', app.paymentStatus]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{k}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{v}</span>
              </div>
            ))}
          </div>

          {/* Documents — hidden for Support Agent */}
          {!isSupport ? (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Documents Uploaded</p>
              <div className={`space-y-2 ${app.docStatus === 'complete' || app.docStatus === 'verified' ? '' : 'opacity-60'}`}>
                {['Passport', 'Proof of Income', 'Visa (if applicable)'].map(doc => (
                  <div key={doc} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{doc}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${app.docStatus === 'verified' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                      }`}>{app.docStatus === 'verified' ? 'Verified' : 'Uploaded'}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-500">
              <Lock size={13} /> Documents are not accessible in Support Agent view.
            </div>
          )}

          {/* Action Required modal */}
          {showAction && (
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-4">
              <p className="text-xs font-bold text-orange-700 dark:text-orange-400 mb-2">Set Action Required — enter instruction for applicant:</p>
              <textarea
                rows={3}
                className="w-full text-sm border border-orange-200 dark:border-orange-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
                value={actionNote}
                onChange={e => setActionNote(e.target.value)}
                placeholder="e.g. Please resubmit your proof of income with bank statements…"
              />
              <div className="flex gap-2 mt-2">
                <button onClick={handleAction} className="flex-1 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-600 transition-colors">Send to Applicant</button>
                <button onClick={() => setShowAction(false)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 rounded-lg">Cancel</button>
              </div>
            </div>
          )}

          {/* Add Note */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Add Note</p>
            {!isSupport && (
              <div className="flex gap-2 mb-2">
                {['visible', 'internal'].map(t => (
                  <button
                    key={t}
                    onClick={() => setNoteType(t)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-semibold transition-colors ${noteType === t ? 'border-[#1a6644] bg-[#1a6644]/5 text-[#1a6644]' : 'border-gray-200 dark:border-gray-700 text-gray-500'
                      }`}
                  >
                    {t === 'internal' && <Eye size={10} />}
                    {t === 'visible' ? 'Visible (emailed to applicant)' : 'Internal (never sent)'}
                  </button>
                ))}
              </div>
            )}
            <textarea
              rows={2}
              className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6644]/30"
              placeholder="Type your note…"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            />
            <button onClick={handleNote} className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#1a6644] hover:underline">
              <MessageSquare size={12} /> Save note
            </button>
          </div>
        </div>

        {/* Footer actions — gated */}
        {canAction && (
          <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-700 px-6 py-4 flex gap-3">
            <button onClick={handleApprove} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1a6644] text-white text-sm font-semibold rounded-xl hover:bg-[#155236] transition-colors">
              <CheckCircle2 size={15} /> Approve
            </button>
            <button onClick={() => setShowAction(true)} className="px-4 py-2.5 border border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
              <AlertTriangle size={15} />
            </button>
            <button onClick={handleReject} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <XCircle size={15} /> Reject
            </button>
          </div>
        )}
      </div>
    </>
  );
}
