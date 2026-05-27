const buildingRevenue = (occupancyRate) => Math.round(150 * (occupancyRate / 100) * 765);
const apartmentRevenue = (apartments) => Math.round(apartments * 3 * 720 * 0.96);

// Community building room mix per Y2 business model: 70% Essential (Single Room),
// 10% Comfort (Shared Room), 20% Studio. Per 150-room building: 105 / 15 / 30.
const buildingBreakdown = (rooms) => {
  const single = Math.round(rooms * 0.7);
  const shared = Math.round(rooms * 0.1);
  return {
    'Single Room': single,
    'Shared Room': shared,
    'Studio': rooms - single - shared,
  };
};

// Apartment portfolio (WG) mix: 50% single / 50% double-occupancy rooms,
// zero studios (studios live in community buildings only).
const apartmentBreakdown = (rooms) => {
  const single = Math.round(rooms / 2);
  return {
    'Single Room': single,
    'Shared Room': rooms - single,
    'Studio': 0,
  };
};

const sampleUnits = (prefix, city) => [
  { id: `${prefix}-01`, type: 'Single Room', floor: 1, status: 'Occupied', rent: 600, amenities: ['Furnished', 'Shared Kitchen'], tenant: { name: 'Sample Resident', company: city, email: 'resident@arrivio.com', phone: '+49 30 000000', moveIn: '2028-06-01', leaseEnd: '2029-05-31' } },
  { id: `${prefix}-02`, type: 'Shared Room', floor: 2, status: 'Occupied', rent: 850, amenities: ['Private Desk', 'Storage'], tenant: { name: 'Sample Resident', company: city, email: 'resident@arrivio.com', phone: '+49 30 000000', moveIn: '2028-06-01', leaseEnd: '2029-05-31' } },
  { id: `${prefix}-03`, type: 'Studio', floor: 3, status: 'Occupied', rent: 1300, amenities: ['Private Kitchenette', 'Ensuite'], tenant: { name: 'Sample Resident', company: city, email: 'resident@arrivio.com', phone: '+49 30 000000', moveIn: '2028-06-01', leaseEnd: '2029-05-31' } },
];

