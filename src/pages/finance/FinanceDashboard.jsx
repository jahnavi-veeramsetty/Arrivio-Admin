import PageHeader from '../../components/layout/PageHeader';
import FinanceMetricCards from '../../components/finance/dashboard/FinanceMetricCards';
import RevenueTrendChart from '../../components/finance/dashboard/RevenueTrendChart';
import OverdueInvoiceList from '../../components/finance/dashboard/OverdueInvoiceList';
import UpcomingInvoiceDates from '../../components/finance/dashboard/UpcomingInvoiceDates';
import PendingRefundsList from '../../components/finance/dashboard/PendingRefundsList';
import RecentTransactions from '../../components/finance/dashboard/RecentTransactions';
import { mockRevenueTrends, mockInvoices, mockRefunds, mockTransactions } from '../../mockdata/financeData';

export default function FinanceDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Finance Dashboard" 
        description="Consolidated financial overview across B2C and B2B operations."
        breadcrumbs={['Finance', 'Dashboard']}
      />

      <FinanceMetricCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueTrendChart data={mockRevenueTrends} />
        </div>
        <div className="flex flex-col gap-6">
          <UpcomingInvoiceDates invoices={mockInvoices} />
          <PendingRefundsList refunds={mockRefunds} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <OverdueInvoiceList invoices={mockInvoices} />
        </div>
        <div className="lg:col-span-2">
          <RecentTransactions transactions={mockTransactions} />
        </div>
      </div>
    </div>
  );
}
