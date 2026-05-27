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

// Rent + amenity profile per room type.
const ROOM_PROFILE = {
  'Single Room': { rent: 600, amenities: ['Furnished', 'Shared Kitchen'] },
  'Shared Room': { rent: 850, amenities: ['Furnished', 'Private Desk', 'Storage'] },
  'Studio':       { rent: 1300, amenities: ['Private Kitchenette', 'Ensuite'] },
};

// Generate the full unit list for a property. The number of units equals
// `rooms`. Statuses are distributed deterministically so the metric counts
// reconcile with occupancyRate.
const generateUnits = (prefix, breakdown, rooms, occupancyRate, partnerName) => {
  const occupied = Math.round((rooms * occupancyRate) / 100);
  const nonOccupied = rooms - occupied;
  const reserved = Math.round(nonOccupied * 0.5);
  const maintenance = Math.max(0, Math.floor(nonOccupied * 0.25));
  const available = Math.max(0, nonOccupied - reserved - maintenance);

  const statusPool = [
    ...Array(occupied).fill('Occupied'),
    ...Array(reserved).fill('Reserved'),
    ...Array(maintenance).fill('Maintenance'),
    ...Array(available).fill('Available'),
  ];
  while (statusPool.length < rooms) statusPool.push('Available');
  statusPool.length = rooms;

  const units = [];
  let idx = 0;
  Object.entries(breakdown).forEach(([type, count]) => {
    const { rent, amenities } = ROOM_PROFILE[type];
    for (let i = 0; i < count; i++) {
      idx += 1;
      const status = statusPool[idx - 1];
      units.push({
        id: `${prefix}-${String(idx).padStart(3, '0')}`,
        type,
        floor: Math.max(1, Math.ceil(idx / 12)),
        status,
        rent,
        amenities,
        tenant:
          status === 'Occupied'
            ? {
                name: 'Sample Resident',
                company: partnerName,
                email: `resident.${idx}@arrivio.com`,
                phone: '+49 30 000000',
                moveIn: '2028-06-01',
                leaseEnd: '2029-05-31',
              }
            : null,
      });
    }
  });
  return units;
};

