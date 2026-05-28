export const mockPayments = [
  { id: 'PAY-9001', tenant: 'Aarav Mehta', type: 'Rent', amount: 765, date: '2026-05-15', status: 'Succeeded', city: 'Düsseldorf', stripeRef: 'sepa_9001' },
  { id: 'PAY-9002', tenant: 'Selin Aydin', type: 'Rent', amount: 720, date: '2026-05-14', status: 'Succeeded', city: 'Berlin', stripeRef: 'stripe_9002' },
  { id: 'PAY-9003', tenant: 'Roxana Popescu', type: 'Reservation Fee', amount: 220, date: '2026-05-13', status: 'Succeeded', city: 'Düsseldorf', stripeRef: 'stripe_9003' },
  { id: 'PAY-9004', tenant: 'Chinonso Okafor', type: 'Rent', amount: 765, date: '2026-05-12', status: 'Pending', city: 'Frankfurt', stripeRef: 'invoice_9004' },
  { id: 'PAY-9005', tenant: 'Mateusz Lewandowski', type: 'Deposit', amount: 720, date: '2026-05-10', status: 'Succeeded', city: 'Düsseldorf', stripeRef: 'stripe_9005' },
];

export const mockInvoices = [
  { id: 'INV-2026-001', partner: 'Klinikum Düsseldorf GmbH', amount: 70560, period: 'May 2026', status: 'Paid', dueDate: '2026-05-10', sentDate: '2026-05-01' },
  { id: 'INV-2026-002', partner: 'Universitätsklinikum Köln', amount: 55440, period: 'May 2026', status: 'Sent', dueDate: '2026-06-05', sentDate: '2026-05-22', daysUntilDue: 10 },
  { id: 'INV-2026-003', partner: 'Heinrich-Heine-Universität Düsseldorf', amount: 94080, period: 'Summer Semester Block', status: 'Sent', dueDate: '2026-06-12', sentDate: '2026-05-22', daysUntilDue: 17 },
  { id: 'INV-2026-004', partner: 'Hays Germany GmbH', amount: 14280, period: 'May 2026', status: 'Overdue', dueDate: '2026-05-08', sentDate: '2026-04-28', daysOverdue: 18 },
  { id: 'INV-2026-005', partner: 'Randstad Deutschland GmbH', amount: 11760, period: 'May 2026', status: 'Draft', dueDate: '2026-06-18', sentDate: null, daysUntilDue: 23 },
];

export const mockRefunds = [
  { id: 'RFD-2026-001', amount: 720, reason: 'Duplicate apartment deposit capture', admin: 'Elena R. (Finance)', status: 'Pending', date: '2026-05-20', tenant: 'Selin Aydin' },
  { id: 'RFD-2026-002', amount: 765, reason: 'Lease start moved by employer cohort', admin: 'Sarah J. (Ops)', status: 'Pending', date: '2026-05-19', tenant: 'Mercy Dela Cruz' },
  { id: 'RFD-2026-003', amount: 220, reason: 'Reservation fee reversal after duplicate booking', admin: 'Elena R. (Finance)', status: 'Succeeded', date: '2026-05-18', tenant: 'Carlos Medina' },
];

export const mockDeposits = [
  { id: 'DEP-2026-001', tenant: 'Aarav Mehta', unit: 'D-3-214 · Düsseldorf Flingern', amount: 765, moveOut: '2027-03-31', status: 'Held', deductions: 0 },
  { id: 'DEP-2026-002', tenant: 'Selin Aydin', unit: 'APT-BER-04 · Berlin apartment portfolio', amount: 720, moveOut: '2027-05-09', status: 'Held', deductions: 0 },
  { id: 'DEP-2026-003', tenant: 'Mateusz Lewandowski', unit: 'APT-DUS-19 · Düsseldorf apartment portfolio', amount: 720, moveOut: '2027-03-31', status: 'Returning', deductions: 0 },
];

export const mockPricing = [
  { city: 'Düsseldorf', studio: 1300, oneBed: 850, twoBed: 600, tiers: { short: 1.1, med: 1.05, long: 1 } },
  { city: 'Cologne', studio: 1300, oneBed: 850, twoBed: 600, tiers: { short: 1.1, med: 1.05, long: 1 } },
  { city: 'Berlin', studio: 1300, oneBed: 850, twoBed: 600, tiers: { short: 1.12, med: 1.06, long: 1 } },
];

export const mockTransactions = [
  { id: 'TRX-2026-001', type: 'B2B Receipt', user: 'Klinikum Düsseldorf GmbH', amount: 70560, date: '2026-05-21T10:30:00Z', status: 'Success' },
  { id: 'TRX-2026-002', type: 'B2C Receipt', user: 'Selin Aydin', amount: 720, date: '2026-05-21T09:15:00Z', status: 'Success' },
  { id: 'TRX-2026-003', type: 'Service Fee Accrual', user: 'Recruitment agency service fees', amount: 31800, date: '2026-05-20T08:45:00Z', status: 'Pending' },
  { id: 'TRX-2026-004', type: 'Reservation Fee', user: 'Roxana Popescu', amount: 220, date: '2026-05-20T16:20:00Z', status: 'Success' },
];

export const mockRevenueTrends = [
  { month: 'Q5 FY27', b2c: 1080000, b2b: 1174000, services: 200000, annualRevenue: 19679179 },
  { month: 'Q6 FY27', b2c: 1230000, b2b: 2514000, services: 310000, annualRevenue: 19679179 },
  { month: 'Q7 FY28', b2c: 1380000, b2b: 3844000, services: 430000, annualRevenue: 19679179 },
  { month: 'Q8 FY28', b2c: 1556078, b2b: 5090959, services: 606142, annualRevenue: 19679179 },
];
