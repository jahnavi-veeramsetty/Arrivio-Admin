export const mockPayments = [
  { id: 'PAY-8821', tenant: 'Priya Nair', type: 'Rent', amount: 1250, date: '2026-03-15', status: 'Succeeded', city: 'London', stripeRef: 'ch_3Nabc...123' },
  { id: 'PAY-8822', tenant: 'Tomás Bravo', type: 'Deposit', amount: 500, date: '2026-03-14', status: 'Succeeded', city: 'Berlin', stripeRef: 'ch_3Ndef...456' },
  { id: 'PAY-8823', tenant: 'Yuki Tanaka', type: 'Holding Fee', amount: 200, date: '2026-03-14', status: 'Succeeded', city: 'Tokyo', stripeRef: 'ch_3Nghi...789' },
  { id: 'PAY-8824', tenant: 'Marco Silva', type: 'Rent', amount: 950, date: '2026-03-12', status: 'Failed', city: 'Lisbon', stripeRef: 'ch_3Njkl...012' },
  { id: 'PAY-8825', tenant: 'Elena Rossi', type: 'Rent', amount: 1100, date: '2026-03-10', status: 'Succeeded', city: 'Milan', stripeRef: 'ch_3Nmno...345' },
];

export const mockInvoices = [
  { id: 'INV-2026-001', partner: 'Global Tech Solutions', amount: 15400, period: 'March 2026', status: 'Paid', dueDate: '2026-03-10', sentDate: '2026-03-01' },
  { id: 'INV-2026-002', partner: 'Creative Minds Agency', amount: 8200, period: 'March 2026', status: 'Overdue', dueDate: '2026-03-05', sentDate: '2026-03-01' },
  { id: 'INV-2026-003', partner: 'NextGen Logistics', amount: 12100, period: 'March 2026', status: 'Sent', dueDate: '2026-03-25', sentDate: '2026-03-01' },
  { id: 'INV-2026-004', partner: 'Urban Living Prop MGMT', amount: 22500, period: 'Feb 2026', status: 'Paid', dueDate: '2026-02-15', sentDate: '2026-02-01' },
  { id: 'INV-2026-005', partner: 'Starlight Estates', amount: 6700, period: 'March 2026', status: 'Draft', dueDate: '2026-03-31', sentDate: null },
];

export const mockRefunds = [
  { id: 'RFD-9901', amount: 500, reason: 'Rejected Deposit', admin: 'Elena R. (Finance)', status: 'Pending', date: '2026-03-20', tenant: 'Tomás Bravo' },
  { id: 'RFD-9902', amount: 1200, reason: 'Security Deposit Return', admin: 'Sarah J. (Ops)', status: 'Succeeded', date: '2026-03-18', tenant: 'John Doe' },
  { id: 'RFD-9903', amount: 250, reason: 'Overpayment', admin: 'Elena R. (Finance)', status: 'Pending', date: '2026-03-21', tenant: 'Alice Smith' },
  { id: 'RFD-9904', amount: 300, reason: 'Early Departure Adjustment', admin: 'Aarav M. (Super)', status: 'Failed', date: '2026-03-15', tenant: 'Bob Johnson' },
];

export const mockDeposits = [
  { id: 'DEP-4401', tenant: 'Priya Nair', unit: 'Unit 402 - LDN', amount: 1250, moveOut: '2026-12-31', status: 'Held', deductions: 0 },
  { id: 'DEP-4402', tenant: 'Elena Rossi', unit: 'Unit 102 - MIL', amount: 1100, moveOut: '2026-09-15', status: 'Deduction Pending', deductions: 150 },
  { id: 'DEP-4403', tenant: 'Yuki Tanaka', unit: 'Unit 505 - TYO', amount: 2000, moveOut: '2026-05-20', status: 'Returning', deductions: 0 },
  { id: 'DEP-4404', tenant: 'Marco Silva', unit: 'Unit 201 - LIS', amount: 950, moveOut: '2026-07-01', status: 'Held', deductions: 0 },
];

export const mockInvestors = [
  { id: 'INS-001', name: 'Westside Capital', nextPayout: '2026-04-01', grossRent: 45000, fee: 4500, netPayout: 40500, status: 'Pending' },
  { id: 'INS-002', name: 'Riverside Assets', nextPayout: '2026-04-01', grossRent: 28000, fee: 2800, netPayout: 25200, status: 'Paid' },
  { id: 'INS-003', name: 'Skyline Ventures', nextPayout: '2026-04-15', grossRent: 62000, fee: 6200, netPayout: 55800, status: 'Pending' },
];

export const mockPricing = [
  { city: 'London', studio: 1200, oneBed: 1600, twoBed: 2200, tiers: { short: 1.2, med: 1.1, long: 1.0 } },
  { city: 'Berlin', studio: 900, oneBed: 1300, twoBed: 1800, tiers: { short: 1.15, med: 1.08, long: 1.0 } },
  { city: 'Tokyo', studio: 1500, oneBed: 2100, twoBed: 2800, tiers: { short: 1.25, med: 1.12, long: 1.0 } },
];

export const mockTransactions = [
  { id: 'TRX-5501', type: 'B2C Receipt', user: 'Priya Nair', amount: 1250, date: '2026-03-21T10:30:00Z', status: 'Success' },
  { id: 'TRX-5502', type: 'B2B Payment', user: 'Global Tech', amount: 15400, date: '2026-03-21T09:15:00Z', status: 'Success' },
  { id: 'TRX-5503', type: 'Refund', user: 'Tomás Bravo', amount: -500, date: '2026-03-21T08:45:00Z', status: 'Pending' },
  { id: 'TRX-5504', type: 'B2C Receipt', user: 'Elena Rossi', amount: 1100, date: '2026-03-20T16:20:00Z', status: 'Success' },
];

export const mockRevenueTrends = [
  { month: 'Apr 25', b2c: 120000, b2b: 45000 },
  { month: 'May 25', b2c: 125000, b2b: 48000 },
  { month: 'Jun 25', b2c: 130000, b2b: 52000 },
  { month: 'Jul 25', b2c: 128000, b2b: 55000 },
  { month: 'Aug 25', b2c: 135000, b2b: 60000 },
  { month: 'Sep 25', b2c: 140000, b2b: 65000 },
  { month: 'Oct 25', b2c: 145000, b2b: 70000 },
  { month: 'Nov 25', b2c: 150000, b2b: 75000 },
  { month: 'Dec 25', b2c: 160000, b2b: 80000 },
  { month: 'Jan 26', b2c: 155000, b2b: 85000 },
  { month: 'Feb 26', b2c: 165000, b2b: 90000 },
  { month: 'Mar 26', b2c: 175000, b2b: 95000 },
];
