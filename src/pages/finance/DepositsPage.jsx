import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import DepositsLedger from '../../components/finance/deposits/DepositsLedger';
import DepositDetail from '../../components/finance/deposits/DepositDetail';
import { mockDeposits } from '../../mockdata/financeData';
import { useToast } from '../../components/ui/Toast';

export default function DepositsPage() {
  const { addToast } = useToast();
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (deposit) => {
    setSelectedDeposit(deposit);
    setIsDetailOpen(true);
  };

  const handleAction = (type, deposit) => {
    if (type === 'deduction') {
      addToast({
        title: 'Entering Adjustment Mode',
        description: `Please specify the reason and amount for the deduction on ${deposit.id}.`,
        type: 'info',
      });
    } else if (type === 'return') {
      addToast({
        title: 'Return Processed',
        description: `Deposit return of €${deposit.amount - deposit.deductions} for ${deposit.tenant} initiated on Stripe.`,
        type: 'success',
      });
      setIsDetailOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Deposits"
        description="Escrow management and return processing for tenant security deposits."
        breadcrumbs={['Finance', 'Security Deposits']}
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <DepositsLedger
          deposits={mockDeposits}
          onViewDetail={handleViewDetail}
        />
      </div>

      <DepositDetail
        deposit={selectedDeposit}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAction={handleAction}
      />
    </div>
  );
}
