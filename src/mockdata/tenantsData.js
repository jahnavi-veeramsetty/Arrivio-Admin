export const tenantStats = {
  activeTenants: 2995,
  b2b2cTenants: 2097,
  b2cDirectTenants: 898,
  yoyGrowth: '550%',
  momGrowth: '9%',
  totalB2BCompanies: 47,
  monthlyB2BRevenue: 1051913,
  collectedThisMonth: 1639932,
  outstandingRent: 127400,
  avgDaysToPay: 18,
  remindersSent: 21,
  activeLeases: 2995,
  avgLeaseDuration: '18 months',
  avgBuildingRent: 765,
  avgApartmentRent: 720,
};

export const upcomingMoveOuts = [
  { id: 'MO-101', name: 'Rohan Kulkarni', email: 'rohan.k@klinikum-duesseldorf.de', unit: 'F-2-018', property: 'Arrivio Düsseldorf Flingern', date: '2028-07-08', type: 'B2B', status: 'Departing' },
  { id: 'MO-102', name: 'Isabel Romero', email: 'isabel.r@arrivio-direct.com', unit: 'APT-BER-04', property: 'Berlin apartment portfolio', date: '2028-07-11', type: 'B2C', status: 'Departing' },
  { id: 'MO-103', name: 'Marek Kowalski', email: 'marek.k@db-engineering.de', unit: 'S-1-045', property: 'Arrivio Frankfurt Sachsenhausen', date: '2028-07-18', type: 'B2B', status: 'Departing' },
  { id: 'MO-104', name: 'Ayse Karaca', email: 'ayse.k@arrivio-direct.com', unit: 'APT-DUS-19', property: 'Düsseldorf apartment portfolio', date: '2028-07-20', type: 'B2C', status: 'Departing' },
];

export const overdueRentRecords = [
  { id: 'OR-101', name: 'Andrei Stoica', email: 'andrei.s@arrivio-direct.com', unit: 'APT-CGN-22', property: 'Cologne apartment portfolio', amount: 720, daysOverdue: 5, type: 'B2C' },
  { id: 'OR-102', name: 'Mercy Dela Cruz', email: 'mercy.d@alloheim.de', unit: 'O-2-118', property: 'Arrivio Düsseldorf Oberbilk', amount: 765, daysOverdue: 3, type: 'B2B' },
  { id: 'OR-103', name: 'Pawel Zielinski', email: 'pawel.z@arrivio-direct.com', unit: 'APT-BON-09', property: 'Bonn apartment portfolio', amount: 720, daysOverdue: 7, type: 'B2C' },
  { id: 'OR-104', name: 'Carmen Alvarez', email: 'carmen.a@uni-koeln.de', unit: 'D-5-112', property: 'Arrivio Köln Deutz', amount: 765, daysOverdue: 2, type: 'B2B' },
];

