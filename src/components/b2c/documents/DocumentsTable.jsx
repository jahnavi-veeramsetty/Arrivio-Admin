import { useState, useMemo } from 'react';
import {
  Briefcase, Building2, GraduationCap,
  FileText, CheckCircle2, XCircle, Clock,
  Shield, X, Eye, ChevronRight,
} from 'lucide-react';
import { applicantSections, applicantDocData } from '../../../mockdata/b2cData';

// ── Constants ─────────────────────────────────────────────────────

const ICONS = { Briefcase, Building2, GraduationCap };

const statusStyle = {
  Verified: { cls: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900', icon: <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> },
  Uploaded: { cls: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900', icon: <Clock size={13} className="text-blue-400 flex-shrink-0" /> },
  Rejected: { cls: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900', icon: <XCircle size={13} className="text-red-500 flex-shrink-0" /> },
};

function computeState(docs, requiredDocs) {
  const statuses = requiredDocs.map(d => docs[d.key]?.status || 'Uploaded');
  if (statuses.every(s => s === 'Verified')) return 'accepted';
  if (statuses.some(s => s === 'Rejected')) return 'rejected';
  return 'pending';
}

// ── Slide‑over ────────────────────────────────────────────────────

function DocReviewPanel({ applicant, section, allDocs, onDocUpdate, onClose, showToast }) {
  const docs = allDocs[applicant.appId];
  const [viewing, setViewing] = useState(null);
  const [rejectKey, setRejectKey] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const verify = (key) => {
    onDocUpdate(applicant.appId, key, 'Verified');
    showToast('Document verified.', 'success');
  };

  const doReject = () => {
    if (!rejectReason.trim()) return;
    onDocUpdate(applicant.appId, rejectKey, 'Rejected');
    showToast('Document rejected — applicant will be notified.', 'warn');
    setRejectKey(null);
    setRejectReason('');
  };

  const overallState = computeState(docs, section.requiredDocs);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
          <div className="flex-grow">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{applicant.name}</h2>
            <p className="text-xs text-gray-400">{applicant.appId} · {applicant.city} · <span className="text-[#1a6644] font-semibold">{section.label}</span></p>
          </div>
          {overallState === 'accepted' && (
            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full border border-green-100 dark:border-green-800">
              <CheckCircle2 size={11} /> All Verified
            </span>
          )}
          {overallState === 'rejected' && (
            <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/30 px-2.5 py-1 rounded-full border border-red-100 dark:border-red-800">
              <XCircle size={11} /> Has Rejections
            </span>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><X size={18} /></button>
        </div>

        {/* Doc list */}
        <div className="flex-grow overflow-y-auto px-6 py-5 space-y-3">
          {section.requiredDocs.map(reqDoc => {
            const doc = docs[reqDoc.key];
            const st = doc?.status || 'Uploaded';
            const sty = statusStyle[st] || statusStyle.Uploaded;

            return (
              <div key={reqDoc.key}
                className={`border rounded-xl p-4 transition-all ${st === 'Verified' ? 'border-green-100 dark:border-green-900/40 bg-green-50/20 dark:bg-green-900/10'
                    : st === 'Rejected' ? 'border-red-100 dark:border-red-900/40 bg-red-50/20 dark:bg-red-900/10'
                      : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
              >
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-2 flex-grow">
                    {sty.icon}
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{reqDoc.label}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${sty.cls}`}>{st}</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 ml-5 mb-1">{reqDoc.description}</p>
                {doc?.uploaded && <p className="text-[10px] text-gray-400 ml-5">Uploaded {doc.uploaded}</p>}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => setViewing(reqDoc)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Eye size={11} /> View
                  </button>
                  {st === 'Uploaded' && (
                    <button onClick={() => verify(reqDoc.key)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 px-3 py-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                      <CheckCircle2 size={11} /> Verify
                    </button>
                  )}
                  {st === 'Uploaded' && (
                    <button onClick={() => setRejectKey(reqDoc.key)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <XCircle size={11} /> Reject
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* GDPR footer */}
        <div className="flex-shrink-0 px-6 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
          <Shield size={11} className="text-amber-500 flex-shrink-0" />
          <p className="text-[11px] text-gray-400">All document views are logged to audit trail (GDPR).</p>
        </div>
      </div>

      {/* Inline viewer modal */}
      {viewing && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setViewing(null)} />
          <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 mx-auto max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-[61] overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{viewing.label}</p>
                <p className="text-xs text-gray-400">{applicant.name}</p>
              </div>
              <button onClick={() => setViewing(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 h-64 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <FileText size={36} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">{viewing.label}</p>
              </div>
            </div>
            <div className="px-5 py-3 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800 flex items-center gap-2">
              <Shield size={11} className="text-amber-600" />
              <p className="text-xs text-amber-700 dark:text-amber-400">View logged to audit trail (GDPR).</p>
            </div>
          </div>
        </>
      )}

      {/* Reject reason */}
      {rejectKey && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[60]" onClick={() => setRejectKey(null)} />
          <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 mx-auto max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-[61] px-6 py-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Reject Document</h3>
            <p className="text-xs text-gray-400 mb-3">The applicant will be notified by email to resubmit.</p>
            <textarea rows={3}
              className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
              value={rejectReason} onChange={e => setRejectReason(e.target.value)}
              placeholder="e.g. Document appears expired. Please resubmit." />
            <div className="flex gap-2 mt-3">
              <button onClick={doReject} className="flex-1 py-2 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600">Reject &amp; Notify</button>
              <button onClick={() => setRejectKey(null)} className="px-4 py-2 text-sm text-gray-500 rounded-xl">Cancel</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ── Side column card (Accepted / Rejected) ────────────────────────

function SideCard({ applicant, section, onClick, variant }) {
  const isAccepted = variant === 'accepted';
  return (
    <button onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border transition-all hover:shadow-sm ${isAccepted
          ? 'border-green-100 dark:border-green-900/40 bg-green-50/40 dark:bg-green-900/10 hover:border-green-300'
          : 'border-red-100 dark:border-red-900/40 bg-red-50/40 dark:bg-red-900/10 hover:border-red-300'
        }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{applicant.name}</p>
          <p className="text-[10px] text-gray-400">{applicant.city}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {isAccepted
            ? <CheckCircle2 size={14} className="text-green-500" />
            : <XCircle size={14} className="text-red-400" />
          }
          <ChevronRight size={12} className="text-gray-300" />
        </div>
      </div>
    </button>
  );
}

// ── Center applicant card ─────────────────────────────────────────

function PendingCard({ applicant, section, docs, onClick }) {
  const { requiredDocs } = section;
  const verified = requiredDocs.filter(d => docs[d.key]?.status === 'Verified').length;
  const total = requiredDocs.length;

  return (
    <button onClick={onClick}
      className="w-full text-left p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#1a6644]/30 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#1a6644] transition-colors">{applicant.name}</p>
          <p className="text-xs text-gray-400">{applicant.appId} · {applicant.city}</p>
        </div>
        <Clock size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
      </div>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>Verified</span>
          <span className="font-bold">{verified}/{total}</span>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-[#1a6644] transition-all" style={{ width: `${(verified / total) * 100}%` }} />
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5 mt-2">
        {requiredDocs.map(d => {
          const st = docs[d.key]?.status || 'Uploaded';
          return (
            <span key={d.key} title={`${d.label}: ${st}`}
              className={`h-2 w-2 rounded-full flex-shrink-0 ${st === 'Verified' ? 'bg-green-400' : st === 'Rejected' ? 'bg-red-400' : 'bg-blue-300'
                }`}
            />
          );
        })}
      </div>
    </button>
  );
}

// ── Main export ───────────────────────────────────────────────────

export default function DocumentsTable({ showToast }) {
  const [activeSection, setActiveSection] = useState(applicantSections[0]);
  const [selected, setSelected] = useState(null);

  // Lift all doc statuses into one state map { appId: { docKey: { uploaded, status } } }
  const initialDocs = useMemo(() => {
    const map = {};
    applicantDocData.forEach(a => { map[a.appId] = { ...a.docs }; });
    return map;
  }, []);
  const [allDocs, setAllDocs] = useState(initialDocs);

  const updateDoc = (appId, key, status) => {
    setAllDocs(prev => ({
      ...prev,
      [appId]: { ...prev[appId], [key]: { ...prev[appId][key], status } },
    }));
  };

  // Split applicants in current section into accepted / rejected / pending
  const inSection = applicantDocData.filter(a => a.applicantType === activeSection.id);
  const accepted = inSection.filter(a => computeState(allDocs[a.appId], activeSection.requiredDocs) === 'accepted');
  const rejected = inSection.filter(a => computeState(allDocs[a.appId], activeSection.requiredDocs) === 'rejected');
  const pending = inSection.filter(a => computeState(allDocs[a.appId], activeSection.requiredDocs) === 'pending');

  // Close panel if selected applicant moves out of pending
  const selectedApplicant = selected
    ? applicantDocData.find(a => a.appId === selected.appId)
    : null;

  return (
    <div className="space-y-4">
      {/* Section tabs */}
      <div className="flex items-center gap-0 border-b border-gray-100 dark:border-gray-800">
        {applicantSections.map(section => {
          const Icon = ICONS[section.icon];
          const total = applicantDocData.filter(a => a.applicantType === section.id).length;
          const isActive = section.id === activeSection.id;
          return (
            <button key={section.id}
              onClick={() => { setActiveSection(section); setSelected(null); }}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${isActive
                  ? 'border-[#1a6644] text-[#1a6644]'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
            >
              <Icon size={14} />
              {section.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#1a6644]/10 text-[#1a6644]' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>{total}</span>
            </button>
          );
        })}
      </div>

      {/* Required docs legend */}
      <div className="flex flex-wrap gap-2">
        {activeSection.requiredDocs.map(d => (
          <span key={d.key} className="text-xs font-medium px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-500 dark:text-gray-400">
            {d.label}
          </span>
        ))}
      </div>


      {/* ── PENDING: full width ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-blue-400" />
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pending Review</h3>
          <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">{pending.length}</span>
        </div>
        {pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-300 dark:text-gray-600 gap-2">
            <CheckCircle2 size={28} />
            <p className="text-sm font-medium">All caught up!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
            {pending.map(a => (
              <PendingCard key={a.appId} applicant={a} section={activeSection} docs={allDocs[a.appId]} onClick={() => setSelected(a)} />
            ))}
          </div>
        )}
      </div>

      {/* ── BELOW ROW: Rejected (left) + Accepted (right) ── */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">

        {/* Rejected */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={14} className="text-red-400" />
            <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Rejected</h3>
            <span className="text-[10px] font-bold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full">{rejected.length}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {rejected.length === 0 ? (
              <p className="text-xs text-gray-300 dark:text-gray-600 italic">None yet</p>
            ) : rejected.map(a => (
              <SideCard key={a.appId} applicant={a} section={activeSection} variant="rejected" onClick={() => setSelected(a)} />
            ))}
          </div>
        </div>

        {/* Accepted */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={14} className="text-green-500" />
            <h3 className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Accepted</h3>
            <span className="text-[10px] font-bold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full">{accepted.length}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {accepted.length === 0 ? (
              <p className="text-xs text-gray-300 dark:text-gray-600 italic">None yet</p>
            ) : accepted.map(a => (
              <SideCard key={a.appId} applicant={a} section={activeSection} variant="accepted" onClick={() => setSelected(a)} />
            ))}
          </div>
        </div>

      </div>

      {/* Slide-over */}
      {selectedApplicant && (
        <DocReviewPanel
          applicant={selectedApplicant}
          section={activeSection}
          allDocs={allDocs}
          onDocUpdate={updateDoc}
          onClose={() => setSelected(null)}
          showToast={showToast}
        />
      )}
    </div>
  );
}
