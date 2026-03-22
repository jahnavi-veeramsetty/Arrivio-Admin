// ── Applications ─────────────────────────────────────────────
export const mockApplications = [
  { id:'APP-1001', name:'James Hartley',    email:'james.h@email.com',   city:'Aachen',    unit:'Studio 4B',    property:'Arrivio Canary Wharf', submitted:'2025-03-20', status:'Pending',         reviewer:'Sarah K.',  days:1.8, paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1002', name:'Priya Nair',       email:'priya.n@email.com',   city:'Berlin',    unit:'1BR 12A',      property:'Arrivio Canary Wharf', submitted:'2025-02-15', status:'In Review',       reviewer:'Tom B.',    days:33, paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1003', name:'Chen Wei',         email:'chen.w@email.com',    city:'Bonn',      unit:'2BR 7C',       property:'Arrivio Marina Bay',   submitted:'2025-02-18', status:'Approved',        reviewer:'Sarah K.',  days:30, paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1004', name:'Fatima Al-Rashid', email:'fatima.a@email.com',  city:'Cologne',   unit:'Studio 2A',    property:'Arrivio DIFC',         submitted:'2025-02-20', status:'Approved',        reviewer:'Tom B.',    days:28, paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1005', name:'Oliver Bennett',   email:'oliver.b@email.com',  city:'Dusseldorf',unit:'1BR 8F',       property:'Arrivio Shoreditch',   submitted:'2025-02-22', status:'Action Required', reviewer:'Sarah K.',  days:26, paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1006', name:'Aisha Malik',      email:'aisha.m@email.com',   city:'Frankfurt', unit:'Studio 1A',    property:'Arrivio Canary Wharf', submitted:'2025-02-25', status:'Rejected',        reviewer:'Tom B.',    days:23, paymentStatus:'Refund issued',        docStatus:'rejected'   },
  { id:'APP-1007', name:'Raj Patel',        email:'raj.p@email.com',     city:'Hamburg',   unit:'1BR 3D',       property:'Arrivio Marina Bay',   submitted:'2025-03-21', status:'Pending',         reviewer:'Unassigned',days:1.4, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1008', name:'Sophie Laurent',   email:'sophie.l@email.com',  city:'Munich',    unit:'2BR 5E',       property:'Arrivio Shoreditch',   submitted:'2025-03-03', status:'In Review',       reviewer:'Tom B.',    days:17, paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1009', name:'Marcus Silva',     email:'marcus.s@email.com',  city:'Aachen',    unit:'1BR 9B',       property:'Arrivio DIFC',         submitted:'2025-03-21', status:'Pending',         reviewer:'Unassigned',days:0.9, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1010', name:'Yuki Tanaka',      email:'yuki.t@email.com',    city:'Berlin',    unit:'Studio 6A',    property:'Arrivio Marina Bay',   submitted:'2025-03-08', status:'Approved',        reviewer:'Sarah K.',  days:12, paymentStatus:'Full payment sent',    docStatus:'verified'   },
  { id:'APP-1011', name:'Elena Vasquez',    email:'elena.v@email.com',   city:'Bonn',      unit:'1BR 11C',      property:'Arrivio Canary Wharf', submitted:'2025-03-10', status:'In Review',       reviewer:'Sarah K.',  days:10, paymentStatus:'Holding deposit paid', docStatus:'complete'   },
  { id:'APP-1012', name:'Ahmed Hassan',     email:'ahmed.h@email.com',   city:'Cologne',   unit:'2BR 4A',       property:'Arrivio DIFC',         submitted:'2025-03-21', status:'Pending',         reviewer:'Unassigned',days:0.6, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1013', name:'Nina Okafor',      email:'nina.o@email.com',    city:'Dusseldorf',unit:'1BR 2B',       property:'Arrivio Marina Bay',   submitted:'2025-03-14', status:'Action Required', reviewer:'Tom B.',    days:6,  paymentStatus:'Holding deposit paid', docStatus:'incomplete' },
  { id:'APP-1014', name:'Daniel Müller',    email:'daniel.m@email.com',  city:'Frankfurt', unit:'Studio 3C',    property:'Arrivio Shoreditch',   submitted:'2025-03-22', status:'Pending',         reviewer:'Unassigned',days:0.2, paymentStatus:'Pending',              docStatus:'incomplete' },
  { id:'APP-1015', name:'Ling Zhao',        email:'ling.z@email.com',    city:'Hamburg',   unit:'2BR 8D',       property:'Arrivio Marina Bay',   submitted:'2025-03-18', status:'In Review',       reviewer:'Tom B.',    days:2,  paymentStatus:'Holding deposit paid', docStatus:'complete'   },
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
      passport: { uploaded:'2025-02-11', status:'Uploaded' },
      contract: { uploaded:'2025-02-11', status:'Uploaded' },
      payslips: { uploaded:'2025-02-13', status:'Uploaded' },
      visa:     { uploaded:'2025-02-12', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1002', name:'Priya Nair',      email:'priya.n@email.com',  city:'Berlin',     applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-02-16', status:'Verified' },
      contract: { uploaded:'2025-02-16', status:'Verified' },
      payslips: { uploaded:'2025-02-17', status:'Uploaded' },
      visa:     { uploaded:'2025-02-16', status:'Verified' },
    },
  },
  {
    appId:'APP-1003', name:'Chen Wei',        email:'chen.w@email.com',   city:'Bonn', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2025-02-19', status:'Verified' },
      business: { uploaded:'2025-02-19', status:'Verified' },
      bank:     { uploaded:'2025-02-20', status:'Verified' },
      visa:     { uploaded:'2025-02-19', status:'Verified' },
    },
  },
  {
    appId:'APP-1004', name:'Fatima Al-Rashid',email:'fatima.a@email.com', city:'Cologne',     applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-02-21', status:'Verified' },
      contract: { uploaded:'2025-02-21', status:'Verified' },
      payslips: { uploaded:'2025-02-21', status:'Verified' },
      visa:     { uploaded:'2025-02-21', status:'Verified' },
    },
  },
  {
    appId:'APP-1005', name:'Oliver Bennett',  email:'oliver.b@email.com', city:'Dusseldorf',    applicantType:'student',
    docs: {
      passport:   { uploaded:'2025-02-23', status:'Uploaded' },
      enrollment: { uploaded:'2025-02-23', status:'Rejected' },
      financial:  { uploaded:'2025-02-24', status:'Uploaded' },
      visa:       { uploaded:'2025-02-23', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1007', name:'Raj Patel',       email:'raj.p@email.com',    city:'Hamburg', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2025-03-01', status:'Uploaded' },
      business: { uploaded:'2025-03-02', status:'Uploaded' },
      bank:     { uploaded:'2025-03-02', status:'Uploaded' },
      visa:     { uploaded:'2025-03-01', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1008', name:'Sophie Laurent',  email:'sophie.l@email.com', city:'Munich',    applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-03-04', status:'Verified' },
      contract: { uploaded:'2025-03-04', status:'Uploaded' },
      payslips: { uploaded:'2025-03-04', status:'Uploaded' },
      visa:     { uploaded:'2025-03-05', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1009', name:'Marcus Silva',    email:'marcus.s@email.com', city:'Aachen',     applicantType:'student',
    docs: {
      passport:   { uploaded:'2025-03-05', status:'Uploaded' },
      enrollment: { uploaded:'2025-03-05', status:'Uploaded' },
      financial:  { uploaded:'2025-03-06', status:'Uploaded' },
      visa:       { uploaded:'2025-03-06', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1010', name:'Yuki Tanaka',     email:'yuki.t@email.com',   city:'Berlin', applicantType:'self_employed',
    docs: {
      passport: { uploaded:'2025-03-08', status:'Verified' },
      business: { uploaded:'2025-03-08', status:'Verified' },
      bank:     { uploaded:'2025-03-08', status:'Verified' },
      visa:     { uploaded:'2025-03-09', status:'Verified' },
    },
  },
  {
    appId:'APP-1011', name:'Elena Vasquez',   email:'elena.v@email.com',  city:'Bonn',    applicantType:'employee',
    docs: {
      passport: { uploaded:'2025-03-10', status:'Verified' },
      contract: { uploaded:'2025-03-10', status:'Uploaded' },
      payslips: { uploaded:'2025-03-11', status:'Uploaded' },
      visa:     { uploaded:'2025-03-10', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1013', name:'Nina Okafor',     email:'nina.o@email.com',   city:'Dusseldorf', applicantType:'student',
    docs: {
      passport:   { uploaded:'2025-03-14', status:'Uploaded' },
      enrollment: { uploaded:'2025-03-14', status:'Uploaded' },
      financial:  { uploaded:'2025-03-14', status:'Uploaded' },
      visa:       { uploaded:'2025-03-15', status:'Uploaded' },
    },
  },
  {
    appId:'APP-1015', name:'Ling Zhao',       email:'ling.z@email.com',   city:'Hamburg', applicantType:'self_employed',
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
  { id:'MOV-001', tenant:'Chen Wei',         unit:'2BR 7C',    property:'Arrivio Marina Bay',   city:'Singapore', propertyType: '2BR',    type:'Move-in',  date:'2026-03-22', status:'Confirmed', email: 'chen.wei@email.sg', phone: '+65 8123 4567', checklist: { done: 3, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID verified'] }  },
  { id:'MOV-002', tenant:'Fatima Al-Rashid', unit:'Studio 2A', property:'Arrivio DIFC',         city:'Dubai',     propertyType: 'Studio', type:'Move-in',  date:'2026-03-23', status:'Confirmed', email: 'fatima.r@uae.com', phone: '+971 50 123 4567', checklist: { done: 2, total: 3, items: ['Key collection ✓', 'Cleaner booked ✓', 'Welcome pack pending'] }  },
  { id:'MOV-003', tenant:'Yuki Tanaka',      unit:'Studio 6A', property:'Arrivio Marina Bay',   city:'Singapore', propertyType: 'Studio', type:'Move-out', date:'2026-03-24', status:'Scheduled', email: 'yuki.t@jp-tech.com', phone: '+65 9123 0000', checklist: { done: 1, total: 4, items: ['Inspection scheduled ✓', 'Cleaning pending', 'Key return pending', 'Refund pending'] }  },
  { id:'MOV-004', tenant:'Sophie Laurent',   unit:'2BR 5E',    property:'Arrivio Shoreditch',   city:'London',    propertyType: '2BR',    type:'Move-in',  date:'2026-03-25', status:'Scheduled', email: 'sophie.l@fr-mail.com', phone: '+44 7700 900123', checklist: { done: 0, total: 3, items: ['Agreement pending', 'Deposit pending', 'ID pending'] }  },
  { id:'MOV-005', tenant:'James Hartley',    unit:'Studio 4B', property:'Arrivio Canary Wharf', city:'London',    propertyType: 'Studio', type:'Move-out', date:'2026-03-26', status:'Scheduled', email: 'james.h@uk-ops.co', phone: '+44 7700 900456', checklist: { done: 3, total: 4, items: ['Inspection done ✓', 'Cleaning done ✓', 'Key return done ✓', 'Refund pending'] }  },
  { id:'MOV-006', tenant:'Ling Zhao',        unit:'2BR 8D',    property:'Arrivio Marina Bay',   city:'Singapore', propertyType: '2BR',    type:'Move-in',  date:'2026-03-27', status:'Confirmed', email: 'ling.z@zhao-intl.com', phone: '+65 8888 1234', checklist: { done: 3, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID verified'] }  },
  { id:'MOV-007', tenant:'Oliver Bennett',   unit:'2BR 3C',    property:'Arrivio Canary Wharf', city:'London',    propertyType: '2BR',    type:'Move-in',  date:'2026-03-28', status:'Scheduled', email: 'oliver.b@bennett.uk', phone: '+44 7700 900789', checklist: { done: 2, total: 3, items: ['Agreement signed', 'Deposit paid', 'ID pending'] }  },
  { id:'MOV-008', tenant:'Marcus Silva',     unit:'1BR 9B',    property:'Arrivio DIFC',         city:'Dubai',     propertyType: '1BR',    type:'Move-in',  date:'2026-03-30', status:'Scheduled', email: 'marcus.s@br-logistics.com', phone: '+971 52 987 6543', checklist: { done: 1, total: 3, items: ['Agreement pending', 'Deposit paid', 'ID verified'] }  },
  { id:'MOV-009', tenant:'Daniel Müller',    unit:'Studio 3C', property:'Arrivio Shoreditch',   city:'London',    propertyType: 'Studio', type:'Move-in',  date:'2026-03-15', status:'Completed', email: 'daniel.m@de-engine.com', phone: '+44 7700 900011' },
  { id:'MOV-010', tenant:'Elena Vasquez',    unit:'1BR 11C',   property:'Arrivio Canary Wharf', city:'London',    propertyType: '1BR',    type:'Move-in',  date:'2026-03-18', status:'Completed', email: 'elena.v@es-mail.net', phone: '+44 7700 900022' },
  { id:'MOV-011', tenant:'Nina Okafor',      unit:'1BR 2B',    property:'Arrivio Marina Bay',   city:'Singapore', propertyType: '1BR',    type:'Move-out', date:'2026-03-20', status:'Scheduled', email: 'nina.o@ng-trade.org', phone: '+65 9999 5555' },
  { id:'MOV-012', tenant:'Ahmad Ali',        unit:'1BR 5D',    property:'Arrivio DIFC',         city:'Dubai',     propertyType: '1BR',    type:'Move-in',  date:'2026-03-25', status:'Confirmed', email: 'ahmad.ali@eg-mail.com', phone: '+971 55 111 2222' },
  { id:'MOV-013', tenant:'Marie Curie',      unit:'Studio 1A', property:'Arrivio Shoreditch',   city:'London',    propertyType: 'Studio', type:'Move-in',  date:'2026-04-02', status:'Scheduled', email: 'marie.c@science.edu', phone: '+44 7700 900033' },
  { id:'MOV-014', tenant:'Leonardo DaVinci', unit:'2BR 9G',    property:'Arrivio DIFC',         city:'Dubai',     propertyType: '2BR',    type:'Move-out', date:'2026-04-05', status:'Scheduled', email: 'leo.dv@arts.it', phone: '+971 58 555 6666' },
  { id:'MOV-015', tenant:'Sarah Jenkins',    unit:'Studio 4A', property:'Arrivio Marina Bay',   city:'Singapore', propertyType: 'Studio', type:'Move-in',  date:'2026-03-05', status:'Completed', email: 'sarah.j@email.com', phone: '+65 8123 9999' },
  { id:'MOV-016', tenant:'Michael Brown',    unit:'2BR 12C',   property:'Arrivio Canary Wharf', city:'London',    propertyType: '2BR',    type:'Move-out', date:'2026-03-08', status:'Confirmed', email: 'michael.b@email.com', phone: '+44 7700 900555' },
  { id:'MOV-017', tenant:'Anna Schmidt',     unit:'1BR 7B',    property:'Arrivio Shoreditch',   city:'London',    propertyType: '1BR',    type:'Move-in',  date:'2026-03-10', status:'Scheduled', email: 'anna.s@email.de', phone: '+44 7700 900666' },
  { id:'MOV-018', tenant:'David Wilson',     unit:'Studio 2D', property:'Arrivio DIFC',         city:'Dubai',     propertyType: 'Studio', type:'Move-in',  date:'2026-03-12', status:'Confirmed', email: 'david.w@email.com', phone: '+971 50 555 1212' },
  { id:'MOV-019', tenant:'Emma Thompson',    unit:'2BR 5A',    property:'Arrivio Marina Bay',   city:'Singapore', propertyType: '2BR',    type:'Move-out', date:'2026-03-15', status:'Scheduled', email: 'emma.t@email.com', phone: '+65 9111 2222' },
  { id:'MOV-020', tenant:'Lucas Garcia',     unit:'1BR 9F',    property:'Arrivio Canary Wharf', city:'London',    propertyType: '1BR',    type:'Move-in',  date:'2026-03-18', status:'Confirmed', email: 'lucas.g@email.com', phone: '+44 7700 900777' },
  { id:'MOV-021', tenant:'Olivia Moore',     unit:'Studio 6B', property:'Arrivio Shoreditch',   city:'London',    propertyType: 'Studio', type:'Move-in',  date:'2026-03-20', status:'Scheduled', email: 'olivia.m@email.com', phone: '+44 7700 900888' },
  { id:'MOV-022', tenant:'William Taylor',   unit:'2BR 1C',    property:'Arrivio DIFC',         city:'Dubai',     propertyType: '2BR',    type:'Move-out', date:'2026-03-22', status:'Completed', email: 'will.t@email.com', phone: '+971 52 111 3333' },
  { id:'MOV-023', tenant:'Sophia Anderson',  unit:'1BR 3E',    property:'Arrivio Marina Bay',   city:'Singapore', propertyType: '1BR',    type:'Move-in',  date:'2026-03-25', status:'Confirmed', email: 'sophia.a@email.com', phone: '+65 8222 3333' },
  { id:'MOV-024', tenant:'Liam Martinez',    unit:'Studio 8C', property:'Arrivio Canary Wharf', city:'London',    propertyType: 'Studio', type:'Move-out', date:'2026-03-28', status:'Scheduled', email: 'liam.m@email.com', phone: '+44 7700 900999' },
  { id:'MOV-025', tenant:'Isabella Lee',     unit:'2BR 4D',    property:'Arrivio Shoreditch',   city:'London',    propertyType: '2BR',    type:'Move-in',  date:'2026-03-31', status:'Confirmed', email: 'bella.l@email.com', phone: '+44 7700 900111' },
  { id:'MOV-026', tenant:'Ethan Harris',     unit:'1BR 10A',   property:'Arrivio DIFC',         city:'Dubai',     propertyType: '1BR',    type:'Move-in',  date:'2026-04-01', status:'Scheduled', email: 'ethan.h@email.com', phone: '+971 55 444 5555' },
  { id:'MOV-027', tenant:'Mia Clark',        unit:'Studio 5F', property:'Arrivio Marina Bay',   city:'Singapore', propertyType: 'Studio', type:'Move-out', date:'2026-04-03', status:'Confirmed', email: 'mia.c@email.com', phone: '+65 9333 4444' },
  { id:'MOV-028', tenant:'Noah Lewis',       unit:'2BR 2B',    property:'Arrivio Canary Wharf', city:'London',    propertyType: '2BR',    type:'Move-in',  date:'2026-04-05', status:'Scheduled', email: 'noah.l@email.com', phone: '+44 7700 900222' },
  { id:'MOV-029', tenant:'Charlotte Lee',    unit:'1BR 1A',    property:'Arrivio Shoreditch',   city:'London',    propertyType: '1BR',    type:'Move-in',  date:'2026-03-02', status:'Confirmed', email: 'lottie.l@email.com', phone: '+44 7700 900333' },
  { id:'MOV-030', tenant:'Benjamin Hall',    unit:'Studio 9E', property:'Arrivio DIFC',         city:'Dubai',     propertyType: 'Studio', type:'Move-out', date:'2026-03-14', status:'Scheduled', email: 'ben.h@email.com', phone: '+971 50 666 7777' },
];

// ── Blocked Applications ──────────────────────────────────────
export const blockedApplications = [
  { id:'APP-1005', name:'Oliver Bennett',  reason:'Passport rejected — resubmission requested', days:12 },
  { id:'APP-1013', name:'Nina Okafor',      reason:'Proof of income missing', days:7 },
  { id:'APP-1020', name:'Sarah Jenkins',    reason:'Visa document unclear', days:15 },
];

// ── Lease Expiry Radar ────────────────────────────────────────
export const leaseExpiries = [
  { tenant: 'Alex Rivers',  unit: 'Studio 2A', property: 'Arrivio DIFC',         city: 'Dubai',     endDate: '2025-04-05', daysRemaining: 14 },
  { tenant: 'Priya Nair',   unit: '1BR 12A',   property: 'Arrivio Canary Wharf', city: 'London',    endDate: '2025-04-15', daysRemaining: 24 },
  { tenant: 'Chen Wei',     unit: '2BR 7C',    property: 'Arrivio Marina Bay',   city: 'Singapore', endDate: '2025-04-20', daysRemaining: 29 },
  { tenant: 'James Smith',  unit: '1BR 5G',    property: 'Arrivio Shoreditch',   city: 'London',    endDate: '2025-05-10', daysRemaining: 49 },
  { tenant: 'Yuki Tanaka',  unit: 'Studio 6A', property: 'Arrivio Marina Bay',   city: 'Singapore', endDate: '2025-05-15', daysRemaining: 54 },
];

// ── Waitlist Hierarchical Data ─────────────────────────────────
export const waitlistProperties = [
  {
    city: 'Singapore',
    properties: [
      {
        id: 'P-SG-01',
        name: 'Arrivio Marina Bay',
        address: '8 Marina View, Singapore 018960',
        totalUnits: 42,
        occupiedUnits: 38,
        availableUnits: 4,
        waitingCount: 12,
        units: [
          {
            id: 'U-010',
            name: 'Studio 6A',
            type: 'Studio',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-101', position: 1, name: 'Ivan Petrov', email: 'ivan.p@domain.ru', dateAdded: '2026-01-15', daysWaiting: 67 },
              { id: 'WL-102', position: 2, name: 'Sofia Rossi', email: 'sofia.r@italy.mail', dateAdded: '2026-02-01', daysWaiting: 50 }
            ]
          },
          {
            id: 'U-012',
            name: '2BR 14C',
            type: '2BR',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-103', position: 1, name: 'Chen Wei', email: 'chen.w@tech.cn', dateAdded: '2026-01-20', daysWaiting: 62 }
            ]
          },
          {
            id: 'U-011',
            name: '1BR 9A',
            type: '1BR',
            status: 'Available',
            waitlist: []
          }
        ]
      }
    ]
  },
  {
    city: 'Dubai',
    properties: [
      {
        id: 'P-DXB-01',
        name: 'Arrivio DIFC',
        address: 'Burj Daman, DIFC, Dubai',
        totalUnits: 28,
        occupiedUnits: 26,
        availableUnits: 2,
        waitingCount: 8,
        units: [
          {
            id: 'U-007',
            name: 'Studio 12A',
            type: 'Studio',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-201', position: 1, name: 'Mei Lin', email: 'mei.lin@asia-logistics.com', dateAdded: '2026-01-22', daysWaiting: 60 },
              { id: 'WL-202', position: 2, name: 'Ahmed Hassan', email: 'ahmed.h@uae.net', dateAdded: '2026-02-10', daysWaiting: 41 }
            ]
          }
        ]
      }
    ]
  },
  {
    city: 'London',
    properties: [
      {
        id: 'P-LDN-01',
        name: 'Arrivio Canary Wharf',
        address: '10 Upper Bank St, London E14',
        totalUnits: 35,
        occupiedUnits: 32,
        availableUnits: 3,
        waitingCount: 15,
        units: [
          {
            id: 'U-001',
            name: 'Studio 4B',
            type: 'Studio',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-301', position: 1, name: 'James Hartley', email: 'james.h@london-finance.co.uk', dateAdded: '2026-01-18', daysWaiting: 64 },
              { id: 'WL-302', position: 2, name: 'Hannah Schmidt', email: 'hannah.s@berlin-tech.de', dateAdded: '2026-02-05', daysWaiting: 46 },
              { id: 'WL-303', position: 3, name: 'Kwame Asante', email: 'kwame.a@accra-ops.com', dateAdded: '2026-02-12', daysWaiting: 39 }
            ]
          }
        ]
      },
      {
        id: 'P-LDN-02',
        name: 'Arrivio Shoreditch',
        address: '25-27 Hackney Rd, London E2',
        totalUnits: 24,
        occupiedUnits: 22,
        availableUnits: 2,
        waitingCount: 5,
        units: [
          {
            id: 'U-005',
            name: '1BR 5E',
            type: '1BR',
            status: 'Occupied',
            waitlist: [
              { id: 'WL-401', position: 1, name: 'Sophie Laurent', email: 'sophie.l@paris-design.fr', dateAdded: '2026-02-18', daysWaiting: 33 }
            ]
          }
        ]
      }
    ]
  }
];

export const mockWaitlist = waitlistProperties.flatMap(c => c.properties.flatMap(p => p.units.flatMap(u => u.waitlist.map(w => ({ ...w, property: p.name, unit: u.name, city: c.city, unitType: u.type })))));

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
  Pending:         { count:5, color:'#f59e0b', statusKey: 'Pending' },
  'In Review':     { count:4, color:'#3b82f6', statusKey: 'In Review' },
  Approved:        { count:3, color:'#10b981', statusKey: 'Approved' },
  Rejected:        { count:1, color:'#ef4444', statusKey: 'Rejected' },
  'Action Required':{ count:2, color:'#f97316', statusKey: 'Action Required' },
};
