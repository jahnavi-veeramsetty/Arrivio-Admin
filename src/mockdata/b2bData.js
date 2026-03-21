// ── Partners ───────────────────────────────────────────────────
export const mockPartners = [
  { id: 'P-001', name: 'Accenture', type: 'Employer', status: 'Active', manager: 'Sarah Jenkins', employees: 42, revenue: 125000, city: 'London' },
  { id: 'P-002', name: 'KPMG', type: 'Employer', status: 'Active', manager: 'Sarah Jenkins', employees: 28, revenue: 84000, city: 'Dubai' },
  { id: 'P-003', name: 'Global Talent Agency', type: 'Agency', status: 'Active', manager: 'Mike Chen', employees: 15, revenue: 45000, city: 'London' },
  { id: 'P-004', name: 'Oxford University', type: 'University', status: 'Active', manager: 'Elena Rodriguez', employees: 65, revenue: 180000, city: 'London' },
  { id: 'P-005', name: 'BlackRock', type: 'Employer', status: 'Active', manager: 'Mike Chen', employees: 34, revenue: 95000, city: 'Singapore' },
  { id: 'P-006', name: 'Prime Investors Group', type: 'Investor', status: 'Active', manager: 'Elena Rodriguez', employees: 12, revenue: 380000, city: 'Dubai' },
  { id: 'P-007', name: 'TechBridge Solutions', type: 'Employer', status: 'Pending', manager: 'Unassigned', employees: 0, revenue: 0, city: 'Singapore' },
  { id: 'P-008', name: 'Starlight Agency', type: 'Agency', status: 'Pending', manager: 'Unassigned', employees: 0, revenue: 0, city: 'London' },
  { id: 'P-009', name: 'National University of Singapore', type: 'University', status: 'Active', manager: 'Mike Chen', employees: 48, revenue: 110000, city: 'Singapore' },
  { id: 'P-010', name: 'Falcon Investment', type: 'Investor', status: 'Active', manager: 'Elena Rodriguez', employees: 8, revenue: 250000, city: 'Dubai' },
  { id: 'P-011', name: 'Deloitte', type: 'Employer', status: 'Active', manager: 'Sarah Jenkins', employees: 31, revenue: 89000, city: 'London' },
  { id: 'P-012', name: 'PwC', type: 'Employer', status: 'Inactive', manager: 'Sarah Jenkins', employees: 0, revenue: 62000, city: 'Dubai' },
];

// ── Capacity Reservations ───────────────────────────────────────
export const mockReservations = [
  { id: 'RES-001', partnerId: 'P-001', roomsReserved: 50, roomsFilled: 42, expiry: '2025-12-31', status: 'Active' },
  { id: 'RES-002', partnerId: 'P-002', roomsReserved: 30, roomsFilled: 28, expiry: '2025-06-30', status: 'Active' },
  { id: 'RES-003', partnerId: 'P-004', roomsReserved: 80, roomsFilled: 65, expiry: '2025-04-15', status: 'Expiring Soon' },
  { id: 'RES-004', partnerId: 'P-005', roomsReserved: 40, roomsFilled: 34, expiry: '2025-09-01', status: 'Active' },
  { id: 'RES-005', partnerId: 'P-006', roomsReserved: 15, roomsFilled: 12, expiry: '2025-03-25', status: 'Expiring Soon' },
  { id: 'RES-006', partnerId: 'P-010', roomsReserved: 10, roomsFilled: 8, expiry: '2025-08-15', status: 'Active' },
  { id: 'RES-007', partnerId: 'P-009', roomsReserved: 50, roomsFilled: 48, expiry: '2025-11-20', status: 'Active' },
  { id: 'RES-008', partnerId: 'P-003', roomsReserved: 20, roomsFilled: 15, expiry: '2025-01-10', status: 'Expired' },
];

