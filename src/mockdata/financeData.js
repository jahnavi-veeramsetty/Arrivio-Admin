export const mockPayments = [
  { id: 'PAY-9001', tenant: 'Aarav Mehta', type: 'Rent', amount: 765, date: '2028-06-15', status: 'Succeeded', city: 'Düsseldorf', stripeRef: 'sepa_9001' },
  { id: 'PAY-9002', tenant: 'Selin Aydin', type: 'Rent', amount: 720, date: '2028-06-14', status: 'Succeeded', city: 'Berlin', stripeRef: 'stripe_9002' },
  { id: 'PAY-9003', tenant: 'Roxana Popescu', type: 'Reservation Fee', amount: 220, date: '2028-06-13', status: 'Succeeded', city: 'Düsseldorf', stripeRef: 'stripe_9003' },
  { id: 'PAY-9004', tenant: 'Chinonso Okafor', type: 'Rent', amount: 765, date: '2028-06-12', status: 'Pending', city: 'Frankfurt', stripeRef: 'invoice_9004' },
  { id: 'PAY-9005', tenant: 'Mateusz Lewandowski', type: 'Deposit', amount: 720, date: '2028-06-10', status: 'Succeeded', city: 'Düsseldorf', stripeRef: 'stripe_9005' },
];

export const mockInvoices = [
  { id: 'INV-2028-001', partner: 'Klinikum Düsseldorf GmbH', amount: 70560, period: 'June 2028', status: 'Paid', dueDate: '2028-06-10', sentDate: '2028-06-01' },
  { id: 'INV-2028-002', partner: 'Universitätsklinikum Köln', amount: 55440, period: 'June 2028', status: 'Sent', dueDate: '2028-07-05', sentDate: '2028-06-25', daysUntilDue: 14 },
  { id: 'INV-2028-003', partner: 'Heinrich-Heine-Universität Düsseldorf', amount: 94080, period: 'Autumn Semester Block', status: 'Sent', dueDate: '2028-07-12', sentDate: '2028-06-25', daysUntilDue: 21 },
  { id: 'INV-2028-004', partner: 'Hays Germany GmbH', amount: 14280, period: 'June 2028', status: 'Overdue', dueDate: '2028-06-08', sentDate: '2028-05-28', daysOverdue: 13 },
  { id: 'INV-2028-005', partner: 'Randstad Deutschland GmbH', amount: 11760, period: 'June 2028', status: 'Draft', dueDate: '2028-07-18', sentDate: null, daysUntilDue: 27 },
];

export const mockRefunds = [
  { id: 'RFD-2028-001', amount: 720, reason: 'Duplicate apartment deposit capture', admin: 'Elena R. (Finance)', status: 'Pending', date: '2028-06-20', tenant: 'Selin Aydin' },
  { id: 'RFD-2028-002', amount: 765, reason: 'Lease start moved by employer cohort', admin: 'Sarah J. (Ops)', status: 'Pending', date: '2028-06-19', tenant: 'Mercy Dela Cruz' },
  { id: 'RFD-2028-003', amount: 220, reason: 'Reservation fee reversal after duplicate booking', admin: 'Elena R. (Finance)', status: 'Succeeded', date: '2028-06-18', tenant: 'Carlos Medina' },
];

export const mockDeposits = [
  { id: 'DEP-2028-001', tenant: 'Aarav Mehta', unit: 'D-3-214 · Düsseldorf Flingern', amount: 765, moveOut: '2029-03-31', status: 'Held', deductions: 0 },
  { id: 'DEP-2028-002', tenant: 'Selin Aydin', unit: 'APT-BER-04 · Berlin apartment portfolio', amount: 720, moveOut: '2029-05-09', status: 'Held', deductions: 0 },
  { id: 'DEP-2028-003', tenant: 'Mateusz Lewandowski', unit: 'APT-DUS-19 · Düsseldorf apartment portfolio', amount: 720, moveOut: '2029-03-31', status: 'Returning', deductions: 0 },
];

export const mockPricing = [
  { city: 'Düsseldorf', studio: 1300, oneBed: 850, twoBed: 600, tiers: { short: 1.1, med: 1.05, long: 1 } },
  { city: 'Cologne', studio: 1300, oneBed: 850, twoBed: 600, tiers: { short: 1.1, med: 1.05, long: 1 } },
  { city: 'Berlin', studio: 1300, oneBed: 850, twoBed: 600, tiers: { short: 1.12, med: 1.06, long: 1 } },
];

export const mockTransactions = [
  { id: 'TRX-2028-001', type: 'B2B Receipt', user: 'Klinikum Düsseldorf GmbH', amount: 70560, date: '2028-06-21T10:30:00Z', status: 'Success' },
  { id: 'TRX-2028-002', type: 'B2C Receipt', user: 'Selin Aydin', amount: 720, date: '2028-06-21T09:15:00Z', status: 'Success' },
  { id: 'TRX-2028-003', type: 'Service Fee Accrual', user: 'Recruitment agency service fees', amount: 31800, date: '2028-06-20T08:45:00Z', status: 'Pending' },
  { id: 'TRX-2028-004', type: 'Reservation Fee', user: 'Roxana Popescu', amount: 220, date: '2028-06-20T16:20:00Z', status: 'Success' },
];

export const mockRevenueTrends = [
  { month: 'Q5 FY27', b2c: 1080000, b2b: 1174000, services: 200000, annualRevenue: 19679179 },
  { month: 'Q6 FY27', b2c: 1230000, b2b: 2514000, services: 310000, annualRevenue: 19679179 },
  { month: 'Q7 FY28', b2c: 1380000, b2b: 3844000, services: 430000, annualRevenue: 19679179 },
  { month: 'Q8 FY28', b2c: 1556078, b2b: 5090959, services: 606142, annualRevenue: 19679179 },
];