const mockPropertiesRaw = [
  { id: 'prop-001', category: 'Community Building', name: 'Arrivio Düsseldorf Flingern', city: 'Düsseldorf', address: 'Flingern-Nord, Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/properties/1.jpg', prefix: 'FLG' },
  { id: 'prop-002', category: 'Community Building', name: 'Arrivio Düsseldorf Oberbilk', city: 'Düsseldorf', address: 'Oberbilk, Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/properties/2.jpg', prefix: 'OBK' },
  { id: 'prop-003', category: 'Community Building', name: 'Arrivio Düsseldorf Pempelfort', city: 'Düsseldorf', address: 'Pempelfort, Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/properties/3.jpg', prefix: 'PEM' },
  { id: 'prop-004', category: 'Community Building', name: 'Arrivio Düsseldorf Bilk', city: 'Düsseldorf', address: 'Bilk, Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/properties/4.jpg', prefix: 'BLK' },
  { id: 'prop-005', category: 'Community Building', name: 'Arrivio Köln Ehrenfeld', city: 'Cologne', address: 'Ehrenfeld, Cologne', manager: 'Jonas Reuter', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/properties/5.jpg', prefix: 'EHF' },
  { id: 'prop-006', category: 'Community Building', name: 'Arrivio Köln Deutz', city: 'Cologne', address: 'Deutz, Cologne', manager: 'Jonas Reuter', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/properties/6.jpg', prefix: 'DTZ' },
  { id: 'prop-007', category: 'Community Building', name: 'Arrivio Köln Nippes', city: 'Cologne', address: 'Nippes, Cologne', manager: 'Jonas Reuter', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/properties/7.jpg', prefix: 'NIP' },
  { id: 'prop-008', category: 'Community Building', name: 'Arrivio Bonn Beuel', city: 'Bonn', address: 'Beuel, Bonn', manager: 'Mina Farouk', status: 'Live', occupancyRate: 97, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(97), image: '/properties/8.jpg', prefix: 'BEU' },
  { id: 'prop-009', category: 'Community Building', name: 'Arrivio Bonn Endenich', city: 'Bonn', address: 'Endenich, Bonn', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/properties/9.jpg', prefix: 'END' },
  { id: 'prop-010', category: 'Community Building', name: 'Arrivio Berlin Neukölln', city: 'Berlin', address: 'Neukölln, Berlin', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/properties/10.jpg', prefix: 'NEU' },
  { id: 'prop-011', category: 'Community Building', name: 'Arrivio Berlin Moabit', city: 'Berlin', address: 'Moabit, Berlin', manager: 'Mina Farouk', status: 'Live', occupancyRate: 95, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(95), image: '/properties/11.jpg', prefix: 'MOA' },
  { id: 'prop-012', category: 'Community Building', name: 'Arrivio Berlin Friedrichshain', city: 'Berlin', address: 'Friedrichshain, Berlin', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/properties/12.jpg', prefix: 'FRH' },
  { id: 'prop-013', category: 'Community Building', name: 'Arrivio München Schwabing', city: 'Munich', address: 'Schwabing, Munich', manager: 'Mina Farouk', status: 'Live', occupancyRate: 95, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(95), image: '/properties/13.jpg', prefix: 'SCW' },
  { id: 'prop-014', category: 'Community Building', name: 'Arrivio München Giesing', city: 'Munich', address: 'Giesing, Munich', manager: 'Mina Farouk', status: 'Live', occupancyRate: 95, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(95), image: '/properties/14.jpg', prefix: 'GSG' },
  { id: 'prop-015', category: 'Community Building', name: 'Arrivio Hamburg Altona', city: 'Hamburg', address: 'Altona, Hamburg', manager: 'Mina Farouk', status: 'Live', occupancyRate: 94, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(94), image: '/properties/15.jpg', prefix: 'ALT' },
  { id: 'prop-016', category: 'Community Building', name: 'Arrivio Frankfurt Sachsenhausen', city: 'Frankfurt', address: 'Sachsenhausen, Frankfurt', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, rooms: 150, unitBreakdown: buildingBreakdown(150), monthlyRevenue: buildingRevenue(96), image: '/properties/16.jpg', prefix: 'SAC' },
  { id: 'apt-001', category: 'Apartment Portfolio', name: 'Düsseldorf apartment portfolio', city: 'Düsseldorf', address: '80 leased apartments across Düsseldorf', manager: 'Lea Hoffmann', status: 'Live', occupancyRate: 96, apartments: 80, rooms: 240, unitBreakdown: apartmentBreakdown(240), monthlyRevenue: apartmentRevenue(80), image: '/properties/17.jpg', prefix: 'ADU' },
  { id: 'apt-002', category: 'Apartment Portfolio', name: 'Cologne apartment portfolio', city: 'Cologne', address: '60 leased apartments across Cologne', manager: 'Jonas Reuter', status: 'Live', occupancyRate: 96, apartments: 60, rooms: 180, unitBreakdown: apartmentBreakdown(180), monthlyRevenue: apartmentRevenue(60), image: '/properties/18.jpg', prefix: 'ACG' },
  { id: 'apt-003', category: 'Apartment Portfolio', name: 'Bonn apartment portfolio', city: 'Bonn', address: '40 leased apartments across Bonn', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, apartments: 40, rooms: 120, unitBreakdown: apartmentBreakdown(120), monthlyRevenue: apartmentRevenue(40), image: '/properties/19.jpg', prefix: 'ABO' },
  { id: 'apt-004', category: 'Apartment Portfolio', name: 'Aachen apartment portfolio', city: 'Aachen', address: '30 leased apartments across Aachen', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, apartments: 30, rooms: 90, unitBreakdown: apartmentBreakdown(90), monthlyRevenue: apartmentRevenue(30), image: '/properties/20.jpg', prefix: 'AAC' },
  { id: 'apt-005', category: 'Apartment Portfolio', name: 'Berlin apartment portfolio', city: 'Berlin', address: '20 leased apartments across Berlin', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, apartments: 20, rooms: 60, unitBreakdown: apartmentBreakdown(60), monthlyRevenue: apartmentRevenue(20), image: '/properties/21.jpg', prefix: 'ABE' },
  { id: 'apt-006', category: 'Apartment Portfolio', name: 'Munich apartment portfolio', city: 'Munich', address: '10 leased apartments across Munich', manager: 'Mina Farouk', status: 'Live', occupancyRate: 96, apartments: 10, rooms: 30, unitBreakdown: apartmentBreakdown(30), monthlyRevenue: apartmentRevenue(10), image: '/properties/22.jpg', prefix: 'AMU' },
];

// Attach a fully-populated `units` array to each property. The unit count
// equals `rooms`, statuses are distributed to reconcile with occupancyRate,
// and tenant info is populated only on Occupied rooms.
export const mockProperties = mockPropertiesRaw.map((property) => ({
  ...property,
  units: generateUnits(
    property.prefix,
    property.unitBreakdown,
    property.rooms,
    property.occupancyRate,
    property.manager,
  ),
}));

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
