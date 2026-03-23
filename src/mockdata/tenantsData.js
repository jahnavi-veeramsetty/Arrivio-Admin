export const tenantStats = {
  activeTenants: 184,
  b2cIndividuals: 112,
  b2bEmployees: 72,
  totalB2BCompanies: 8,
  leasesExpiring: 11,
  overdueRent: 4,
  monthlyB2BRevenue: 86000,
  collectedThisMonth: 312000,
  outstandingRent: 8400,
  avgDaysToPay: 2.4,
  remindersSent: 6
};

export const upcomingMoveOuts = [
  { id: 'MO-101', name: 'James Wilson', email: 'j.wilson@gmail.com', unit: '101', property: 'Riverside Apt', date: '2026-04-10', type: 'B2C', status: 'Departing' },
  { id: 'MO-102', name: 'Maria Garcia', email: 'm.garcia@hsbc-emp.com', unit: '304', property: 'Skyline View', date: '2026-04-12', type: 'B2B', status: 'Departing' },
  { id: 'MO-103', name: 'Robert Chen', email: 'r.chen@accenture.com', unit: '205', property: 'Central Plaza', date: '2026-04-15', type: 'B2B', status: 'Departing' },
  { id: 'MO-104', name: 'Emma Thompson', email: 'e.thompson@outlook.com', unit: '412', property: 'Green Gardens', date: '2026-04-20', type: 'B2C', status: 'Departing' }
];

export const overdueRentRecords = [
  { id: 'OR-101', name: 'David Miller', email: 'd.miller@gmail.com', unit: '502', property: 'Vista Heights', amount: 1250, daysOverdue: 5, type: 'B2C' },
  { id: 'OR-102', name: 'Sarah Jenkins', email: 's.jenkins@goldman.com', unit: '210', property: 'Skyline View', amount: 1800, daysOverdue: 3, type: 'B2B' },
  { id: 'OR-103', name: 'Michael Brown', email: 'm.brown@yahoo.com', unit: '115', property: 'Central Plaza', amount: 950, daysOverdue: 7, type: 'B2C' },
  { id: 'OR-104', name: 'Lisa Wang', email: 'l.wang@accenture.com', unit: '308', property: 'Riverside Apt', amount: 1400, daysOverdue: 2, type: 'B2B' }
];

export const allTenants = [
  { id: 'T-1001', name: 'Sophie Laurent', email: 'sophie.l@gmail.com', phone: '+44 7700 900123', type: 'B2C', unit: '201', property: 'Riverside Apt', city: 'London', leaseStart: '2025-03-01', leaseEnd: '2026-02-28', rentStatus: 'Paid', status: 'Active', monthlyRent: 1450, deposit: 1450, initials: 'SL' },
  { id: 'T-1002', name: 'Marcus Silva', email: 'm.silva@hsbc.com', phone: '+44 7700 900456', type: 'B2B', unit: '304', property: 'Skyline View', city: 'Manchester', leaseStart: '2025-01-15', leaseEnd: '2026-01-14', rentStatus: 'Paid', status: 'Active', monthlyRent: 1800, deposit: 1800, initials: 'MS' },
  { id: 'T-1003', name: 'Elena Vasquez', email: 'e.vasquez@accenture.com', phone: '+44 7700 900789', type: 'B2B', unit: '105', property: 'Central Plaza', city: 'London', leaseStart: '2025-06-01', leaseEnd: '2026-05-31', rentStatus: 'Overdue', status: 'Active', monthlyRent: 1200, deposit: 1200, initials: 'EV' },
  { id: 'T-1004', name: 'Thomas Müller', email: 't.mueller@web.de', phone: '+44 7700 900012', type: 'B2C', unit: '412', property: 'Green Gardens', city: 'Berlin', leaseStart: '2025-04-10', leaseEnd: '2026-04-09', rentStatus: 'Paid', status: 'Departing', monthlyRent: 1100, deposit: 1100, initials: 'TM' },
  { id: 'T-1005', name: 'Priya Nair', email: 'p.nair@goldman.com', phone: '+44 7700 900345', type: 'B2B', unit: '210', property: 'Skyline View', city: 'Frankfurt', leaseStart: '2025-09-01', leaseEnd: '2026-08-31', rentStatus: 'Paid', status: 'Active', monthlyRent: 2100, deposit: 2100, initials: 'PN' },
  { id: 'T-1006', name: 'Ahmed Hassan', email: 'a.hassan@outlook.com', phone: '+44 7700 900678', type: 'B2C', unit: '115', property: 'Central Plaza', city: 'London', leaseStart: '2025-02-20', leaseEnd: '2026-02-19', rentStatus: 'Overdue', status: 'Active', monthlyRent: 950, deposit: 950, initials: 'AH' },
  { id: 'T-1007', name: 'Chen Wei', email: 'c.wei@hsbc.com', phone: '+44 7700 900901', type: 'B2B', unit: '502', property: 'Vista Heights', city: 'Manchester', leaseStart: '2025-11-01', leaseEnd: '2026-10-31', rentStatus: 'Paid', status: 'Active', monthlyRent: 1600, deposit: 1600, initials: 'CW' },
  { id: 'T-1008', name: 'Jonas Keller', email: 'j.keller@startup.io', phone: '+44 7700 900234', type: 'B2C', unit: '308', property: 'Riverside Apt', city: 'Berlin', leaseStart: '2025-05-15', leaseEnd: '2026-05-14', rentStatus: 'Paid', status: 'Active', monthlyRent: 1350, deposit: 1350, initials: 'JK' }
];