export const allTenants = [
  { id: 'T-2001', name: 'Aarav Mehta', initials: 'AM', email: 'aarav.m@klinikum-duesseldorf.de', phone: '+49 151 1000 2001', nationality: 'Indian', affiliation: 'Klinikum Düsseldorf GmbH', type: 'B2B', roomNumber: 'D-3-214', building: 'Arrivio Düsseldorf Flingern', property: 'Arrivio Düsseldorf Flingern', unit: 'D-3-214', city: 'Düsseldorf', leaseStart: '2028-06-03', leaseEnd: '2029-03-31', leaseDuration: '18 months', rentStatus: 'Paid', status: 'Active', monthlyRent: 765, deposit: 765, paymentHistory: [
    { period: 'Jun 2028', dueDate: '2028-06-01', paidDate: '2028-06-01', amount: 765, payer: 'Employer', status: 'Paid' },
    { period: 'May 2028', dueDate: '2028-05-01', paidDate: '2028-05-01', amount: 765, payer: 'Employer', status: 'Paid' },
    { period: 'Apr 2028', dueDate: '2028-04-01', paidDate: '2028-04-02', amount: 765, payer: 'Employer', status: 'Paid' },
    { period: 'Mar 2028', dueDate: '2028-03-01', paidDate: '2028-03-01', amount: 765, payer: 'Employer', status: 'Paid' },
  ] },
  { id: 'T-2002', name: 'Maria Santos', initials: 'MS', email: 'maria.s@alloheim.de', phone: '+49 151 1000 2002', nationality: 'Filipino', affiliation: 'Alloheim Senioren-Residenzen', type: 'B2B', roomNumber: 'O-2-118', building: 'Arrivio Düsseldorf Oberbilk', property: 'Arrivio Düsseldorf Oberbilk', unit: 'O-2-118', city: 'Düsseldorf', leaseStart: '2028-06-18', leaseEnd: '2029-01-31', leaseDuration: '18 months', rentStatus: 'Paid', status: 'Active', monthlyRent: 765, deposit: 765 },
  { id: 'T-2003', name: 'Krzysztof Nowak', initials: 'KN', email: 'krzysztof.n@aho-germany.de', phone: '+49 151 1000 2003', nationality: 'Polish', affiliation: 'AHO Germany (International Healthcare)', type: 'B2B', roomNumber: 'E-4-206', building: 'Arrivio Köln Ehrenfeld', property: 'Arrivio Köln Ehrenfeld', unit: 'E-4-206', city: 'Cologne', leaseStart: '2028-05-22', leaseEnd: '2029-02-28', leaseDuration: '15 months', rentStatus: 'Paid', status: 'Active', monthlyRent: 765, deposit: 765, paymentHistory: [
    { period: 'Jun 2028', dueDate: '2028-06-01', paidDate: '2028-06-03', amount: 765, payer: 'Self', status: 'Paid' },
    { period: 'May 2028', dueDate: '2028-05-22', paidDate: '2028-05-22', amount: 765, payer: 'Employer', status: 'Paid' },
    { period: 'Apr 2028', dueDate: '2028-04-01', paidDate: '2028-04-01', amount: 220, payer: 'Self', status: 'Paid' },
  ] },
  { id: 'T-2004', name: 'Luzviminda Reyes', initials: 'LR', email: 'luzviminda.r@uk-koeln.de', phone: '+49 151 1000 2004', nationality: 'Filipino', affiliation: 'Universitätsklinikum Köln', type: 'B2B', roomNumber: 'D-5-112', building: 'Arrivio Köln Deutz', property: 'Arrivio Köln Deutz', unit: 'D-5-112', city: 'Cologne', leaseStart: '2028-07-14', leaseEnd: '2029-01-15', leaseDuration: '18 months', rentStatus: 'Pending', status: 'Move-in Scheduled', monthlyRent: 765, deposit: 765 },
  { id: 'T-2005', name: 'Chinonso Okafor', initials: 'CO', email: 'chinonso.o@db-engineering.de', phone: '+49 151 1000 2005', nationality: 'Nigerian', affiliation: 'Deutsche Bahn Engineering', type: 'B2B', roomNumber: 'S-3-104', building: 'Arrivio Frankfurt Sachsenhausen', property: 'Arrivio Frankfurt Sachsenhausen', unit: 'S-3-104', city: 'Frankfurt', leaseStart: '2028-07-23', leaseEnd: '2029-02-28', leaseDuration: '18 months', rentStatus: 'Pending', status: 'Move-in Scheduled', monthlyRent: 765, deposit: 765 },
  { id: 'T-2006', name: 'Elif Demir', initials: 'ED', email: 'elif.d@rwth-aachen.de', phone: '+49 151 1000 2006', nationality: 'Turkish', affiliation: 'RWTH Aachen University', type: 'B2B', roomNumber: 'APT-AA-14', building: 'Aachen apartment portfolio', property: 'Aachen apartment portfolio', unit: 'APT-AA-14', city: 'Aachen', leaseStart: '2028-08-05', leaseEnd: '2029-04-30', leaseDuration: '12 months', rentStatus: 'Pending', status: 'Housing Confirmed', monthlyRent: 720, deposit: 720 },
  { id: 'T-2007', name: 'Roxana Popescu', initials: 'RP', email: 'roxana.p@hhu-duesseldorf.de', phone: '+49 151 1000 2007', nationality: 'Romanian', affiliation: 'Heinrich-Heine-Universität Düsseldorf', type: 'B2B', roomNumber: 'APT-DUS-08', building: 'Düsseldorf apartment portfolio', property: 'Düsseldorf apartment portfolio', unit: 'APT-DUS-08', city: 'Düsseldorf', leaseStart: '2028-08-12', leaseEnd: '2029-03-31', leaseDuration: '12 months', rentStatus: 'Pending', status: 'Move-in Scheduled', monthlyRent: 720, deposit: 720 },
  { id: 'T-2008', name: 'Szymon Zielinski', initials: 'SZ', email: 'szymon.z@rheinmetall.com', phone: '+49 151 1000 2008', nationality: 'Polish', affiliation: 'Rheinmetall AG', type: 'B2B', roomNumber: 'F-2-087', building: 'Arrivio Düsseldorf Flingern', property: 'Arrivio Düsseldorf Flingern', unit: 'F-2-087', city: 'Düsseldorf', leaseStart: '2028-08-15', leaseEnd: '2029-03-31', leaseDuration: '18 months', rentStatus: 'Pending', status: 'Awaiting Visa Clearance', monthlyRent: 765, deposit: 765 },
  { id: 'T-2009', name: 'Amina Bello', initials: 'AB', email: 'amina.b@uniklinik-aachen.de', phone: '+49 151 1000 2009', nationality: 'Nigerian', affiliation: 'Uniklinik RWTH Aachen', type: 'B2B', roomNumber: 'B-1-044', building: 'Arrivio Bonn Beuel', property: 'Arrivio Bonn Beuel', unit: 'B-1-044', city: 'Bonn', leaseStart: '2028-09-01', leaseEnd: '2028-12-31', leaseDuration: '16 months', rentStatus: 'Pending', status: 'Housing Confirmed', monthlyRent: 765, deposit: 765 },
  { id: 'T-2010', name: 'Miguel Herrera', initials: 'MH', email: 'miguel.h@th-koeln.de', phone: '+49 151 1000 2010', nationality: 'Spanish', affiliation: 'TH Köln (Technische Hochschule Köln)', type: 'B2B', roomNumber: 'APT-CGN-12', building: 'Cologne apartment portfolio', property: 'Cologne apartment portfolio', unit: 'APT-CGN-12', city: 'Cologne', leaseStart: '2028-07-26', leaseEnd: '2029-02-28', leaseDuration: '12 months', rentStatus: 'Pending', status: 'Move-in Scheduled', monthlyRent: 720, deposit: 720 },
  { id: 'T-2011', name: 'Priyanka Nair', initials: 'PN', email: 'priyanka.n@vonovia.com', phone: '+49 151 1000 2011', nationality: 'Indian', affiliation: 'Vonovia SE (tech staff)', type: 'B2B', roomNumber: 'N-4-129', building: 'Arrivio Berlin Neukölln', property: 'Arrivio Berlin Neukölln', unit: 'N-4-129', city: 'Berlin', leaseStart: '2028-07-22', leaseEnd: '2029-01-31', leaseDuration: '18 months', rentStatus: 'Pending', status: 'Awaiting Visa Clearance', monthlyRent: 765, deposit: 765 },
  { id: 'T-2012', name: 'Ana Ionescu', initials: 'AI', email: 'ana.i@siemens-healthineers.com', phone: '+49 151 1000 2012', nationality: 'Romanian', affiliation: 'Siemens Healthineers AG', type: 'B2B', roomNumber: 'M-2-077', building: 'Arrivio München Schwabing', property: 'Arrivio München Schwabing', unit: 'M-2-077', city: 'Munich', leaseStart: '2028-08-06', leaseEnd: '2029-03-31', leaseDuration: '18 months', rentStatus: 'Pending', status: 'Housing Confirmed', monthlyRent: 765, deposit: 765 },
  { id: 'T-2013', name: 'Farah Yildiz', initials: 'FY', email: 'farah.y@uni-bonn.de', phone: '+49 151 1000 2013', nationality: 'Turkish', affiliation: 'Universität Bonn', type: 'B2B', roomNumber: 'E-3-061', building: 'Arrivio Bonn Endenich', property: 'Arrivio Bonn Endenich', unit: 'E-3-061', city: 'Bonn', leaseStart: '2028-07-18', leaseEnd: '2029-02-28', leaseDuration: '12 months', rentStatus: 'Pending', status: 'Move-in Scheduled', monthlyRent: 765, deposit: 765 },
  { id: 'T-2014', name: 'Selin Aydin', initials: 'SA', email: 'selin.a@arrivio-direct.com', phone: '+49 151 1000 2014', nationality: 'Turkish', affiliation: 'Direct B2C', type: 'B2C', roomNumber: 'APT-BER-04', building: 'Berlin apartment portfolio', property: 'Berlin apartment portfolio', unit: 'APT-BER-04', city: 'Berlin', leaseStart: '2028-05-10', leaseEnd: '2029-05-09', leaseDuration: '12 months', rentStatus: 'Paid', status: 'Active', monthlyRent: 720, deposit: 720 },
  { id: 'T-2015', name: 'Mateusz Lewandowski', initials: 'ML', email: 'mateusz.l@arrivio-direct.com', phone: '+49 151 1000 2015', nationality: 'Polish', affiliation: 'Direct B2C', type: 'B2C', roomNumber: 'APT-DUS-19', building: 'Düsseldorf apartment portfolio', property: 'Düsseldorf apartment portfolio', unit: 'APT-DUS-19', city: 'Düsseldorf', leaseStart: '2028-04-01', leaseEnd: '2029-03-31', leaseDuration: '12 months', rentStatus: 'Paid', status: 'Active', monthlyRent: 720, deposit: 720 },
  { id: 'T-2201', name: 'Neha Bansal', initials: 'NB', email: 'neha.b@klinikum-duesseldorf.de', phone: '+49 151 1000 2201', nationality: 'Indian', affiliation: 'Klinikum Düsseldorf GmbH', type: 'B2B', roomNumber: 'F-2-188', building: 'Arrivio Düsseldorf Flingern', property: 'Arrivio Düsseldorf Flingern', unit: 'F-2-188', city: 'Düsseldorf', leaseStart: '2028-05-15', leaseEnd: '2029-02-28', leaseDuration: '18 months', rentStatus: 'Paid', status: 'Active', monthlyRent: 765, deposit: 765 },
  { id: 'T-2202', name: 'Joel Aquino', initials: 'JA', email: 'joel.a@klinikum-duesseldorf.de', phone: '+49 151 1000 2202', nationality: 'Filipino', affiliation: 'Klinikum Düsseldorf GmbH', type: 'B2B', roomNumber: 'F-5-044', building: 'Arrivio Düsseldorf Flingern', property: 'Arrivio Düsseldorf Flingern', unit: 'F-5-044', city: 'Düsseldorf', leaseStart: '2028-07-16', leaseEnd: '2029-01-31', leaseDuration: '12 months', rentStatus: 'Pending', status: 'Housing Confirmed', monthlyRent: 765, deposit: 765 },
  { id: 'T-2203', name: 'Anand Verma', initials: 'AV', email: 'anand.v@uk-koeln.de', phone: '+49 151 1000 2203', nationality: 'Indian', affiliation: 'Universitätsklinikum Köln', type: 'B2B', roomNumber: 'E-3-074', building: 'Arrivio Köln Ehrenfeld', property: 'Arrivio Köln Ehrenfeld', unit: 'E-3-074', city: 'Cologne', leaseStart: '2028-05-28', leaseEnd: '2029-02-28', leaseDuration: '18 months', rentStatus: 'Paid', status: 'Active', monthlyRent: 765, deposit: 765 },
  { id: 'T-2204', name: 'Carlos Medina', initials: 'CM', email: 'carlos.m@hhu-duesseldorf.de', phone: '+49 151 1000 2204', nationality: 'Spanish', affiliation: 'Heinrich-Heine-Universität Düsseldorf', type: 'B2B', roomNumber: 'APT-DUS-22', building: 'Düsseldorf apartment portfolio', property: 'Düsseldorf apartment portfolio', unit: 'APT-DUS-22', city: 'Düsseldorf', leaseStart: '2028-08-01', leaseEnd: '2029-02-28', leaseDuration: '12 months', rentStatus: 'Pending', status: 'Housing Confirmed', monthlyRent: 720, deposit: 720 },
];

