import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import InvoicesTable from '../../components/finance/invoices/InvoicesTable';
import InvoiceDetail from '../../components/finance/invoices/InvoiceDetail';
import { mockInvoices } from '../../mockdata/financeData';
import { useToast } from '../../components/ui/Toast';

export default function InvoicesPage() {
  const { addToast } = useToast();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailOpen(true);
  };

  const handleAction = (type, invoice) => {
    if (type === 'generate') {
      addToast({
        title: 'Batch Generation Started',
        description: 'System is generating June 2028 partner invoices. This process may take a minute.',
        type: 'info',
      });
    } else if (type === 'send') {
      addToast({
        title: 'Invoice Sent',
        description: `Invoice ${invoice.id} has been dispatched to ${invoice.partner}.`,
        type: 'success',
      });
      setIsDetailOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="B2B Invoices"
        description="Invoice management for employers, recruitment agencies, and university partners."
        breadcrumbs={['Finance', 'B2B Invoices']}
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <InvoicesTable
          invoices={mockInvoices}
          onViewDetail={handleViewDetail}
          onAction={handleAction}
        />
      </div>

      <InvoiceDetail
        invoice={selectedInvoice}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAction={handleAction}
      />
    </div>
  );
}
