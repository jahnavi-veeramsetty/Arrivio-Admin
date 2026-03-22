import { useState } from 'react';
import { X, CheckCircle2, XCircle, AlertTriangle, MessageSquare, Eye, Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { applicantSections } from '../../../mockdata/b2cData';

export default function ApplicationDetail({ app, canAction, isSupport, onClose, onUpdate, showToast }) {
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('internal');
  const [reviewerName, setReviewerName] = useState(app.reviewer === 'Unassigned' ? '' : app.reviewer);

  if (!app) return null;

  const section = applicantSections.find(s => s.id === app.applicantType) || applicantSections[0];
  const docs = app.docs || {};

  const statusBadge = {
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'In Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Action Required': 'bg-orange-50 text-orange-700 border-orange-200',
  };

  const handleApprove = () => {
    onUpdate({ ...app, status: 'Approved', reviewer: reviewerName || 'Admin' });
    showToast('Application approved — full payment email sent.', 'success');
    onClose();
  };
  const handleReject = () => {
    onUpdate({ ...app, status: 'Rejected', reviewer: reviewerName || 'Admin' });
    showToast('Application rejected — holding deposit refunded, rejection email sent.', 'success');
    onClose();
  };
  const handleNote = () => { if (!noteText.trim()) return; showToast('Internal note saved.', 'success'); setNoteText(''); };

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
            <p className="text-xs text-gray-400">
              {app.id} · {app.city} · <span className="text-[#1a6644] font-bold">{section.label}</span>
            </p>
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
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Documents Uploaded</p>
                <Link 
                  to={`/admin/b2c/documents?appId=${app.id}`} 
                  className="flex items-center gap-1 text-[10px] font-bold text-[#1a6644] uppercase tracking-wider hover:underline"
                >
                  <ExternalLink size={10} /> Open Document Review
                </Link>
              </div>
              <div className={`space-y-2`}>
                {section.requiredDocs.map(reqDoc => {
                  const doc = docs[reqDoc.key];
                  const st = doc?.status || 'Uploaded';
                  const isVerified = st === 'Verified';
                  const isRejected = st === 'Rejected';

                  return (
                    <div key={reqDoc.key} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{reqDoc.label}</span>
                        {doc?.uploaded && <span className="text-[9px] text-gray-400">Uploaded {doc.uploaded}</span>}
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${isVerified ? 'bg-green-50 text-green-700 border-green-100' :
                          isRejected ? 'bg-red-50 text-red-700 border-red-100' :
                            'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                        {st}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-500">
              <Lock size={13} /> Documents are not accessible in Support Agent view.
            </div>
          )}

          {/* Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Add Note</p>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#1a6644] bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 px-2 py-1 rounded-full px-3">
                <Eye size={10} /> Internal (never sent)
              </div>
            </div>
            <textarea
              rows={3}
              placeholder="Type your note..."
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6644]/30"
            />
            <button
              onClick={handleNote}
              className="flex items-center gap-2 text-xs font-bold text-[#1a6644] hover:underline"
            >
              <MessageSquare size={14} /> Save note
            </button>
          </div>
        </div>

        {/* Footer actions — gated. Hidden if already Approved or Rejected */}
        {canAction && !['Approved', 'Rejected'].includes(app.status) && (
          <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-700 px-6 py-4 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Decision Handled By</p>
              <input
                type="text"
                placeholder="Enter reviewer name..."
                value={reviewerName}
                onChange={e => setReviewerName(e.target.value)}
                className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6644]/30"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={handleApprove} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1a6644] text-white text-sm font-semibold rounded-xl hover:bg-[#155236] transition-colors">
                <CheckCircle2 size={15} /> Approve
              </button>
              <button onClick={handleReject} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <XCircle size={15} /> Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
