import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import PaymentsTable from '../../components/finance/payments/PaymentsTable';
import PaymentDetail from '../../components/finance/payments/PaymentDetail';
import { mockPayments } from '../../mockdata/financeData';
import { useToast } from '../../components/ui/Toast';

export default function PaymentsPage() {
  const { addToast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (payment) => {
    setSelectedPayment(payment);
    setIsDetailOpen(true);
  };

  const handleRefund = (payment) => {
    addToast({
      title: 'Refund Initiated',
      description: `A refund of €${payment.amount} for ${payment.tenant} has been queued on Stripe.`,
      type: 'success',
    });
    setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="B2C Payments"
        description="Monitor and manage all tenant transactions including rent and deposits."
        breadcrumbs={['Finance', 'B2C Payments']}
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <PaymentsTable
          payments={mockPayments}
          onViewDetail={handleViewDetail}
        />
      </div>

      <PaymentDetail
        payment={selectedPayment}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onRefund={handleRefund}
      />
    </div>
  );
}