export const b2bCompanies = [
  {
    id: 'C-001',
    name: 'Klinikum Düsseldorf GmbH',
    contact: 'HR Mobility Desk',
    headcount: '84 employees housed',
    city: 'Düsseldorf',
    monthlyValue: 70560,
    occupancy: 97,
    contractEnd: '2029-06-30',
    paymentBreakdown: { rent: 64260, services: 4200, platformFee: 1300, brokerage: 800 },
    rentPaymentHistory: [
      { period: 'Jun 2028', dueDate: '2028-06-01', paidDate: '2028-06-01', amount: 70560, status: 'Paid' },
      { period: 'May 2028', dueDate: '2028-05-01', paidDate: '2028-05-02', amount: 70560, status: 'Paid' },
      { period: 'Apr 2028', dueDate: '2028-04-01', paidDate: '2028-04-01', amount: 68040, status: 'Paid' },
    ],
    employees: ['T-2001', 'T-2201', 'T-2202'],
  },
  {
    id: 'C-002',
    name: 'Universitätsklinikum Köln',
    contact: 'Clinical Recruiting',
    headcount: '66 employees housed',
    city: 'Cologne',
    monthlyValue: 55440,
    occupancy: 96,
    contractEnd: '2029-06-30',
    paymentBreakdown: { rent: 50490, services: 3300, platformFee: 1050, brokerage: 600 },
    rentPaymentHistory: [
      { period: 'Jun 2028', dueDate: '2028-06-01', paidDate: '2028-06-04', amount: 55440, status: 'Paid' },
      { period: 'May 2028', dueDate: '2028-05-01', paidDate: '2028-05-02', amount: 55440, status: 'Paid' },
    ],
    employees: ['T-2004', 'T-2203'],
  },
  {
    id: 'C-003',
    name: 'Heinrich-Heine-Universität Düsseldorf',
    contact: 'International Office',
    headcount: '112 students housed',
    city: 'Düsseldorf',
    monthlyValue: 94080,
    occupancy: 96,
    contractEnd: '2029-03-31',
    paymentBreakdown: { rent: 80640, services: 5600, platformFee: 5600, brokerage: 2240 },
    rentPaymentHistory: [
      { period: 'Summer Semester', dueDate: '2028-04-01', paidDate: '2028-04-08', amount: 282240, status: 'Paid' },
      { period: 'Autumn Semester', dueDate: '2028-07-12', paidDate: null, amount: 282240, status: 'Sent' },
    ],
    employees: ['T-2007', 'T-2204'],
  },
  {
    id: 'C-004',
    name: 'Deutsche Bahn Engineering',
    contact: 'Project Talent Desk',
    headcount: '38 employees housed',
    city: 'Frankfurt',
    monthlyValue: 31920,
    occupancy: 96,
    contractEnd: '2029-06-30',
    paymentBreakdown: { rent: 29070, services: 1900, platformFee: 600, brokerage: 350 },
    rentPaymentHistory: [
      { period: 'Jun 2028', dueDate: '2028-06-01', paidDate: '2028-06-01', amount: 31920, status: 'Paid' },
    ],
    employees: ['T-2005'],
  },
  {
    id: 'C-005',
    name: 'Grouped Employer Portfolio',
    contact: 'National Accounts',
    headcount: '1,797 partner-routed tenants',
    city: 'Multi-city',
    monthlyValue: 1051913,
    occupancy: 96,
    contractEnd: 'Rolling',
    paymentBreakdown: { rent: 925684, services: 94672, platformFee: 21038, brokerage: 10519 },
    rentPaymentHistory: [
      { period: 'Jun 2028', dueDate: '2028-06-01', paidDate: '2028-06-05', amount: 1051913, status: 'Paid' },
      { period: 'May 2028', dueDate: '2028-05-01', paidDate: '2028-05-03', amount: 1004217, status: 'Paid' },
    ],
    employees: [],
    portfolioNote: '1,797 partner-routed tenants across the rolling employer portfolio · 87 rooms held in the pipeline buffer',
  },
];

