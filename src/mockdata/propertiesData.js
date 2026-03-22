export const mockProperties = [
  {
    id: 'prop-001',
    name: 'The Grand Résidence',
    city: 'Berlin',
    address: 'Kurfürstendamm 21, 10719 Berlin',
    manager: 'Sarah Ahmed',
    status: 'active',
    occupancyRate: 92,
    image: '/src/assets/properties/1.jpg',
    units: [
      {
        id: '101',
        type: 'Studio',
        floor: 1,
        status: 'Occupied',
        rent: 4500,
        amenities: ['Balcony', 'City View', 'High Speed Wifi'],
        tenant: {
          name: 'John Doe',
          company: 'Tech Solutions LLC',
          email: 'john.doe@techsolutions.com',
          phone: '+971 50 123 4567',
          moveIn: '2023-11-15',
          leaseEnd: '2024-11-14'
        }
      },
      {
        id: '202',
        type: '1BR',
        floor: 2,
        status: 'Occupied',
        rent: 6200,
        amenities: ['Private Pool', 'Gym Access', 'Smart Home'],
        tenant: {
          name: 'Emma Wilson',
          company: 'Global Marketing',
          email: 'emma.wilson@globalmkt.com',
          phone: '+971 55 987 6543',
          moveIn: '2024-01-10',
          leaseEnd: '2025-01-09'
        }
      },
      {
        id: '305',
        type: '2BR',
        floor: 3,
        status: 'Available',
        rent: 8500,
        amenities: ['Sea View', 'Fully Furnished', 'Parking'],
        tenant: null
      },
      {
        id: '401',
        type: 'Ensuite',
        floor: 4,
        status: 'Reserved',
        rent: 3800,
        amenities: ['Private Bathroom', 'Shared Kitchen'],
        tenant: null
      },
      {
        id: '502',
        type: 'Studio',
        floor: 5,
        status: 'Maintenance',
        rent: 4400,
        amenities: ['Renovated', 'New Appliances'],
        tenant: null
      },
      {
        id: '603',
        type: '3BR',
        floor: 6,
        status: 'Occupied',
        rent: 6500,
        amenities: ['Balcony', 'Gym Access'],
        tenant: {
          name: 'Ahmed Hassan',
          company: 'Emirates Group',
          email: 'ahmed.h@emirates.com',
          phone: '+971 52 444 5566',
          moveIn: '2023-08-20',
          leaseEnd: '2024-08-19'
        }
      }
    ]
  },
  {
    id: 'prop-002',
    name: 'Skyline Lofts',
    city: 'Munich',
    address: 'Maximilianstraße 15, 80539 München',
    manager: 'James Smith',
    status: 'partial',
    occupancyRate: 85,
    image: '/src/assets/properties/2.jpg',
    units: [
      {
        id: '10A',
        type: 'Studio',
        floor: 10,
        status: 'Occupied',
        rent: 1800,
        amenities: ['River View', 'Underfloor Heating'],
        tenant: {
          name: 'Lucy Chen',
          company: 'Barclays',
          email: 'lucy.chen@barclays.com',
          phone: '+44 7712 345678',
          moveIn: '2024-02-01',
          leaseEnd: '2025-01-31'
        }
      },
      {
        id: '01B',
        type: 'Shared',
        floor: 0,
        status: 'Available',
        rent: 950,
        amenities: ['High Speed Internet', 'Utility Bills Included'],
        tenant: null
      },
      {
        id: '15C',
        type: '1BR',
        floor: 15,
        status: 'Occupied',
        rent: 2400,
        amenities: ['Dishwasher', 'Concierge Service'],
        tenant: {
          name: 'Robert Brown',
          company: 'JP Morgan',
          email: 'robert.brown@jpmorgan.com',
          phone: '+44 7823 456789',
          moveIn: '2023-09-15',
          leaseEnd: '2024-09-14'
        }
      },
      {
        id: '02G',
        type: '2BR',
        floor: 0,
        status: 'Occupied',
        rent: 3200,
        amenities: ['Garden Access', 'Pet Friendly'],
        tenant: {
          name: 'Alice Cooper',
          company: 'Self-Employed',
          email: 'alice.c@gmail.com',
          phone: '+44 7934 567890',
          moveIn: '2023-12-05',
          leaseEnd: '2024-12-04'
        }
      },
      {
        id: '12D',
        type: '3BR',
        floor: 12,
        status: 'Reserved',
        rent: 1900,
        amenities: ['Balcony', 'Modern Kitchen'],
        tenant: null
      }
    ]
  },
  {
    id: 'prop-003',
    name: 'River View Suites',
    city: 'Hamburg',
    address: 'HafenCity, 20457 Hamburg',
    manager: 'Li Wei',
    status: 'active',
    occupancyRate: 95,
    image: '/src/assets/properties/3.jpg',
    units: [
      {
        id: 'B1-05',
        type: 'Shared',
        floor: 1,
        status: 'Occupied',
        rent: 1200,
        amenities: ['Fully Furnished', 'Central AC'],
        tenant: {
          name: 'Tan Mei Ling',
          company: 'DBS Bank',
          email: 'meiling.tan@dbs.com',
          phone: '+65 9123 4567',
          moveIn: '2024-03-01',
          leaseEnd: '2025-02-28'
        }
      },
      {
        id: 'B5-12',
        type: 'Ensuite',
        floor: 5,
        status: 'Occupied',
        rent: 2100,
        amenities: ['Private Balcony', 'Weekly Cleaning'],
        tenant: {
          name: 'Kevin Lam',
          company: 'Grab Holdings',
          email: 'kevin.lam@grab.com',
          phone: '+65 8234 5678',
          moveIn: '2023-12-20',
          leaseEnd: '2024-12-19'
        }
      },
      {
        id: 'B2-02',
        type: 'Studio',
        floor: 2,
        status: 'Occupied',
        rent: 3500,
        amenities: ['Infinity Pool Access', 'Gym Membership'],
        tenant: {
          name: 'Jessica Ong',
          company: 'TikTok Technology',
          email: 'jessica.o@tiktok.com',
          phone: '+65 9345 6789',
          moveIn: '2024-01-15',
          leaseEnd: '2025-01-14'
        }
      },
      {
        id: 'B8-01',
        type: '2BR',
        floor: 8,
        status: 'Occupied',
        rent: 5800,
        amenities: ['High Floor', 'Premium Appliances', 'Walk-in Wardrobe'],
        tenant: {
          name: 'David Lee',
          company: 'GIC Private Limited',
          email: 'david.lee@gic.com.sg',
          phone: '+65 8456 7890',
          moveIn: '2023-10-01',
          leaseEnd: '2024-09-30'
        }
      },
      {
        id: 'B3-04',
        type: '3BR',
        floor: 3,
        status: 'Available',
        rent: 4200,
        amenities: ['City View', 'Balcony'],
        tenant: null
      }
    ]
  }
];

