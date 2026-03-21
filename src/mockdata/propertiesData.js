export const mockCities = [
  { id: 'city1', name: 'London', country: 'United Kingdom', properties: 4, units: 124, status: 'Active', manager: 'Sarah Jenkins' },
  { id: 'city2', name: 'Berlin', country: 'Germany', properties: 2, units: 48, status: 'Active', manager: 'Michael Chen' },
  { id: 'city3', name: 'Tokyo', country: 'Japan', properties: 1, units: 32, status: 'Coming Soon', manager: 'Aarav Mehta' },
  { id: 'city4', name: 'Paris', country: 'France', properties: 0, units: 0, status: 'Offline', manager: 'None' },
];

export const mockUnitTypes = [
  { id: 'type1', name: 'Studio', description: 'Self-contained single room unit with integrated kitchenette and ensuite.', size: '22-28 sqm', amenities: ['WiFi', 'Kitchenette', 'Ensuite'] },
  { id: 'type2', name: '1BR Apt', description: 'Deatached bedroom with separate living area and full kitchen.', size: '35-45 sqm', amenities: ['WiFi', 'Kitchen', 'Laundry', 'Ensuite'] },
  { id: 'type3', name: '2BR Apt', description: 'Two separate bedrooms, large living space, suitable for sharers.', size: '55-70 sqm', amenities: ['WiFi', 'Kitchen', 'Laundry', '2 Ensuites'] },
  { id: 'type4', name: 'Ensuite', description: 'Private room with ensuite within a shared cluster flat.', size: '14-18 sqm', amenities: ['WiFi', 'Ensuite', 'Shared Kitchen'] },
];

export const mockAmenities = [
  { id: 'am1', name: 'High-speed WiFi', icon: 'Wifi', usage: 142 },
  { id: 'am2', name: '24/7 Gym', icon: 'Dumbbell', usage: 12 },
  { id: 'am3', name: 'Rooftop Terrace', icon: 'Sunset', usage: 8 },
  { id: 'am4', name: 'Shared Kitchen', icon: 'Utensils', usage: 64 },
  { id: 'am5', name: 'Bike Storage', icon: 'Bike', usage: 15 },
  { id: 'am6', name: 'Co-working Space', icon: 'Laptop', usage: 10 },
  { id: 'am7', name: 'Laundry Room', icon: 'Waves', usage: 120 },
];

export const mockProperties = [
  { 
    id: 'prop1', 
    name: 'Arrivio Aldgate', 
    city: 'London', 
    address: '15 High St, Aldgate, London E1 7PR', 
    units: 42, 
    occupancy: 92, 
    manager: 'Sarah Jenkins',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400',
    inventory: [
      { id: 'u101', type: 'Studio', floor: '1st', price: 1200, status: 'Occupied' },
      { id: 'u102', type: 'Studio', floor: '1st', price: 1200, status: 'Available' },
      { id: 'u103', type: '1BR Apt', floor: '1st', price: 1650, status: 'Maintenance' },
      { id: 'u201', type: '2BR Apt', floor: '2nd', price: 2100, status: 'Occupied' },
    ]
  },
  { 
    id: 'prop2', 
    name: 'Arrivio Shoreditch', 
    city: 'London', 
    address: '88 Curtain Rd, Shoreditch, London EC2A 3AA', 
    units: 32, 
    occupancy: 68, 
    manager: 'Sarah Jenkins',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1449156001931-82830078e877?auto=format&fit=crop&q=80&w=400',
    inventory: []
  },
  { 
    id: 'prop3', 
    name: 'Arrivio Mitte', 
    city: 'Berlin', 
    address: 'Torstrasse 102, 10119 Berlin', 
    units: 24, 
    occupancy: 84, 
    manager: 'Michael Chen',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=400',
    inventory: []
  },
];

export const mockMaintenance = [
  { id: 'm1', property: 'Arrivio Aldgate', unit: '103', issue: 'Leaking Pipe', returnDate: '2026-03-25', status: 'In Progress' },
  { id: 'm2', property: 'Arrivio Mitte', unit: '402', issue: 'AC Failure', returnDate: '2026-03-22', status: 'Waiting Parts' },
  { id: 'm3', property: 'Arrivio Shoreditch', unit: '215', issue: 'Painting', returnDate: '2026-03-23', status: 'Scheduled' },
];

export const mockUpdates = [
  { id: 1, user: 'Sarah J.', action: 'Updated pricing for Studio units', target: 'Arrivio Aldgate', time: '10m ago' },
  { id: 2, user: 'System', action: 'Created new city entry', target: 'Paris', time: '1h ago' },
  { id: 3, user: 'Michael C.', action: 'Added amenity "Pet Friendly"', target: 'Global Library', time: '4h ago' },
  { id: 4, user: 'Sarah J.', action: 'Changed unit 103 status to Maintenance', target: 'Arrivio Aldgate', time: 'Yesterday' },
];
