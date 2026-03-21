// ── Applications ─────────────────────────────────────────────
export const mockApplications = [
  { id:'APP-1001', name:'James Hartley',    email:'james.h@email.com',   city:'London',    unit:'Studio 4B',    property:'Arrivio Canary Wharf', submitted:'2025-02-10', status:'Pending',         reviewer:'Sarah K.',  days:38, paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1002', name:'Priya Nair',       email:'priya.n@email.com',   city:'Dubai',     unit:'1BR 12A',      property:'Arrivio DIFC',         submitted:'2025-02-15', status:'In Review',       reviewer:'Tom B.',    days:33, paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1003', name:'Chen Wei',         email:'chen.w@email.com',    city:'Singapore', unit:'2BR 7C',       property:'Arrivio Marina Bay',   submitted:'2025-02-18', status:'Approved',        reviewer:'Sarah K.',  days:30, paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1004', name:'Fatima Al-Rashid', email:'fatima.a@email.com',  city:'Dubai',     unit:'Studio 2A',    property:'Arrivio DIFC',         submitted:'2025-02-20', status:'Approved',        reviewer:'Tom B.',    days:28, paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1005', name:'Oliver Bennett',   email:'oliver.b@email.com',  city:'London',    unit:'1BR 8F',       property:'Arrivio Shoreditch',   submitted:'2025-02-22', status:'Action Required', reviewer:'Sarah K.',  days:26, paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1006', name:'Aisha Malik',      email:'aisha.m@email.com',   city:'London',    unit:'Studio 1A',    property:'Arrivio Canary Wharf', submitted:'2025-02-25', status:'Rejected',        reviewer:'Tom B.',    days:23, paymentStatus:'Refund issued',        docStatus:'rejected'   },
  { id:'APP-1007', name:'Raj Patel',        email:'raj.p@email.com',     city:'Singapore', unit:'1BR 3D',       property:'Arrivio Marina Bay',   submitted:'2025-03-01', status:'Pending',         reviewer:'Unassigned',days:19, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1008', name:'Sophie Laurent',   email:'sophie.l@email.com',  city:'London',    unit:'2BR 5E',       property:'Arrivio Shoreditch',   submitted:'2025-03-03', status:'In Review',       reviewer:'Tom B.',    days:17, paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1009', name:'Marcus Silva',     email:'marcus.s@email.com',  city:'Dubai',     unit:'1BR 9B',       property:'Arrivio DIFC',         submitted:'2025-03-05', status:'Pending',         reviewer:'Unassigned',days:15, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1010', name:'Yuki Tanaka',      email:'yuki.t@email.com',    city:'Singapore', unit:'Studio 6A',    property:'Arrivio Marina Bay',   submitted:'2025-03-08', status:'Approved',        reviewer:'Sarah K.',  days:12, paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1011', name:'Elena Vasquez',    email:'elena.v@email.com',   city:'London',    unit:'1BR 11C',      property:'Arrivio Canary Wharf', submitted:'2025-03-10', status:'In Review',       reviewer:'Sarah K.',  days:10, paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1012', name:'Ahmed Hassan',     email:'ahmed.h@email.com',   city:'Dubai',     unit:'2BR 4A',       property:'Arrivio DIFC',         submitted:'2025-03-12', status:'Pending',         reviewer:'Unassigned',days:8,  paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1013', name:'Nina Okafor',      email:'nina.o@email.com',    city:'Singapore', unit:'1BR 2B',       property:'Arrivio Marina Bay',   submitted:'2025-03-14', status:'Action Required', reviewer:'Tom B.',    days:6,  paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1014', name:'Daniel Müller',    email:'daniel.m@email.com',  city:'London',    unit:'Studio 3C',    property:'Arrivio Shoreditch',   submitted:'2025-03-16', status:'Pending',         reviewer:'Unassigned',days:4,  paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1015', name:'Ling Zhao',        email:'ling.z@email.com',    city:'Singapore', unit:'2BR 8D',       property:'Arrivio Marina Bay',   submitted:'2025-03-18', status:'In Review',       reviewer:'Tom B.',    days:2,  paymentStatus:'Holding deposit paid', docStatus:'complete'   },
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
    appId:'APP-1001', name:'James Hartley',  email:'james.h@email.com',  city:'London',    applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-02-11', status:'Uploaded' },
      contract: { uploaded:'2025-02-11', status:'Uploaded' },
      payslips: { uploaded:'2025-02-13', status:'Uploaded' },
      visa:     { uploaded:'2025-02-12', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1002', name:'Priya Nair',      email:'priya.n@email.com',  city:'Dubai',     applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-02-16', status:'Verified' },
      contract: { uploaded:'2025-02-16', status:'Verified' },
      payslips: { uploaded:'2025-02-17', status:'Uploaded' },
      visa:     { uploaded:'2025-02-16', status:'Verified' },
    },
  },
  {
    appId:'APP-1003', name:'Chen Wei',        email:'chen.w@email.com',   city:'Singapore', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2025-02-19', status:'Verified' },
      business: { uploaded:'2025-02-19', status:'Verified' },
      bank:     { uploaded:'2025-02-20', status:'Verified' },
      visa:     { uploaded:'2025-02-19', status:'Verified' },
    },
  },
  {
    appId:'APP-1004', name:'Fatima Al-Rashid',email:'fatima.a@email.com', city:'Dubai',     applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-02-21', status:'Verified' },
      contract: { uploaded:'2025-02-21', status:'Verified' },
      payslips: { uploaded:'2025-02-21', status:'Verified' },
      visa:     { uploaded:'2025-02-21', status:'Verified' },
    },
  },
  {
    appId:'APP-1005', name:'Oliver Bennett',  email:'oliver.b@email.com', city:'London',    applicantType:'student',
    docs: {
      passport:   { uploaded:'2025-02-23', status:'Uploaded' },
      enrollment: { uploaded:'2025-02-23', status:'Rejected' },
      financial:  { uploaded:'2025-02-24', status:'Uploaded' },
      visa:       { uploaded:'2025-02-23', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1007', name:'Raj Patel',       email:'raj.p@email.com',    city:'Singapore', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2025-03-01', status:'Uploaded' },
      business: { uploaded:'2025-03-02', status:'Uploaded' },
      bank:     { uploaded:'2025-03-02', status:'Uploaded' },
      visa:     { uploaded:'2025-03-01', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1008', name:'Sophie Laurent',  email:'sophie.l@email.com', city:'London',    applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-03-04', status:'Verified' },
      contract: { uploaded:'2025-03-04', status:'Uploaded' },
      payslips: { uploaded:'2025-03-04', status:'Uploaded' },
      visa:     { uploaded:'2025-03-05', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1009', name:'Marcus Silva',    email:'marcus.s@email.com', city:'Dubai',     applicantType:'student',
    docs: {
      passport:   { uploaded:'2025-03-05', status:'Uploaded' },
      enrollment: { uploaded:'2025-03-05', status:'Uploaded' },
      financial:  { uploaded:'2025-03-06', status:'Uploaded' },
      visa:       { uploaded:'2025-03-06', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1010', name:'Yuki Tanaka',     email:'yuki.t@email.com',   city:'Singapore', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2025-03-08', status:'Verified' },
      business: { uploaded:'2025-03-08', status:'Verified' },
      bank:     { uploaded:'2025-03-08', status:'Verified' },
      visa:     { uploaded:'2025-03-09', status:'Verified' },
    },
  },
  {
    appId:'APP-1011', name:'Elena Vasquez',   email:'elena.v@email.com',  city:'London',    applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-03-10', status:'Verified' },
      contract: { uploaded:'2025-03-10', status:'Uploaded' },
      payslips: { uploaded:'2025-03-11', status:'Uploaded' },
      visa:     { uploaded:'2025-03-10', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1013', name:'Nina Okafor',     email:'nina.o@email.com',   city:'Singapore', applicantType:'student',
    docs: {
      passport:   { uploaded:'2025-03-14', status:'Uploaded' },
      enrollment: { uploaded:'2025-03-14', status:'Uploaded' },
      financial:  { uploaded:'2025-03-14', status:'Uploaded' },
      visa:       { uploaded:'2025-03-15', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1015', name:'Ling Zhao',       email:'ling.z@email.com',   city:'Singapore', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2025-03-18', status:'Uploaded' },
      business: { uploaded:'2025-03-18', status:'Uploaded' },
      bank:     { uploaded:'2025-03-18', status:'Uploaded' },
      visa:     { uploaded:'2025-03-18', status:'Uploaded' },
    },
  },
];

// ── Units ──────────────────────────────────────────────────────
export const mockUnits = [
  { id:'U-001', type:'Studio', property:'Arrivio Canary Wharf', city:'London',    floor:4,  status:'Occupied',     rent:2200, tenant:'James Hartley',    amenities:['Gym','Concierge','Terrace']    },
  { id:'U-002', type:'1BR',    property:'Arrivio Canary Wharf', city:'London',    floor:7,  status:'Available',    rent:2800, tenant:null,               amenities:['Gym','Concierge','Parking']    },
  { id:'U-003', type:'2BR',    property:'Arrivio Canary Wharf', city:'London',    floor:11, status:'Reserved',     rent:3900, tenant:'Oliver Bennett',   amenities:['Gym','Concierge','Balcony']    },
  { id:'U-004', type:'Studio', property:'Arrivio Shoreditch',   city:'London',    floor:2,  status:'Available',    rent:1950, tenant:null,               amenities:['Rooftop','Bike Storage']       },
  { id:'U-005', type:'1BR',    property:'Arrivio Shoreditch',   city:'London',    floor:5,  status:'Occupied',     rent:2650, tenant:'Sophie Laurent',   amenities:['Rooftop','Co-working space']   },
  { id:'U-006', type:'2BR',    property:'Arrivio Shoreditch',   city:'London',    floor:8,  status:'Maintenance',  rent:3700, tenant:null,               amenities:['Rooftop','Parking','Balcony']  },
  { id:'U-007', type:'Studio', property:'Arrivio DIFC',         city:'Dubai',     floor:12, status:'Occupied',     rent:4200, tenant:'Fatima Al-Rashid', amenities:['Pool','Gym','Concierge']       },
  { id:'U-008', type:'1BR',    property:'Arrivio DIFC',         city:'Dubai',     floor:15, status:'Available',    rent:5500, tenant:null,               amenities:['Pool','Gym','City View']       },
  { id:'U-009', type:'2BR',    property:'Arrivio DIFC',         city:'Dubai',     floor:18, status:'Reserved',     rent:8200, tenant:'Ahmed Hassan',     amenities:['Pool','Gym','Terrace']         },
  { id:'U-010', type:'Studio', property:'Arrivio Marina Bay',   city:'Singapore', floor:6,  status:'Occupied',     rent:3800, tenant:'Yuki Tanaka',      amenities:['Pool','Gym','Bay View']        },
  { id:'U-011', type:'1BR',    property:'Arrivio Marina Bay',   city:'Singapore', floor:9,  status:'Available',    rent:4800, tenant:null,               amenities:['Pool','Gym','Rooftop']         },
  { id:'U-012', type:'2BR',    property:'Arrivio Marina Bay',   city:'Singapore', floor:14, status:'Occupied',     rent:7200, tenant:'Chen Wei',         amenities:['Pool','Gym','Balcony','Parking']},
  { id:'U-013', type:'1BR',    property:'Arrivio Marina Bay',   city:'Singapore', floor:3,  status:'Reserved',     rent:4500, tenant:'Ling Zhao',        amenities:['Pool','Co-working']            },
  { id:'U-014', type:'Studio', property:'Arrivio DIFC',         city:'Dubai',     floor:9,  status:'Maintenance',  rent:3900, tenant:null,               amenities:['Pool','Gym']                   },
  { id:'U-015', type:'2BR',    property:'Arrivio Shoreditch',   city:'London',    floor:6,  status:'Available',    rent:3600, tenant:null,               amenities:['Rooftop','Parking','Concierge'] },
];

// ── Move Events ────────────────────────────────────────────────
export const mockMoveEvents = [
  { id:'MOV-001', tenant:'Chen Wei',         unit:'2BR 7C',    property:'Arrivio Marina Bay',   city:'Singapore', type:'Move-in',  date:'2025-03-22', status:'Confirmed'  },
  { id:'MOV-002', tenant:'Fatima Al-Rashid', unit:'Studio 2A', property:'Arrivio DIFC',         city:'Dubai',     type:'Move-in',  date:'2025-03-23', status:'Confirmed'  },
  { id:'MOV-003', tenant:'Yuki Tanaka',      unit:'Studio 6A', property:'Arrivio Marina Bay',   city:'Singapore', type:'Move-out', date:'2025-03-24', status:'Scheduled'  },
  { id:'MOV-004', tenant:'Sophie Laurent',   unit:'2BR 5E',    property:'Arrivio Shoreditch',   city:'London',    type:'Move-in',  date:'2025-03-25', status:'Scheduled'  },
  { id:'MOV-005', tenant:'James Hartley',    unit:'Studio 4B', property:'Arrivio Canary Wharf', city:'London',    type:'Move-out', date:'2025-03-26', status:'Scheduled'  },
  { id:'MOV-006', tenant:'Ling Zhao',        unit:'2BR 8D',    property:'Arrivio Marina Bay',   city:'Singapore', type:'Move-in',  date:'2025-03-27', status:'Confirmed'  },
  { id:'MOV-007', tenant:'Oliver Bennett',   unit:'2BR 3C',    property:'Arrivio Canary Wharf', city:'London',    type:'Move-in',  date:'2025-03-28', status:'Scheduled'  },
  { id:'MOV-008', tenant:'Marcus Silva',     unit:'1BR 9B',    property:'Arrivio DIFC',         city:'Dubai',     type:'Move-in',  date:'2025-03-30', status:'Scheduled'  },
  { id:'MOV-009', tenant:'Elena Vasquez',    unit:'1BR 11C',   property:'Arrivio Canary Wharf', city:'London',    type:'Move-out', date:'2025-04-01', status:'Scheduled'  },
  { id:'MOV-010', tenant:'Ahmed Hassan',     unit:'2BR 4A',    property:'Arrivio DIFC',         city:'Dubai',     type:'Move-in',  date:'2025-04-03', status:'Scheduled'  },
];

// ── Waitlist ────────────────────────────────────────────────────
export const mockWaitlist = [
  { id:'WL-001', position:1, name:'Ivan Petrov',    unitType:'Studio', city:'London',    added:'2025-01-15', days:64 },
  { id:'WL-002', position:2, name:'Mei Lin',         unitType:'1BR',    city:'Dubai',     added:'2025-01-22', days:57 },
  { id:'WL-003', position:3, name:'Carlos Rivera',   unitType:'2BR',    city:'Singapore', added:'2025-01-28', days:51 },
  { id:'WL-004', position:4, name:'Hannah Schmidt',  unitType:'Studio', city:'London',    added:'2025-02-05', days:43 },
  { id:'WL-005', position:5, name:'Kwame Asante',    unitType:'1BR',    city:'London',    added:'2025-02-10', days:38 },
  { id:'WL-006', position:6, name:'Amara Diallo',    unitType:'Studio', city:'Dubai',     added:'2025-02-14', days:34 },
  { id:'WL-007', position:7, name:'Leo Nakamura',    unitType:'2BR',    city:'Singapore', added:'2025-02-20', days:28 },
  { id:'WL-008', position:8, name:'Fatou Camara',    unitType:'1BR',    city:'Singapore', added:'2025-02-25', days:23 },
  { id:'WL-009', position:9, name:'Dmitri Volkov',   unitType:'Studio', city:'London',    added:'2025-03-01', days:19 },
  { id:'WL-010', position:10,name:'Nadia Fernandez', unitType:'2BR',    city:'Dubai',     added:'2025-03-05', days:15 },
];

// ── Recent Decisions ────────────────────────────────────────────
export const recentDecisions = [
  { id:'APP-1003', applicant:'Chen Wei',         decision:'Approved',  admin:'Sarah K.', timestamp:'2025-03-19 14:22' },
  { id:'APP-1004', applicant:'Fatima Al-Rashid', decision:'Approved',  admin:'Tom B.',   timestamp:'2025-03-19 11:05' },
  { id:'APP-1006', applicant:'Aisha Malik',       decision:'Rejected',  admin:'Tom B.',   timestamp:'2025-03-18 16:40' },
  { id:'APP-1010', applicant:'Yuki Tanaka',       decision:'Approved',  admin:'Sarah K.', timestamp:'2025-03-17 09:30' },
  { id:'APP-1002', applicant:'Priya Nair',        decision:'Approved',  admin:'Tom B.',   timestamp:'2025-03-16 13:15' },
];

// ── Status Breakdown ─────────────────────────────────────────────
export const statusBreakdown = {
  Pending:         { count:5, color:'#f59e0b' },
  'In Review':     { count:4, color:'#3b82f6' },
  Approved:        { count:3, color:'#10b981' },
  Rejected:        { count:1, color:'#ef4444' },
  'Action Required':{ count:2, color:'#f97316' },
};