export const leaseRecords = [
  { id: 'L-2001', name: 'Aarav Mehta', type: 'B2B', unit: 'D-3-214', property: 'Arrivio Düsseldorf Flingern', city: 'Düsseldorf', start: '2028-06-03', end: '2029-03-31', duration: '18 months', rent: 765, status: 'Active' },
  { id: 'L-2002', name: 'Maria Santos', type: 'B2B', unit: 'O-2-118', property: 'Arrivio Düsseldorf Oberbilk', city: 'Düsseldorf', start: '2028-06-18', end: '2029-01-31', duration: '18 months', rent: 765, status: 'Active' },
  { id: 'L-2003', name: 'Krzysztof Nowak', type: 'B2B', unit: 'E-4-206', property: 'Arrivio Köln Ehrenfeld', city: 'Cologne', start: '2028-05-22', end: '2029-02-28', duration: '15 months', rent: 765, status: 'Active' },
  { id: 'L-2004', name: 'Selin Aydin', type: 'B2C', unit: 'APT-BER-04', property: 'Berlin apartment portfolio', city: 'Berlin', start: '2028-05-10', end: '2029-05-09', duration: '12 months', rent: 720, status: 'Active' },
  { id: 'L-2005', name: 'Mateusz Lewandowski', type: 'B2C', unit: 'APT-DUS-19', property: 'Düsseldorf apartment portfolio', city: 'Düsseldorf', start: '2028-04-01', end: '2029-03-31', duration: '12 months', rent: 720, status: 'Active' },
  { id: 'L-2006', name: 'Elif Demir', type: 'B2B', unit: 'APT-AA-14', property: 'Aachen apartment portfolio', city: 'Aachen', start: '2028-08-05', end: '2029-04-30', duration: '12 months', rent: 720, status: 'Move-in Scheduled' },
  { id: 'L-2007', name: 'Roxana Popescu', type: 'B2B', unit: 'APT-DUS-08', property: 'Düsseldorf apartment portfolio', city: 'Düsseldorf', start: '2028-08-12', end: '2029-03-31', duration: '12 months', rent: 720, status: 'Move-in Scheduled' },
  { id: 'L-2008', name: 'Chinonso Okafor', type: 'B2B', unit: 'S-3-104', property: 'Arrivio Frankfurt Sachsenhausen', city: 'Frankfurt', start: '2028-07-23', end: '2029-02-28', duration: '18 months', rent: 765, status: 'Move-in Scheduled' },
];