// ── Employees ───────────────────────────────────────────────────
export const mockEmployees = [
  { id: 'EMP-001', name: 'John Doe', company: 'Accenture', city: 'London', unit: 'U-101', status: 'Housed', leaseEnd: '2025-12-31', startDate: '2025-01-01' },
  { id: 'EMP-002', name: 'Jane Smith', company: 'Accenture', city: 'London', unit: 'U-102', status: 'Housed', leaseEnd: '2025-12-31', startDate: '2025-01-01' },
  { id: 'EMP-003', name: 'Amir Khan', company: 'KPMG', city: 'Dubai', unit: 'Unassigned', status: 'Awaiting Housing', leaseEnd: '2025-06-30', startDate: '2025-04-01' },
  { id: 'EMP-004', name: 'Li Wei', company: 'BlackRock', city: 'Singapore', unit: 'U-505', status: 'Housed', leaseEnd: '2025-09-01', startDate: '2025-02-15' },
  { id: 'EMP-005', name: 'Sarah Miller', company: 'Oxford University', city: 'London', unit: 'Unassigned', status: 'Awaiting Housing', leaseEnd: '2025-04-15', startDate: '2025-03-25' },
  { id: 'EMP-006', name: 'David Wilson', company: 'BlackRock', city: 'Singapore', unit: 'Unassigned', status: 'Awaiting Housing', leaseEnd: '2025-09-01', startDate: '2025-03-28' },
  { id: 'EMP-007', name: 'Emma Brown', company: 'Deloitte', city: 'London', unit: 'U-303', status: 'Housed', leaseEnd: '2025-10-15', startDate: '2025-01-10' },
  { id: 'EMP-008', name: 'Mohammed Ali', company: 'Falcon Investment', city: 'Dubai', unit: 'U-707', status: 'Housed', leaseEnd: '2025-08-15', startDate: '2025-02-01' },
  { id: 'EMP-009', name: 'Yuki Sato', company: 'National University of Singapore', city: 'Singapore', unit: 'Unassigned', status: 'Awaiting Housing', leaseEnd: '2025-11-20', startDate: '2025-04-05' },
  { id: 'EMP-010', name: 'Sophie Martin', company: 'KPMG', city: 'Dubai', unit: 'Departed', status: 'Departed', leaseEnd: '2024-12-31', startDate: '2024-01-01' },
  { id: 'EMP-011', name: 'Thomas Anderson', company: 'Accenture', city: 'London', unit: 'Unassigned', status: 'Awaiting Housing', leaseEnd: '2025-12-31', startDate: '2025-03-30' },
  { id: 'EMP-012', name: 'Maria Garcia', company: 'Oxford University', city: 'London', unit: 'U-202', status: 'Housed', leaseEnd: '2025-04-15', startDate: '2024-04-15' },
  { id: 'EMP-013', name: 'James Bond', company: 'Falcon Investment', city: 'Dubai', unit: 'Unassigned', status: 'Awaiting Housing', leaseEnd: '2025-08-15', startDate: '2025-03-26' },
  { id: 'EMP-014', name: 'Anna Karenina', company: 'Deloitte', city: 'London', unit: 'Unassigned', status: 'Awaiting Housing', leaseEnd: '2025-10-15', startDate: '2025-04-02' },
  { id: 'EMP-015', name: 'Robert Oppenheimer', company: 'BlackRock', city: 'Singapore', unit: 'U-506', status: 'Housed', leaseEnd: '2025-09-01', startDate: '2025-02-20' },
];