export const b2bCompanies = [
  { 
    id: 'C-001', 
    name: 'Accenture', 
    contact: 'Sarah Jenkins', 
    headcount: '12 employees · 10 units', 
    city: 'London', 
    monthlyValue: 14400, 
    occupancy: 83, 
    contractEnd: '2025-12-31',
    employees: [
      { id: 'T-1003', name: 'Elena Vasquez', unit: '105', property: 'Central Plaza', leaseEnd: '2026-05-31', status: 'Housed' },
      { id: 'T-1101', name: 'Michael Scott', unit: '106', property: 'Central Plaza', leaseEnd: '2026-05-31', status: 'Housed' },
      { id: 'T-1102', name: 'Jim Halpert', unit: '107', property: 'Central Plaza', leaseEnd: '2026-05-31', status: 'Housed' }
    ]
  },
  { 
    id: 'C-002', 
    name: 'HSBC', 
    contact: 'John Doe', 
    headcount: '8 employees · 8 units', 
    city: 'Manchester', 
    monthlyValue: 14400, 
    occupancy: 100, 
    contractEnd: '2026-06-30',
    employees: [
      { id: 'T-1002', name: 'Marcus Silva', unit: '304', property: 'Skyline View', leaseEnd: '2026-01-14', status: 'Housed' },
      { id: 'T-1007', name: 'Chen Wei', unit: '502', property: 'Vista Heights', leaseEnd: '2026-10-31', status: 'Housed' }
    ]
  },
  { 
    id: 'C-003', 
    name: 'Goldman Sachs', 
    contact: 'Emma Brown', 
    headcount: '6 employees · 6 units', 
    city: 'Frankfurt', 
    monthlyValue: 12600, 
    occupancy: 100, 
    contractEnd: '2026-02-28',
    employees: [
      { id: 'T-1005', name: 'Priya Nair', unit: '210', property: 'Skyline View', leaseEnd: '2026-08-31', status: 'Housed' }
    ]
  }
];

export const leaseRecords = [
  { id: 'L-1001', name: 'Sophie Laurent', type: 'B2C', unit: '201', property: 'Riverside Apt', start: '2025-03-01', end: '2026-02-28', duration: '12 months', rent: 1450, status: 'Active' },
  { id: 'L-1002', name: 'Marcus Silva', type: 'B2B', unit: '304', property: 'Skyline View', start: '2025-01-15', end: '2026-01-14', duration: '12 months', rent: 1800, status: 'Active' },
  { id: 'L-1003', name: 'Elena Vasquez', type: 'B2B', unit: '105', property: 'Central Plaza', start: '2025-06-01', end: '2026-05-31', duration: '12 months', rent: 1200, status: 'Active' },
  { id: 'L-1004', name: 'Thomas Müller', type: 'B2C', unit: '412', property: 'Green Gardens', start: '2025-04-10', end: '2026-04-09', duration: '12 months', rent: 1100, status: 'Expiring soon' },
  { id: 'L-1005', name: 'Priya Nair', type: 'B2B', unit: '210', property: 'Skyline View', start: '2025-09-01', end: '2026-08-31', duration: '12 months', rent: 2100, status: 'Active' },
  { id: 'L-1006', name: 'Ahmed Hassan', type: 'B2C', unit: '115', property: 'Central Plaza', start: '2025-02-20', end: '2026-02-19', duration: '12 months', rent: 950, status: 'Active' },
  { id: 'L-1007', name: 'Chen Wei', type: 'B2B', unit: '502', property: 'Vista Heights', start: '2025-11-01', end: '2026-10-31', duration: '12 months', rent: 1600, status: 'Active' },
  { id: 'L-1008', name: 'Jonas Keller', type: 'B2C', unit: '308', property: 'Riverside Apt', start: '2025-05-15', end: '2026-05-14', duration: '12 months', rent: 1350, status: 'Active' }
];

export const rentLedger = [
  { id: 'RL-1001', name: 'Sophie Laurent', unit: '201', property: 'Riverside Apt', dueDate: '2024-03-01', amount: 1450, paidDate: '2024-03-01', method: 'Stripe', status: 'Paid' },
  { id: 'RL-1002', name: 'Ahmed Hassan', unit: '115', property: 'Central Plaza', dueDate: '2024-03-01', amount: 950, paidDate: '-', method: '-', status: 'Overdue' },
  { id: 'RL-1003', name: 'Elena Vasquez', unit: '105', property: 'Central Plaza', dueDate: '2024-03-01', amount: 1200, paidDate: '2024-03-02', method: 'Stripe', status: 'Paid' },
  { id: 'RL-1004', name: 'Lisa Wang', unit: '308', property: 'Riverside Apt', dueDate: '2024-03-01', amount: 1400, paidDate: '-', method: '-', status: 'Overdue' }
];

export const paymentHistory = [
  { period: 'Mar 2024', dueDate: '2024-03-01', amount: 1450, paidDate: '2024-03-01', status: 'Paid' },
  { period: 'Feb 2024', dueDate: '2024-02-01', amount: 1450, paidDate: '2024-02-01', status: 'Paid' },
  { period: 'Jan 2024', dueDate: '2024-01-01', amount: 1450, paidDate: '2024-01-02', status: 'Paid' },
  { period: 'Dec 2023', dueDate: '2023-12-01', amount: 1450, paidDate: '2023-12-01', status: 'Paid' }
];

export const activityTimeline = [
  { id: 1, title: 'Rent payment received', date: '2024-03-01 10:45', recent: true },
  { id: 2, title: 'Lease countersigned', date: '2024-02-28 14:20', recent: false },
  { id: 3, title: 'Application approved', date: '2024-02-25 09:15', recent: false },
  { id: 4, title: 'Application submitted', date: '2024-02-20 16:30', recent: false }
];
