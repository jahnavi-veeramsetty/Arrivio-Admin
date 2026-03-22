import { mockApplications, mockMoveEvents } from '../../../mockdata/b2cData';

const total        = mockApplications.length;
const thisMonth    = mockApplications.filter(a => a.submitted >= '2025-03-01').length;
const pending      = mockApplications.filter(a => a.status === 'Pending').length;
const avgDays      = Math.round(mockApplications.filter(a=>a.status==='Approved').reduce((s,a)=>s+a.days,0)/3);
const unsigned     = mockApplications.filter(a => a.status === 'Approved').length;
const actionReq    = mockApplications.filter(a => a.status === 'Action Required').length;
const moveInsWeek  = mockMoveEvents.filter(e => e.type === 'Move-in' && e.status !== 'Completed').length;

const cards = [
  { label:'Total Applications', value:`${total}`, sub:`${thisMonth} this month`,   flag: null     },
  { label:'Pending Review',     value:`${pending}`, sub:'awaiting decision',        flag: pending > 10 ? 'amber' : null },
  { label:'Unsigned Agreements', value:`${unsigned}`, sub:'approved, awaiting countersign', flag: unsigned > 0 ? 'red' : null },
  { label:'Action Required',     value:`${actionReq}`, sub:'awaiting resubmission', flag: actionReq > 0 ? 'amber' : null },
  { label:'Move-ins This Week',  value:`${moveInsWeek}`, sub:'next 7 days',         flag: 'green'  },
];

const flagStyle = { amber:'bg-amber-50 border-amber-200 text-amber-700', red:'bg-red-50 border-red-200 text-red-700', green:'bg-green-50 border-green-200 text-green-700' };

export default function MetricCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((c,i) => (
        <div
          key={i}
          className={`rounded-xl border p-4 ${c.flag ? flagStyle[c.flag] : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}
        >
          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${c.flag ? '' : 'text-gray-500 dark:text-gray-400'}`}>{c.label}</p>
          <p className={`text-2xl font-bold ${c.flag ? '' : 'text-gray-900 dark:text-white'}`}>{c.value}</p>
          <p className={`text-xs mt-0.5 ${c.flag ? 'opacity-70' : 'text-gray-400 dark:text-gray-500'}`}>{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
