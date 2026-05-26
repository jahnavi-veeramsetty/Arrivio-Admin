import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import RefundsTable from '../../components/finance/refunds/RefundsTable';
import RefundDetail from '../../components/finance/refunds/RefundDetail';
import { mockRefunds } from '../../mockdata/financeData';
import { useToast } from '../../components/ui/Toast';

export default function RefundsPage() {
  const { addToast } = useToast();
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (refund) => {
    setSelectedRefund(refund);
    setIsDetailOpen(true);
  };

  const handleProcess = (refund) => {
    addToast({
      title: 'Refund Processed',
      description: `Refund ${refund.id} of €${refund.amount} has been successfully settled via Stripe.`,
      type: 'success',
    });
    setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Refund Management"
        description="Process and monitor rejected deposits, overpayments, and security deposit returns."
        breadcrumbs={['Finance', 'Refunds']}
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <RefundsTable
          refunds={mockRefunds}
          onViewDetail={handleViewDetail}
        />
      </div>

      <RefundDetail
        refund={selectedRefund}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onProcess={handleProcess}
      />
    </div>
  );
}