// ── Communications ──────────────────────────────────────────────
export const mockThreads = [
  { 
    id: 'TR-001', 
    partnerId: 'P-001', 
    partnerName: 'Accenture', 
    partnerType: 'Employer',
    lastMessage: 'Thanks for the update on the Canary Wharf units.', 
    timestamp: '2025-03-20T10:30:00Z', 
    unreadCount: 0, 
    assignedTo: 'Sarah Jenkins',
    messages: [
      { sender: 'James (Accenture)', text: 'We have 5 new analysts starting in June. Can we reserve more capacity?', timestamp: '2025-03-19T14:20:00Z' },
      { sender: 'Sarah J. (Admin)', text: 'Absolutely. I will check the availability and send over a proposal.', timestamp: '2025-03-19T16:45:00Z' },
      { sender: 'James (Accenture)', text: 'Thanks for the update on the Canary Wharf units.', timestamp: '2025-03-20T10:30:00Z' },
    ]
  },
  { 
    id: 'TR-002', 
    partnerId: 'P-003', 
    partnerName: 'Global Talent Agency', 
    partnerType: 'Agency',
    lastMessage: 'How do I track the commission for the last referral?', 
    timestamp: '2025-03-21T09:15:00Z', 
    unreadCount: 2, 
    assignedTo: 'Mike Chen',
    messages: [
      { sender: 'Laura (Agency)', text: 'We just referred a new tenant for the Dubai Marina studio.', timestamp: '2025-03-20T11:00:00Z' },
      { sender: 'Mike C. (Admin)', text: 'Great! I see the application is already under review.', timestamp: '2025-03-20T13:30:00Z' },
      { sender: 'Laura (Agency)', text: 'Perfect. How do I track the commission for the last referral?', timestamp: '2025-03-21T09:15:00Z' },
    ]
  },
  { 
    id: 'TR-003', 
    partnerId: 'P-004', 
    partnerName: 'Oxford University', 
    partnerType: 'University',
    lastMessage: 'The student orientation starts next week.', 
    timestamp: '2025-03-20T16:20:00Z', 
    unreadCount: 0, 
    assignedTo: 'Elena Rodriguez',
    messages: [
      { sender: 'Prof. Higgins', text: 'Will the student housing be ready by the 25th?', timestamp: '2025-03-18T09:00:00Z' },
      { sender: 'Elena R. (Admin)', text: 'Yes, all units in the North Block are ready for move-in.', timestamp: '2025-03-18T11:45:00Z' },
      { sender: 'Prof. Higgins', text: 'The student orientation starts next week.', timestamp: '2025-03-20T16:20:00Z' },
    ]
  },
];

// ── Commissions ─────────────────────────────────────────────────
export const mockCommissions = [
  { id: 'COM-001', agency: 'Global Talent Agency', tenant: 'Michael Scott', moveIn: '2025-02-15', amount: 1200, status: 'Paid', dueDate: '2025-03-15' },
  { id: 'COM-002', agency: 'Global Talent Agency', tenant: 'Pam Beesly', moveIn: '2025-03-01', amount: 800, status: 'Pending', dueDate: '2025-04-01' },
  { id: 'COM-003', agency: 'Starlight Agency', tenant: 'Jim Halpert', moveIn: '2025-03-10', amount: 1500, status: 'Pending', dueDate: '2025-04-10' },
  { id: 'COM-004', agency: 'Global Talent Agency', tenant: 'Dwight Schrute', moveIn: '2025-01-20', amount: 1100, status: 'Paid', dueDate: '2025-02-20' },
  { id: 'COM-005', agency: 'Starlight Agency', tenant: 'Stanley Hudson', moveIn: '2025-03-15', amount: 900, status: 'Pending', dueDate: '2025-04-15' },
];

export const recentB2BActivity = [
  { id: 1, type: 'onboarding', text: 'TechBridge Solutions submitted a partner application.', timestamp: '2025-03-21T10:00:00Z' },
  { id: 2, type: 'capacity', text: 'Accenture requested 5 additional rooms in London.', timestamp: '2025-03-21T09:30:00Z' },
  { id: 3, type: 'message', text: 'New message from Global Talent Agency.', timestamp: '2025-03-21T09:15:00Z' },
  { id: 4, type: 'housing', text: 'Sarah Miller assigned to unit U-205.', timestamp: '2025-03-20T17:00:00Z' },
  { id: 5, type: 'onboarding', text: 'Oxford University agreement signed by Prof. Higgins.', timestamp: '2025-03-20T16:45:00Z' },
  { id: 6, type: 'case', text: 'Investigative case #782 opened for Falcon Investment.', timestamp: '2025-03-20T14:20:00Z' },
  { id: 7, type: 'capacity', text: 'KPMG capacity reservation RES-002 extended to June.', timestamp: '2025-03-20T11:00:00Z' },
  { id: 8, type: 'payment', text: 'Commission COM-001 paid to Global Talent Agency.', timestamp: '2025-03-20T10:00:00Z' },
];