export const mockProperties = [
  { id: 'prop-001', category: 'Community Building', name: 'Arrivio Düsseldorf Flingern', city: 'Düsseldorf', address: 'Flingern-Nord, Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/src/assets/properties/1.jpg', units: sampleUnits('FLG', 'Klinikum Düsseldorf GmbH') },
  { id: 'prop-002', category: 'Community Building', name: 'Arrivio Düsseldorf Oberbilk', city: 'Düsseldorf', address: 'Oberbilk, Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/src/assets/properties/2.jpg', units: sampleUnits('OBK', 'Alloheim Senioren-Residenzen') },
  { id: 'prop-003', category: 'Community Building', name: 'Arrivio Düsseldorf Pempelfort', city: 'Düsseldorf', address: 'Pempelfort, Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/src/assets/properties/3.jpg', units: sampleUnits('PEM', 'Henkel AG & Co. KGaA') },
  { id: 'prop-004', category: 'Community Building', name: 'Arrivio Düsseldorf Bilk', city: 'Düsseldorf', address: 'Bilk, Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/src/assets/properties/4.jpg', units: sampleUnits('BLK', 'Rheinmetall AG') },
  { id: 'prop-005', category: 'Community Building', name: 'Arrivio Köln Ehrenfeld', city: 'Cologne', address: 'Ehrenfeld, Cologne', manager: 'Jonas Reuter', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/src/assets/properties/5.jpg', units: sampleUnits('EHF', 'AHO Germany (International Healthcare)') },
  { id: 'prop-006', category: 'Community Building', name: 'Arrivio Köln Deutz', city: 'Cologne', address: 'Deutz, Cologne', manager: 'Jonas Reuter', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/src/assets/properties/6.jpg', units: sampleUnits('DTZ', 'Universitätsklinikum Köln') },
  { id: 'prop-007', category: 'Community Building', name: 'Arrivio Köln Nippes', city: 'Cologne', address: 'Nippes, Cologne', manager: 'Jonas Reuter', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/src/assets/properties/7.jpg', units: sampleUnits('NIP', 'Universität zu Köln') },
  { id: 'prop-008', category: 'Community Building', name: 'Arrivio Bonn Beuel', city: 'Bonn', address: 'Beuel, Bonn', manager: 'Mina Farouk', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/src/assets/properties/8.jpg', units: sampleUnits('BEU', 'Universität Bonn') },
  { id: 'prop-009', category: 'Community Building', name: 'Arrivio Bonn Endenich', city: 'Bonn', address: 'Endenich, Bonn', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/src/assets/properties/9.jpg', units: sampleUnits('END', 'Uniklinik RWTH Aachen') },
  { id: 'prop-010', category: 'Community Building', name: 'Arrivio Berlin Neukölln', city: 'Berlin', address: 'Neukölln, Berlin', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/src/assets/properties/10.jpg', units: sampleUnits('NEU', 'Vonovia SE (tech staff)') },
  { id: 'prop-011', category: 'Community Building', name: 'Arrivio Berlin Moabit', city: 'Berlin', address: 'Moabit, Berlin', manager: 'Mina Farouk', status: 'Live', occupancyRate: 95, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(95), image: '/src/assets/properties/11.jpg', units: sampleUnits('MOA', 'Grouped Employer Portfolio') },
  { id: 'prop-012', category: 'Community Building', name: 'Arrivio Berlin Friedrichshain', city: 'Berlin', address: 'Friedrichshain, Berlin', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/src/assets/properties/12.jpg', units: sampleUnits('FRH', 'Grouped Employer Portfolio') },
  { id: 'prop-013', category: 'Community Building', name: 'Arrivio München Schwabing', city: 'Munich', address: 'Schwabing, Munich', manager: 'Mina Farouk', status: 'Live', occupancyRate: 95, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(95), image: '/src/assets/properties/13.jpg', units: sampleUnits('SCW', 'Siemens Healthineers AG') },
  { id: 'prop-014', category: 'Community Building', name: 'Arrivio München Giesing', city: 'Munich', address: 'Giesing, Munich', manager: 'Mina Farouk', status: 'Live', occupancyRate: 95, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(95), image: '/src/assets/properties/14.jpg', units: sampleUnits('GSG', 'Grouped Employer Portfolio') },
  { id: 'prop-015', category: 'Community Building', name: 'Arrivio Hamburg Altona', city: 'Hamburg', address: 'Altona, Hamburg', manager: 'Mina Farouk', status: 'Live', occupancyRate: 94, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(94), image: '/src/assets/properties/15.jpg', units: sampleUnits('ALT', 'Grouped Employer Portfolio') },
  { id: 'prop-016', category: 'Community Building', name: 'Arrivio Frankfurt Sachsenhausen', city: 'Frankfurt', address: 'Sachsenhausen, Frankfurt', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/src/assets/properties/16.jpg', units: sampleUnits('SAC', 'Deutsche Bahn Engineering') },
  { id: 'apt-001', category: 'Apartment Portfolio', name: 'Düsseldorf apartment portfolio', city: 'Düsseldorf', address: '80 leased apartments across Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 96, apartments: 80, rooms: 240, unitBreakdown: apartmentBreakdown(240), monthlyRevenue: apartmentRevenue(80), image: '/src/assets/properties/17.jpg', units: sampleUnits('ADU', 'Direct B2C') },
  { id: 'apt-002', category: 'Apartment Portfolio', name: 'Cologne apartment portfolio', city: 'Cologne', address: '60 leased apartments across Cologne', manager: 'Jonas Reuter', status: 'Live', occupancyRate: 96, apartments: 60, rooms: 180, unitBreakdown: apartmentBreakdown(180), monthlyRevenue: apartmentRevenue(60), image: '/src/assets/properties/18.jpg', units: sampleUnits('ACG', 'Direct B2C') },
  { id: 'apt-003', category: 'Apartment Portfolio', name: 'Bonn apartment portfolio', city: 'Bonn', address: '40 leased apartments across Bonn', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, apartments: 40, rooms: 120, unitBreakdown: apartmentBreakdown(120), monthlyRevenue: apartmentRevenue(40), image: '/src/assets/properties/19.jpg', units: sampleUnits('ABO', 'Direct B2C') },
  { id: 'apt-004', category: 'Apartment Portfolio', name: 'Aachen apartment portfolio', city: 'Aachen', address: '30 leased apartments across Aachen', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, apartments: 30, rooms: 90, unitBreakdown: apartmentBreakdown(90), monthlyRevenue: apartmentRevenue(30), image: '/src/assets/properties/20.jpg', units: sampleUnits('AAC', 'Direct B2C') },
  { id: 'apt-005', category: 'Apartment Portfolio', name: 'Berlin apartment portfolio', city: 'Berlin', address: '20 leased apartments across Berlin', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, apartments: 20, rooms: 60, unitBreakdown: apartmentBreakdown(60), monthlyRevenue: apartmentRevenue(20), image: '/src/assets/properties/21.jpg', units: sampleUnits('ABE', 'Direct B2C') },
  { id: 'apt-006', category: 'Apartment Portfolio', name: 'Munich apartment portfolio', city: 'Munich', address: '10 leased apartments across Munich', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, apartments: 10, rooms: 30, unitBreakdown: apartmentBreakdown(30), monthlyRevenue: apartmentRevenue(10), image: '/src/assets/properties/22.jpg', units: sampleUnits('AMU', 'Direct B2C') },
];

export const mockCities = [
  { id: 'city-001', name: 'Düsseldorf', country: 'Germany', properties: 5, units: 840, manager: 'Lea Hoffmann', status: 'Active', occupancy: 96.5, revenue: 596534 },
  { id: 'city-002', name: 'Cologne', country: 'Germany', properties: 4, units: 630, manager: 'Jonas Reuter', status: 'Active', occupancy: 96.5, revenue: 447974 },
  { id: 'city-003', name: 'Bonn', country: 'Germany', properties: 3, units: 420, manager: 'Mina Farouk', status: 'Active', occupancy: 96.5, revenue: 298267 },
  { id: 'city-004', name: 'Aachen', country: 'Germany', properties: 1, units: 90, manager: 'Mina Farouk', status: 'Active', occupancy: 96, revenue: 61042 },
  { id: 'city-005', name: 'Berlin', country: 'Germany', properties: 4, units: 510, manager: 'Mina Farouk', status: 'Active', occupancy: 95.8, revenue: 353962 },
  { id: 'city-006', name: 'Frankfurt', country: 'Germany', properties: 1, units: 150, manager: 'Mina Farouk', status: 'Active', occupancy: 96, revenue: 103275 },
  { id: 'city-007', name: 'Hamburg', country: 'Germany', properties: 1, units: 150, manager: 'Mina Farouk', status: 'Active', occupancy: 94, revenue: 100980 },
  { id: 'city-008', name: 'Munich', country: 'Germany', properties: 3, units: 330, manager: 'Mina Farouk', status: 'Active', occupancy: 95, revenue: 225750 },
];

export const mockMaintenance = [
  { id: 'MT-101', propertyId: 'prop-015', unitId: 'ALT-03', issue: 'Ventilation service in shared kitchen', priority: 'medium', status: 'scheduled', date: '2028-06-24' },
  { id: 'MT-102', propertyId: 'apt-002', unitId: 'ACG-02', issue: 'Turnover repaint between tenant cycles', priority: 'low', status: 'planned', date: '2028-06-27' },
];

export const mockUpdates = [
  { id: 'UP-001', property: 'Arrivio Berlin Neukölln', type: 'Occupancy', message: 'Reached 96% occupancy after June move-ins.', time: '1h ago' },
  { id: 'UP-002', property: 'Düsseldorf apartment portfolio', type: 'Revenue', message: 'Closed the month at 96% occupancy and €165,888 run-rate revenue.', time: '3h ago' },
];

export const mockHouseOps = {
  liveHouses: 16,
  housesOnboarding: 2,
  housesUnderRenovation: 1,
  averageHouseAgeMonths: 11,
  openOperationalTickets: 7,
  servicePartnersConnected: 9,
};

export const properties = mockProperties;

export const mockUnitTypes = [
  { id: 'ut-essential', name: 'Essential Room', count: 1680, avgRent: 600, size: '14-18 sqm', amenities: ['Furnished', 'Shared Kitchen'] },
  { id: 'ut-comfort', name: 'Comfort Room', count: 240, avgRent: 850, size: '18-22 sqm', amenities: ['Desk', 'Storage'] },
  { id: 'ut-studio', name: 'Studio', count: 480, avgRent: 1300, size: '22-28 sqm', amenities: ['Kitchenette', 'Ensuite'] },
  { id: 'ut-apartment-room', name: 'Apartment Room', count: 720, avgRent: 720, size: '12-18 sqm', amenities: ['Shared Flat', 'Warm Rent'] },
];

export const mockAmenities = [
  { id: 'am-wifi', name: 'High Speed Wifi', icon: 'Wifi', category: 'Connectivity' },
  { id: 'am-reg', name: 'Registration Support', icon: 'FileBadge', category: 'Settlement' },
  { id: 'am-ins', name: 'Insurance Setup', icon: 'Shield', category: 'Settlement' },
  { id: 'am-clean', name: 'Turnover Cleaning', icon: 'Sparkles', category: 'Operations' },
  { id: 'am-furn', name: 'Fully Furnished', icon: 'Sofa', category: 'Comfort' },
  { id: 'am-key', name: 'Move-in Coordination', icon: 'KeyRound', category: 'Operations' },
];
