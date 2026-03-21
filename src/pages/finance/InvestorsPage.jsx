import PageHeader from '../../components/layout/PageHeader';
import InvestorsTable from '../../components/finance/investors/InvestorsTable';
import PayoutSchedule from '../../components/finance/investors/PayoutSchedule';
import { mockInvestors } from '../../mockdata/financeData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';

export default function InvestorsPage() {
  const { activeRole, user } = useAuth();
  const { addToast } = useToast();
  const role = activeRole || user?.roles?.[0];

  const canAdjust = role === 'super_admin';
  const isViewOnly = role === 'sales_partnership';

  const handleViewDetail = (investor) => {
    // Shared modal or detail logic
    console.log('Viewing investor:', investor.name);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Investor Payouts" 
        description="Manage recurring rental payouts to property investors and fee reconciliation."
        breadcrumbs={['Finance', 'Investors']}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-in fade-in slide-in-from-left duration-700">
          <InvestorsTable 
            investors={mockInvestors} 
            onViewDetail={handleViewDetail}
            canAdjust={canAdjust}
          />
        </div>
        <div className="animate-in fade-in slide-in-from-right duration-700">
          <PayoutSchedule investors={mockInvestors} />
        </div>
      </div>

      {isViewOnly && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs font-bold text-blue-800 uppercase tracking-widest">
            View-Only Access: As a Sales Partner, you can monitor payout statuses but cannot modify schedules or amounts.
          </p>
        </div>
      )}
    </div>
  );
}