export const mockCities = [
  { name: 'Aachen', properties: 12, occupancy: 94, revenue: 125000 },
  { name: 'Berlin', properties: 45, occupancy: 92, revenue: 450000 },
  { name: 'Bonn', properties: 8, occupancy: 88, revenue: 95000 },
  { name: 'Cologne', properties: 22, occupancy: 90, revenue: 210000 },
  { name: 'Dusseldorf', properties: 18, occupancy: 92, revenue: 185000 },
  { name: 'Frankfurt', properties: 30, occupancy: 94, revenue: 320000 },
  { name: 'Hamburg', properties: 28, occupancy: 95, revenue: 290000 },
  { name: 'Munich', properties: 35, occupancy: 85, revenue: 380000 }
];

export const mockMaintenance = [
  { id: 'MT-101', propertyId: 'prop-001', unitId: '502', issue: 'AC Leak', priority: 'high', status: 'pending', date: '2024-03-20' },
  { id: 'MT-102', propertyId: 'prop-002', unitId: '10A', issue: 'Loose Tile', priority: 'low', status: 'in-progress', date: '2024-03-21' },
];

export const mockUpdates = [
  { id: 'UP-001', property: 'The Grand Résidence', type: 'Move-in', message: 'New tenant in Unit 202', time: '2h ago' },
  { id: 'UP-002', property: 'London Skyline Lofts', type: 'Payment', message: 'Rent received for Unit 15C', time: '5h ago' },
];

// Add alias for backward compatibility with my previous implementation
export const properties = mockProperties;

export const mockUnitTypes = [
  { id: 'ut-stud', name: 'Studio Loft', count: 12, avgRent: 1500, size: '350-450 sqft', amenities: ['Kitchenette', 'Open Plan'] },
  { id: 'ut-1br', name: '1BR Standard', count: 24, avgRent: 2200, size: '600-750 sqft', amenities: ['Full Kitchen', 'Separate Bedroom'] },
  { id: 'ut-2br', name: '2BR Premium', count: 8, avgRent: 3500, size: '950-1100 sqft', amenities: ['Balcony', 'Ensuite Master'] },
  { id: 'ut-ens', name: 'Ensuite Room', count: 40, avgRent: 950, size: '180-220 sqft', amenities: ['Private Bath', 'Shared Kitchen'] }
];

export const mockAmenities = [
  { id: 'am-wifi', name: 'High Speed Wifi', icon: 'Wifi', category: 'Connectivity' },
  { id: 'am-gym', name: '24/7 Gym', icon: 'Dumbbell', category: 'Wellness' },
  { id: 'am-pool', name: 'Infinity Pool', icon: 'Waves', category: 'Wellness' },
  { id: 'am-park', name: 'Secure Parking', icon: 'Car', category: 'Utility' },
  { id: 'am-cln', name: 'Weekly Cleaning', icon: 'Sparkles', category: 'Service' },
  { id: 'am-sec', name: 'CCTV Security', icon: 'Shield', category: 'Safety' },
  { id: 'am-ac', name: 'Central AC', icon: 'Wind', category: 'Comfort' },
  { id: 'am-kit', name: 'Fully Equipped Kitchen', icon: 'CookingPot', category: 'Comfort' }
];