export const rentLedger = [
  { id: 'RL-2001', name: 'Aarav Mehta', unit: 'D-3-214', property: 'Arrivio Düsseldorf Flingern', dueDate: '2028-06-01', amount: 765, paidDate: '2028-06-01', method: 'SEPA', status: 'Paid' },
  { id: 'RL-2002', name: 'Selin Aydin', unit: 'APT-BER-04', property: 'Berlin apartment portfolio', dueDate: '2028-06-01', amount: 720, paidDate: '2028-06-02', method: 'Stripe', status: 'Paid' },
  { id: 'RL-2003', name: 'Mercy Dela Cruz', unit: 'O-2-118', property: 'Arrivio Düsseldorf Oberbilk', dueDate: '2028-06-01', amount: 765, paidDate: '-', method: '-', status: 'Overdue' },
  { id: 'RL-2004', name: 'Andrei Stoica', unit: 'APT-CGN-22', property: 'Cologne apartment portfolio', dueDate: '2028-06-01', amount: 720, paidDate: '-', method: '-', status: 'Overdue' },
];

export const paymentHistory = [
  { period: 'Jun 2028', dueDate: '2028-06-01', amount: 765, paidDate: '2028-06-01', status: 'Paid' },
  { period: 'May 2028', dueDate: '2028-05-01', amount: 765, paidDate: '2028-05-01', status: 'Paid' },
  { period: 'Apr 2028', dueDate: '2028-04-01', amount: 765, paidDate: '2028-04-02', status: 'Paid' },
  { period: 'Mar 2028', dueDate: '2028-03-01', amount: 765, paidDate: '2028-03-01', status: 'Paid' },
];

