import { useState, useEffect } from 'react';
import {
  ChevronUp, ChevronDown, Download, UserCheck,
  CheckCircle2, XCircle, Clock, FileText, Shield, X, Eye
} from 'lucide-react';
import { applicantSections } from '../../../mockdata/b2cData';

// ── Constants ─────────────────────────────────────────────────────

const statusStyles = {
  'Verified': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400',
  'Has Rejections': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400',
  'Pending Review': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
};

const individualDocStatusStyle = {
  Verified: { cls: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900', icon: <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" /> },
  Uploaded: { cls: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900', icon: <Clock size={13} className="text-blue-400 flex-shrink-0" /> },
  Rejected: { cls: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900', icon: <XCircle size={13} className="text-red-500 flex-shrink-0" /> },
};

// Helper for computing overall state (used inside panel)
function computeState(docs, requiredDocs) {
  const statuses = requiredDocs.map(d => docs[d.key]?.status || 'Uploaded');
  if (statuses.every(s => s === 'Verified')) return 'accepted';
  if (statuses.some(s => s === 'Rejected')) return 'rejected';
  return 'pending';
}

// ── Slide‑over ────────────────────────────────────────────────────

function DocReviewPanel({ applicant, onDocUpdate, onClose, showToast }) {
  const section = applicantSections.find(s => s.id === applicant.applicantType);
  const docs = applicant.docs;
  const [viewing, setViewing] = useState(null);
  const [reviewerName, setReviewerName] = useState(applicant.reviewer === 'Unassigned' ? '' : applicant.reviewer);

  const handleVerifyAll = () => {
    if (!reviewerName.trim()) return;
    const newDocs = { ...docs };
    section.requiredDocs.forEach(d => {
      newDocs[d.key] = { ...newDocs[d.key], status: 'Verified' };
    });
    onDocUpdate({
      ...applicant,
      reviewer: reviewerName,
      docs: newDocs
    });
    showToast('All documents verified.', 'success');
  };

  const handleRejectAll = () => {
    if (!reviewerName.trim()) return;
    const newDocs = { ...docs };
    section.requiredDocs.forEach(d => {
      newDocs[d.key] = { ...newDocs[d.key], status: 'Rejected' };
    });
    onDocUpdate({
      ...applicant,
      reviewer: reviewerName,
      docs: newDocs
    });
    showToast('All documents rejected — applicant will be notified.', 'warn');
  };

  const overallState = computeState(docs, section.requiredDocs);
  const isActionable = reviewerName.trim().length > 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{applicant.name}</h2>
            <p className="text-xs text-gray-400">{applicant.id} · {applicant.city} · <span className="text-[#1a6644] font-semibold">{section.label}</span></p>
          </div>
          <div className="flex items-center gap-3">
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
        </div>

        {/* Doc list */}
        <div className="flex-grow overflow-y-auto px-6 py-5 space-y-4">
          <div className="space-y-3">
            {section.requiredDocs.map(reqDoc => {
              const doc = docs[reqDoc.key];
              const st = doc?.status || 'Uploaded';
              const sty = individualDocStatusStyle[st] || individualDocStatusStyle.Uploaded;

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
                      <Eye size={11} /> View Document
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        {overallState === 'pending' && (
          <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-700 px-6 py-4 flex flex-col gap-4 bg-gray-50 dark:bg-gray-800/50">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Decision Handled By</p>
              <input
                type="text"
                placeholder="Enter reviewer name..."
                value={reviewerName}
                onChange={e => setReviewerName(e.target.value)}
                className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a6644]/30"
              />
            </div>
            <div className="flex gap-3 text-center">
              <button
                disabled={!isActionable}
                onClick={handleVerifyAll}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all ${isActionable
                  ? 'bg-[#1a6644] text-white hover:bg-[#155236] shadow-md hover:shadow-lg active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  }`}
              >
                <CheckCircle2 size={15} /> Verify All
              </button>
              <button
                disabled={!isActionable}
                onClick={handleRejectAll}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all ${isActionable
                  ? 'border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  }`}
              >
                <XCircle size={15} /> Reject All
              </button>
            </div>
          </div>
        )}

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

    </>
  );
}

// ── Main Table Component ──────────────────────────────────────────

export default function DocumentsTable({ apps, onUpdate, showToast, initialAppId }) {
  const [selected, setSelected] = useState([]);
  const [sideSelected, setSideSelected] = useState(null);
  const [sortKey, setSortKey] = useState('days');
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => {
    if (initialAppId) {
      const app = apps.find(a => a.id === initialAppId);
      if (app) setSideSelected(app);
    }
  }, [initialAppId, apps]);

  const getOverallStatus = (docs) => {
    const statuses = Object.values(docs).map(d => d.status);
    if (statuses.every(s => s === 'Verified')) return 'Verified';
    if (statuses.some(s => s === 'Rejected')) return 'Has Rejections';
    return 'Pending Review';
  };

  const statusPriority = { 'Pending Review': 0, 'Has Rejections': 1, 'Verified': 2 };

  const sorted = [...apps].sort((a, b) => {
    const pa = statusPriority[getOverallStatus(a.docs)] ?? 99;
    const pb = statusPriority[getOverallStatus(b.docs)] ?? 99;
    if (pa !== pb) return pa - pb;

    const av = a[sortKey], bv = b[sortKey];
    return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === sorted.length ? [] : sorted.map(a => a.id));

  const sortIcon = (key) => sortKey === key
    ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
    : <ChevronDown size={12} className="opacity-30" />;

  const setSort = (key) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('desc'); } };

  const thCls = 'text-left text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wide px-3 py-3 cursor-pointer select-none hover:text-gray-600 dark:hover:text-gray-300';
  const tdCls = 'px-3 py-3 text-sm text-gray-700 dark:text-gray-300';

  return (
    <div>
      {/* Bulk actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 mb-3 px-4 py-2.5 bg-[#1a6644]/5 dark:bg-[#1a6644]/10 border border-[#1a6644]/20 rounded-xl">
          <span className="text-sm text-[#1a6644]">{selected.length} selected</span>
          <button onClick={() => showToast(`Assigned reviewer to ${selected.length} apps`, 'success')} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-[#1a6644] transition-colors">
            <UserCheck size={13} /> Assign reviewer
          </button>
          <button onClick={() => showToast('Exporting CSV…', 'success')} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-[#1a6644] transition-colors">
            <Download size={13} /> Export CSV
          </button>
          <button onClick={() => setSelected([])} className="ml-auto text-xs text-gray-400 hover:text-gray-600">Clear</button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-3 py-3 w-8">
                  <input type="checkbox" checked={selected.length === sorted.length && sorted.length > 0} onChange={toggleAll}
                    className="rounded border-gray-300 dark:border-gray-600 text-[#1a6644] focus:ring-[#1a6644]" />
                </th>
                <th className={thCls} onClick={() => setSort('name')}>Applicant {sortIcon('name')}</th>
                <th className={thCls} onClick={() => setSort('applicantType')}>Type {sortIcon('applicantType')}</th>
                <th className={thCls} onClick={() => setSort('city')}>City {sortIcon('city')}</th>
                <th className={thCls} onClick={() => setSort('submitted')}>Submitted {sortIcon('submitted')}</th>
                <th className={thCls}>Status</th>
                <th className={thCls}>Reviewer</th>
                <th className={thCls} onClick={() => setSort('days')}>Days {sortIcon('days')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {sorted.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-12 text-sm text-gray-400">No applicants match the current filters.</td></tr>
              ) : sorted.map(app => (
                <tr
                  key={app.id}
                  onClick={() => setSideSelected(app)}
                  className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="px-3 py-3 w-8" onClick={e => { e.stopPropagation(); toggle(app.id); }}>
                    <input type="checkbox" checked={selected.includes(app.id)} onChange={() => toggle(app.id)}
                      className="rounded border-gray-300 dark:border-gray-600 text-[#1a6644] focus:ring-[#1a6644]" />
                  </td>
                  <td className={tdCls}>
                    <p className="text-gray-800 dark:text-gray-100">{app.name}</p>
                    <p className="text-xs text-gray-400">{app.id}</p>
                  </td>
                  <td className={`${tdCls} capitalize`}>{app.applicantType.replace('_', ' ')}</td>
                  <td className={tdCls}>{app.city}</td>
                  <td className={tdCls}>{app.submitted}</td>
                  <td className={tdCls}>
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[getOverallStatus(app.docs)] || ''}`}>
                      {getOverallStatus(app.docs)}
                    </span>
                  </td>
                  <td className={`${tdCls} text-gray-500 dark:text-gray-400`}>{app.reviewer}</td>
                  <td className={tdCls}>
                    <span className={`text-xs ${app.days > 20 ? 'text-red-600 dark:text-red-400' : app.days > 10 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500'}`}>
                      {app.days}d
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over */}
      {sideSelected && (
        <DocReviewPanel
          applicant={sideSelected}
          onDocUpdate={(updated) => {
            onUpdate(updated);
            setSideSelected(updated);
          }}
          onClose={() => setSideSelected(null)}
          showToast={showToast}
        />
      )}
    </div>
  );
}
