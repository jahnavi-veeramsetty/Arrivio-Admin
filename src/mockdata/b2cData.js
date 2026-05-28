// ── Applications ─────────────────────────────────────────────
// Anchored to DEMO_TODAY = 2026-05-26. `submitted` and `days` are
// internally consistent: submitted = DEMO_TODAY − days.
export const mockApplications = [
  { id:'APP-1001', name:'James Hartley',    email:'james.h@email.com',   city:'Aachen',    unit:'Studio 4B',           property:'Arrivio Köln Ehrenfeld',          submitted:'2026-05-25', status:'Pending',         reviewer:'Sarah K.',  days:1.0, paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1002', name:'Priya Nair',       email:'priya.n@email.com',   city:'Berlin',    unit:'Single Room 12A',     property:'Arrivio Berlin Neukölln',         submitted:'2026-04-23', status:'In Review',       reviewer:'Tom B.',    days:33,  paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1003', name:'Chen Wei',         email:'chen.w@email.com',    city:'Bonn',      unit:'Shared Room 7C',      property:'Arrivio Bonn Beuel',              submitted:'2026-04-26', status:'Approved',        reviewer:'Sarah K.',  days:30,  paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1004', name:'Fatima Al-Rashid', email:'fatima.a@email.com',  city:'Cologne',   unit:'Studio 2A',           property:'Arrivio Köln Deutz',              submitted:'2026-04-28', status:'Approved',        reviewer:'Tom B.',    days:28,  paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1005', name:'Oliver Bennett',   email:'oliver.b@email.com',  city:'Düsseldorf',unit:'Single Room 8F',      property:'Arrivio Düsseldorf Flingern',     submitted:'2026-04-30', status:'Action Required', reviewer:'Sarah K.',  days:26,  paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1006', name:'Aisha Malik',      email:'aisha.m@email.com',   city:'Frankfurt', unit:'Studio 1A',           property:'Arrivio Frankfurt Sachsenhausen', submitted:'2026-05-03', status:'Rejected',        reviewer:'Tom B.',    days:23,  paymentStatus:'Refund issued',        docStatus:'rejected'   },
  { id:'APP-1007', name:'Raj Patel',        email:'raj.p@email.com',     city:'Hamburg',   unit:'Single Room 3D',      property:'Arrivio Hamburg Altona',          submitted:'2026-05-25', status:'Pending',         reviewer:'Unassigned',days:1.4, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1008', name:'Sophie Laurent',   email:'sophie.l@email.com',  city:'Munich',    unit:'Shared Room 5E',      property:'Arrivio München Schwabing',       submitted:'2026-05-09', status:'In Review',       reviewer:'Tom B.',    days:17,  paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1009', name:'Marcus Silva',     email:'marcus.s@email.com',  city:'Aachen',    unit:'Single Room 9B',      property:'Arrivio Köln Ehrenfeld',          submitted:'2026-05-25', status:'Pending',         reviewer:'Unassigned',days:0.9, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1010', name:'Yuki Tanaka',      email:'yuki.t@email.com',    city:'Berlin',    unit:'Studio 6A',           property:'Arrivio Berlin Friedrichshain',   submitted:'2026-05-14', status:'Approved',        reviewer:'Sarah K.',  days:12,  paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1011', name:'Elena Vasquez',    email:'elena.v@email.com',   city:'Bonn',      unit:'Single Room 11C',     property:'Arrivio Bonn Endenich',           submitted:'2026-05-16', status:'In Review',       reviewer:'Sarah K.',  days:10,  paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1012', name:'Ahmed Hassan',     email:'ahmed.h@email.com',   city:'Cologne',   unit:'Shared Room 4A',      property:'Arrivio Köln Nippes',             submitted:'2026-05-25', status:'Pending',         reviewer:'Unassigned',days:0.6, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1013', name:'Nina Okafor',      email:'nina.o@email.com',    city:'Düsseldorf',unit:'Single Room 2B',      property:'Arrivio Düsseldorf Oberbilk',     submitted:'2026-05-20', status:'Action Required', reviewer:'Tom B.',    days:6,   paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1014', name:'Daniel Müller',    email:'daniel.m@email.com',  city:'Frankfurt', unit:'Studio 3C',           property:'Arrivio Frankfurt Sachsenhausen', submitted:'2026-05-26', status:'Pending',         reviewer:'Unassigned',days:0.2, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1015', name:'Ling Zhao',        email:'ling.z@email.com',    city:'Hamburg',   unit:'Shared Room 8D',      property:'Arrivio Hamburg Altona',          submitted:'2026-05-24', status:'In Review',       reviewer:'Tom B.',    days:2,   paymentStatus:'Holding deposit paid', docStatus:'complete'   },
];

// Applications with unsigned agreements (Approved but not countersigned)
export const unsignedAgreements = mockApplications.filter(a => a.status === 'Approved');

// ── Applicant Type Sections ────────────────────────────────────
// 3 sections, each with their required document types
export const applicantSections = [
  {
    id: 'employee',
    label: 'Employee',
    icon: 'Briefcase',
    description: 'Salaried professional with employment contract',
    requiredDocs: [
      { key: 'passport',    label: 'Passport / National ID',   description: 'Valid government-issued photo ID' },
      { key: 'contract',    label: 'Employment Contract',       description: 'Current signed employment contract' },
      { key: 'payslips',    label: 'Last 3 Pay Slips',          description: 'Proof of consistent income for 3 months' },
      { key: 'visa',        label: 'Visa / Residence Permit',   description: 'Valid visa or right to reside' },
    ],
  },
  {
    id: 'self_employed',
    label: 'Self-Employed',
    icon: 'Building2',
    description: 'Freelancer, contractor, or business owner',
    requiredDocs: [
      { key: 'passport',    label: 'Passport / National ID',   description: 'Valid government-issued photo ID' },
      { key: 'business',    label: 'Business Registration',     description: 'Company registration or trade licence' },
      { key: 'bank',        label: 'Bank Statements (6 months)',description: 'Last 6 months personal/business bank statements' },
      { key: 'visa',        label: 'Visa / Residence Permit',   description: 'Valid visa or right to reside' },
    ],
  },
  {
    id: 'student',
    label: 'Student',
    icon: 'GraduationCap',
    description: 'University or college student',
    requiredDocs: [
      { key: 'passport',    label: 'Passport / National ID',   description: 'Valid government-issued photo ID' },
      { key: 'enrollment',  label: 'Enrollment Letter',         description: 'Official university enrollment / acceptance letter' },
      { key: 'financial',   label: 'Financial Support Proof',   description: 'Bank statements or sponsorship letter showing funds' },
      { key: 'visa',        label: 'Visa / Residence Permit',   description: 'Valid student visa or right to study' },
    ],
  },
];

// ── Per-Person Documents ───────────────────────────────────────
// Each applicant has an applicantType + a docs map keyed by doc key
export const applicantDocData = [
  {
    appId:'APP-1001', name:'James Hartley',  email:'james.h@email.com',  city:'Aachen',    applicantType:'employee',
    docs: {
      passport: { uploaded:'2026-04-11', status:'Uploaded' },
      contract: { uploaded:'2026-04-11', status:'Uploaded' },
      payslips: { uploaded:'2026-04-13', status:'Uploaded' },
      visa:     { uploaded:'2026-04-12', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1002', name:'Priya Nair',      email:'priya.n@email.com',  city:'Berlin',     applicantType:'employee',
    docs: {
      passport: { uploaded:'2026-04-16', status:'Verified' },
      contract: { uploaded:'2026-04-16', status:'Verified' },
      payslips: { uploaded:'2026-04-17', status:'Uploaded' },
      visa:     { uploaded:'2026-04-16', status:'Verified' },
    },
  },
  {
    appId:'APP-1003', name:'Chen Wei',        email:'chen.w@email.com',   city:'Bonn', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2026-04-19', status:'Verified' },
      business: { uploaded:'2026-04-19', status:'Verified' },
      bank:     { uploaded:'2026-04-20', status:'Verified' },
      visa:     { uploaded:'2026-04-19', status:'Verified' },
    },
  },
  {
    appId:'APP-1004', name:'Fatima Al-Rashid',email:'fatima.a@email.com', city:'Cologne',     applicantType:'employee',
    docs: {
      passport: { uploaded:'2026-04-21', status:'Verified' },
      contract: { uploaded:'2026-04-21', status:'Verified' },
      payslips: { uploaded:'2026-04-21', status:'Verified' },
      visa:     { uploaded:'2026-04-21', status:'Verified' },
    },
  },
  {
    appId:'APP-1005', name:'Oliver Bennett',  email:'oliver.b@email.com', city:'Dusseldorf',    applicantType:'student',
    docs: {
      passport:   { uploaded:'2026-04-23', status:'Uploaded' },
      enrollment: { uploaded:'2026-04-23', status:'Rejected' },
      financial:  { uploaded:'2026-04-24', status:'Uploaded' },
      visa:       { uploaded:'2026-04-23', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1007', name:'Raj Patel',       email:'raj.p@email.com',    city:'Hamburg', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2026-05-01', status:'Uploaded' },
      business: { uploaded:'2026-05-02', status:'Uploaded' },
      bank:     { uploaded:'2026-05-02', status:'Uploaded' },
      visa:     { uploaded:'2026-05-01', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1008', name:'Sophie Laurent',  email:'sophie.l@email.com', city:'Munich',    applicantType:'employee',
    docs: {
      passport: { uploaded:'2026-05-04', status:'Verified' },
      contract: { uploaded:'2026-05-04', status:'Uploaded' },
      payslips: { uploaded:'2026-05-04', status:'Uploaded' },
      visa:     { uploaded:'2026-05-05', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1009', name:'Marcus Silva',    email:'marcus.s@email.com', city:'Aachen',     applicantType:'student',
    docs: {
      passport:   { uploaded:'2026-05-05', status:'Uploaded' },
      enrollment: { uploaded:'2026-05-05', status:'Uploaded' },
      financial:  { uploaded:'2026-05-06', status:'Uploaded' },
      visa:       { uploaded:'2026-05-06', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1010', name:'Yuki Tanaka',     email:'yuki.t@email.com',   city:'Berlin', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2026-05-08', status:'Verified' },
      business: { uploaded:'2026-05-08', status:'Verified' },
      bank:     { uploaded:'2026-05-08', status:'Verified' },
      visa:     { uploaded:'2026-05-09', status:'Verified' },
    },
  },
  {
    appId:'APP-1011', name:'Elena Vasquez',   email:'elena.v@email.com',  city:'Bonn',    applicantType:'employee',
    docs: {
      passport: { uploaded:'2026-05-10', status:'Verified' },
      contract: { uploaded:'2026-05-10', status:'Uploaded' },
      payslips: { uploaded:'2026-05-11', status:'Uploaded' },
      visa:     { uploaded:'2026-05-10', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1013', name:'Nina Okafor',     email:'nina.o@email.com',   city:'Dusseldorf', applicantType:'student',
    docs: {
      passport:   { uploaded:'2026-05-14', status:'Uploaded' },
      enrollment: { uploaded:'2026-05-14', status:'Uploaded' },
      financial:  { uploaded:'2026-05-14', status:'Uploaded' },
      visa:       { uploaded:'2026-05-15', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1015', name:'Ling Zhao',       email:'ling.z@email.com',   city:'Hamburg', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2026-05-18', status:'Uploaded' },
      business: { uploaded:'2026-05-18', status:'Uploaded' },
      bank:     { uploaded:'2026-05-18', status:'Uploaded' },
      visa:     { uploaded:'2026-05-18', status:'Uploaded' },
    },
  },
];

// ── Units ──────────────────────────────────────────────────────
export const mockUnits = [
  { id:'U-001', type:'Studio', property:'Arrivio Canary Wharf', city:'London',    floor:4,  status:'Occupied',     rent:2200, tenant:'James Hartley',    amenities:['Gym','Concierge','Terrace']    },
  { id:'U-002', type:'Single Room',    property:'Arrivio Canary Wharf', city:'London',    floor:7,  status:'Available',    rent:2800, tenant:null,               amenities:['Gym','Concierge','Parking']    },
  { id:'U-003', type:'Shared Room',    property:'Arrivio Canary Wharf', city:'London',    floor:11, status:'Reserved',     rent:3900, tenant:'Oliver Bennett',   amenities:['Gym','Concierge','Balcony']    },
  { id:'U-004', type:'Studio', property:'Arrivio Shoreditch',   city:'London',    floor:2,  status:'Available',    rent:1950, tenant:null,               amenities:['Rooftop','Bike Storage']       },
  { id:'U-005', type:'Single Room',    property:'Arrivio Shoreditch',   city:'London',    floor:5,  status:'Occupied',     rent:2650, tenant:'Sophie Laurent',   amenities:['Rooftop','Co-working space']   },
  { id:'U-006', type:'Shared Room',    property:'Arrivio Shoreditch',   city:'London',    floor:8,  status:'Maintenance',  rent:3700, tenant:null,               amenities:['Rooftop','Parking','Balcony']  },
  { id:'U-007', type:'Studio', property:'Arrivio DIFC',         city:'Dubai',     floor:12, status:'Occupied',     rent:4200, tenant:'Fatima Al-Rashid', amenities:['Pool','Gym','Concierge']       },
  { id:'U-008', type:'Single Room',    property:'Arrivio DIFC',         city:'Dubai',     floor:15, status:'Available',    rent:5500, tenant:null,               amenities:['Pool','Gym','City View']       },
  { id:'U-009', type:'Shared Room',    property:'Arrivio DIFC',         city:'Dubai',     floor:18, status:'Reserved',     rent:8200, tenant:'Ahmed Hassan',     amenities:['Pool','Gym','Terrace']         },
  { id:'U-010', type:'Studio', property:'Arrivio Marina Bay',   city:'Singapore', floor:6,  status:'Occupied',     rent:3800, tenant:'Yuki Tanaka',      amenities:['Pool','Gym','Bay View']        },
  { id:'U-011', type:'Single Room',    property:'Arrivio Marina Bay',   city:'Singapore', floor:9,  status:'Available',    rent:4800, tenant:null,               amenities:['Pool','Gym','Rooftop']         },
  { id:'U-012', type:'Shared Room',    property:'Arrivio Marina Bay',   city:'Singapore', floor:14, status:'Occupied',     rent:7200, tenant:'Chen Wei',         amenities:['Pool','Gym','Balcony','Parking']},
  { id:'U-013', type:'Single Room',    property:'Arrivio Marina Bay',   city:'Singapore', floor:3,  status:'Reserved',     rent:4500, tenant:'Ling Zhao',        amenities:['Pool','Co-working']            },
  { id:'U-014', type:'Studio', property:'Arrivio DIFC',         city:'Dubai',     floor:9,  status:'Maintenance',  rent:3900, tenant:null,               amenities:['Pool','Gym']                   },
  { id:'U-015', type:'Shared Room',    property:'Arrivio Shoreditch',   city:'London',    floor:6,  status:'Available',    rent:3600, tenant:null,               amenities:['Rooftop','Parking','Concierge'] },
];

// ── Move Events ────────────────────────────────────────────────
// Anchored to DEMO_TODAY = 2026-05-26. Spread across May and June 2026 with
// a mix of past (Completed), today/this week (Scheduled/Confirmed), and
// upcoming next-month entries so the calendar feels live.
export const mockMoveEvents = [
  { id:'MOV-001', tenant:'Aarav Mehta',         unit:'D-3-214',    property:'Arrivio Düsseldorf Flingern', city:'Düsseldorf', propertyType: 'Single Room', type:'Move-in',  date:'2026-04-15', status:'Completed', email: 'aarav.m@klinikum-duesseldorf.de', phone: '+49 151 1000 2001', checklist: { done: 3, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID verified'] } },
  { id:'MOV-002', tenant:'Maria Santos',        unit:'O-2-118',    property:'Arrivio Düsseldorf Oberbilk', city:'Düsseldorf', propertyType: 'Single Room', type:'Move-in',  date:'2026-05-05', status:'Completed', email: 'maria.s@alloheim.de', phone: '+49 151 1000 2002', checklist: { done: 3, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID verified'] } },
  { id:'MOV-003', tenant:'Krzysztof Nowak',     unit:'E-4-206',    property:'Arrivio Köln Ehrenfeld',      city:'Cologne',    propertyType: 'Single Room', type:'Move-in',  date:'2026-05-12', status:'Completed', email: 'krzysztof.n@aho-germany.de', phone: '+49 151 1000 2003', checklist: { done: 3, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID verified'] } },
  { id:'MOV-004', tenant:'Rohan Kulkarni',      unit:'F-2-018',    property:'Arrivio Düsseldorf Flingern', city:'Düsseldorf', propertyType: 'Single Room', type:'Move-out', date:'2026-05-26', status:'Scheduled', email: 'rohan.k@klinikum-duesseldorf.de', phone: '+49 151 1000 2150', checklist: { done: 2, total: 4, items: ['Inspection scheduled ✓', 'Final invoice issued ✓', 'Cleaning pending', 'Deposit refund pending'] } },
  { id:'MOV-005', tenant:'Isabel Romero',       unit:'APT-BER-04', property:'Berlin apartment portfolio',  city:'Berlin',     propertyType: 'Studio',      type:'Move-out', date:'2026-05-28', status:'Scheduled', email: 'isabel.r@arrivio-direct.com', phone: '+49 151 1000 2160', checklist: { done: 1, total: 4, items: ['Notice received ✓', 'Inspection pending', 'Cleaning pending', 'Refund pending'] } },
  { id:'MOV-006', tenant:'Luzviminda Reyes',    unit:'D-5-112',    property:'Arrivio Köln Deutz',          city:'Cologne',    propertyType: 'Single Room', type:'Move-in',  date:'2026-05-30', status:'Confirmed', email: 'luzviminda.r@uk-koeln.de', phone: '+49 151 1000 2004', checklist: { done: 3, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID verified'] } },
  { id:'MOV-007', tenant:'Marek Kowalski',      unit:'S-1-045',    property:'Arrivio Frankfurt Sachsenhausen', city:'Frankfurt', propertyType: 'Single Room', type:'Move-out', date:'2026-06-02', status:'Scheduled', email: 'marek.k@db-engineering.de', phone: '+49 151 1000 2170', checklist: { done: 0, total: 4, items: ['Inspection pending', 'Cleaning pending', 'Key return pending', 'Refund pending'] } },
  { id:'MOV-008', tenant:'Elif Demir',          unit:'APT-AA-14',  property:'Aachen apartment portfolio',  city:'Aachen',     propertyType: 'Shared Room', type:'Move-in',  date:'2026-06-05', status:'Confirmed', email: 'elif.d@rwth-aachen.de', phone: '+49 151 1000 2006', checklist: { done: 2, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID pending'] } },
  { id:'MOV-009', tenant:'Roxana Popescu',      unit:'APT-DUS-08', property:'Düsseldorf apartment portfolio', city:'Düsseldorf', propertyType: 'Studio',      type:'Move-in',  date:'2026-06-08', status:'Confirmed', email: 'roxana.p@hhu-duesseldorf.de', phone: '+49 151 1000 2007', checklist: { done: 2, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID pending'] } },
  { id:'MOV-010', tenant:'Chinonso Okafor',     unit:'S-3-104',    property:'Arrivio Frankfurt Sachsenhausen', city:'Frankfurt', propertyType: 'Single Room', type:'Move-in',  date:'2026-06-12', status:'Scheduled', email: 'chinonso.o@db-engineering.de', phone: '+49 151 1000 2005', checklist: { done: 1, total: 3, items: ['Agreement signed', 'Deposit pending', 'ID pending'] } },
  { id:'MOV-011', tenant:'Ayse Karaca',         unit:'APT-DUS-19', property:'Düsseldorf apartment portfolio', city:'Düsseldorf', propertyType: 'Studio',      type:'Move-out', date:'2026-06-15', status:'Scheduled', email: 'ayse.k@arrivio-direct.com', phone: '+49 151 1000 2180', checklist: { done: 0, total: 4, items: ['Notice received ✓', 'Inspection pending', 'Cleaning pending', 'Refund pending'] } },
  { id:'MOV-012', tenant:'Ana Ionescu',         unit:'M-2-077',    property:'Arrivio München Schwabing',   city:'Munich',     propertyType: 'Single Room', type:'Move-in',  date:'2026-06-18', status:'Scheduled', email: 'ana.i@siemens-healthineers.com', phone: '+49 151 1000 2012', checklist: { done: 1, total: 3, items: ['Agreement signed', 'Deposit pending', 'ID pending'] } },
];

// ── Blocked Applications ──────────────────────────────────────
// `days` = days since the issue was flagged, anchored to DEMO_TODAY (2026-05-26).
export const blockedApplications = [
  { id:'APP-1005', name:'Oliver Bennett',  reason:'Passport rejected — resubmission requested', days:12 },
  { id:'APP-1013', name:'Nina Okafor',     reason:'Proof of income missing',                    days:5  },
  { id:'APP-1020', name:'Sarah Jenkins',   reason:'Visa document unclear',                      days:15 },
];

// ── Lease Expiry Radar ────────────────────────────────────────
// Tenants pulled from allTenants. Dates and `daysRemaining` are anchored to
// real calendar today (≈ May 2026) and sit inside the "next 60 days" window
// the widget advertises, so the figures reconcile when an investor reads them.
export const leaseExpiries = [
  { tenant: 'Selin Aydin',          unit: 'APT-BER-04', property: 'Berlin apartment portfolio',     city: 'Berlin',     endDate: '2026-06-15', daysRemaining: 20 },
  { tenant: 'Krzysztof Nowak',      unit: 'E-4-206',    property: 'Arrivio Köln Ehrenfeld',         city: 'Cologne',    endDate: '2026-06-25', daysRemaining: 30 },
  { tenant: 'Luzviminda Reyes',     unit: 'D-5-112',    property: 'Arrivio Köln Deutz',             city: 'Cologne',    endDate: '2026-07-05', daysRemaining: 40 },
  { tenant: 'Mateusz Lewandowski',  unit: 'APT-DUS-19', property: 'Düsseldorf apartment portfolio', city: 'Düsseldorf', endDate: '2026-07-15', daysRemaining: 50 },
  { tenant: 'Roxana Popescu',       unit: 'APT-DUS-08', property: 'Düsseldorf apartment portfolio', city: 'Düsseldorf', endDate: '2026-07-22', daysRemaining: 57 },
];

// ── Waitlist Hierarchical Data ─────────────────────────────────
export const waitlistProperties = [
  {
    city: 'Aachen',
    properties: [
      {
        id: 'P-AA-01',
        name: 'Arrivio Lousberg',
        address: 'Lousbergstraße 14, 52072 Aachen',
        totalUnits: 15,
        occupiedUnits: 12,
        availableUnits: 3,
        waitingCount: 5,
        units: [
          {
            id: 'U-AA-101',
            name: 'Studio 1A',
            type: 'Studio',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-101', position: 1, name: 'Hans Müller', email: 'hans.m@gmail.de', dateAdded: '2026-02-15', moveIn: '2026-04-10', moveOut: '2026-06-10', daysWaiting: 36 },
              { id: 'WL-102', position: 2, name: 'Petra Schmidt', email: 'petra.s@web.de', dateAdded: '2026-03-01', moveIn: '2026-06-14', moveOut: '2026-08-14', daysWaiting: 22 }
            ]
          },
          {
            id: 'U-AA-102',
            name: '1BR 2C',
            type: 'Single Room',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-103', position: 1, name: 'Lucas Wagner', email: 'l.wagner@tech.de', dateAdded: '2026-03-10', moveIn: '2026-04-20', moveOut: '2026-06-20', daysWaiting: 13 }
            ]
          }
        ]
      }
    ]
  },
  {
    city: 'Berlin',
    properties: [
      {
        id: 'P-BE-01',
        name: 'Arrivio Alexanderplatz',
        address: 'Karl-Liebknecht-Str. 5, 10178 Berlin',
        totalUnits: 45,
        occupiedUnits: 43,
        availableUnits: 2,
        waitingCount: 18,
        units: [
          {
            id: 'U-BE-301',
            name: '1BR 9A',
            type: 'Single Room',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-201', position: 1, name: 'Elena Fischer', email: 'elena.f@berlin-ops.de', dateAdded: '2026-01-20', moveIn: '2026-03-30', moveOut: '2026-05-30', daysWaiting: 62 },
              { id: 'WL-202', position: 2, name: 'Markus Weber', email: 'm.weber@design.de', dateAdded: '2026-02-10', moveIn: '2026-06-03', moveOut: '2026-08-03', daysWaiting: 41 },
              { id: 'WL-203', position: 3, name: 'Sarah Hoffmann', email: 'sarah.h@media.berlin', dateAdded: '2026-03-05', moveIn: '2026-08-07', moveOut: '2026-10-07', daysWaiting: 18 }
            ]
          },
          {
            id: 'U-BE-302',
            name: 'Studio 4F',
            type: 'Studio',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-204', position: 1, name: 'Jonas Keller', email: 'jonas.k@startup.io', dateAdded: '2026-02-28', moveIn: '2026-04-05', moveOut: '2026-06-05', daysWaiting: 23 }
            ]
          }
        ]
      },
      {
        id: 'P-BE-02',
        name: 'Arrivio Kreuzberg',
        address: 'Oranienstraße 20, 10999 Berlin',
        totalUnits: 20,
        occupiedUnits: 20,
        availableUnits: 0,
        waitingCount: 0,
        units: [] // No waitlist for this property
      }
    ]
  },
  {
    city: 'Bonn',
    properties: [
      {
        id: 'P-BN-01',
        name: 'Arrivio Rheinaue',
        address: 'Ludwig-Erhard-Allee 20, 53175 Bonn',
        totalUnits: 30,
        occupiedUnits: 28,
        availableUnits: 2,
        waitingCount: 4,
        units: [
          {
            id: 'U-BN-501',
            name: '2BR 5C',
            type: 'Shared Room',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-301', position: 1, name: 'Anja Richter', email: 'a.richter@telekom.de', dateAdded: '2026-03-12', moveIn: '2026-05-01', moveOut: '2026-07-01', daysWaiting: 11 }
            ]
          }
        ]
      }
    ]
  }
];

export const mockWaitlist = waitlistProperties.flatMap(c => c.properties.flatMap(p => p.units.flatMap(u => u.waitlist.map(w => ({ ...w, property: p.name, unit: u.name, city: c.city, unitType: u.type })))));

// ── Recent Decisions ────────────────────────────────────────────
// Timestamps in the last few days before DEMO_TODAY (2026-05-26).
export const recentDecisions = [
  { id:'APP-1003', applicant:'Chen Wei',         decision:'Approved',  admin:'Sarah K.', timestamp:'2026-05-25 14:22' },
  { id:'APP-1004', applicant:'Fatima Al-Rashid', decision:'Approved',  admin:'Tom B.',   timestamp:'2026-05-25 11:05' },
  { id:'APP-1006', applicant:'Aisha Malik',       decision:'Rejected',  admin:'Tom B.',   timestamp:'2026-05-24 16:40' },
  { id:'APP-1010', applicant:'Yuki Tanaka',       decision:'Approved',  admin:'Sarah K.', timestamp:'2026-05-23 09:30' },
  { id:'APP-1002', applicant:'Priya Nair',        decision:'Approved',  admin:'Tom B.',   timestamp:'2026-05-22 13:15' },
];

// ── Status Breakdown ─────────────────────────────────────────────
export const statusBreakdown = {
  Pending:         { count:5, color:'#f59e0b', statusKey: 'Pending' },
  'In Review':     { count:4, color:'#3b82f6', statusKey: 'In Review' },
  Approved:        { count:3, color:'#10b981', statusKey: 'Approved' },
  Rejected:        { count:1, color:'#ef4444', statusKey: 'Rejected' },
  'Action Required':{ count:2, color:'#f97316', statusKey: 'Action Required' },
};