export const activityTimeline = [
  { id: 1, title: 'Housing confirmation issued', date: '2028-06-18 10:45', recent: true },
  { id: 2, title: 'Lease countersigned', date: '2028-06-16 14:20', recent: false },
  { id: 3, title: 'Registration guidance sent', date: '2028-06-15 09:15', recent: false },
  { id: 4, title: 'Move-in checklist completed', date: '2028-06-12 16:30', recent: false },
];

// ── Derived Employee View ─────────────────────────────────────────
// Single source of truth: allTenants. The B2B-routed subset is projected
// here into the shape the Employee Tracker / B2B Dashboard expect.
import { daysFromToday } from './demoClock';

const PIPELINE_STATUSES = new Set(['Move-in Scheduled', 'Housing Confirmed', 'Awaiting Visa Clearance']);

const toEmployeeShape = (tenant) => {
  const inPipeline = PIPELINE_STATUSES.has(tenant.status);
  const daysUntilStart = inPipeline ? Math.max(0, daysFromToday(tenant.leaseStart)) : undefined;
  return {
    id: tenant.id,
    name: tenant.name,
    company: tenant.affiliation,
    city: tenant.city,
    roomBuilding: `${tenant.unit} · ${tenant.building}`,
    unit: tenant.unit,
    status: tenant.status === 'Active' ? 'Lease Active' : tenant.status,
    leaseEnd: tenant.leaseEnd,
    moveInDate: tenant.leaseStart,
    leaseDuration: tenant.leaseDuration,
    daysUntilStart,
    paymentHistory: tenant.paymentHistory,
  };
};

export const b2bRoutedEmployees = allTenants
  .filter((tenant) => tenant.type === 'B2B')
  .map(toEmployeeShape);

export const tenantById = (id) => allTenants.find((tenant) => tenant.id === id);
