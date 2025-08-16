import { Terminal } from '@/types';

export const philippineTerminals: Terminal[] = [
  {
    id: 'pitx',
    name: 'PITX',
    type: 'bus',
    coordinates: [14.4796, 120.9962],
    address: 'Dr. A. Santos Avenue, Parañaque',
    city: 'Parañaque',
    province: 'Metro Manila',
    routes: ['Vito Cruz LRT-1 → PITX → Indang Bus Gate 1'],
    queueStatus: 'heavy',
    estimatedWait: '1.5-2 hrs',
    totalTravelTime: '3-4 hrs',
    routeDetails: 'Vito Cruz Station LRT-1 > PITX Station > Indang Bus at Gate 1',
    lastUpdated: new Date(),
    capacity: 800,
    currentQueue: 650
  },
  {
    id: 'baclaran',
    name: 'Baclaran',
    type: 'bus',
    coordinates: [14.5085, 120.9937],
    address: 'Roxas Boulevard, Parañaque',
    city: 'Parañaque',
    province: 'Metro Manila',
    routes: ['Vito Cruz LRT-1 → Baclaran → Van to Trece → Indang'],
    queueStatus: 'moderate',
    estimatedWait: 20,
    totalTravelTime: '2.5 hrs',
    routeDetails: 'Vito Cruz Station LRT-1 > Baclaran Station > Van to Trece > Jeep/Bus to Indang',
    lastUpdated: new Date(),
    capacity: 400,
    currentQueue: 200
  },
  {
    id: 'p2p-trece',
    name: 'P2P Bus (To Trece)',
    type: 'bus',
    coordinates: [14.5649, 120.9934],
    address: 'Near De La Salle University',
    city: 'Manila',
    province: 'Metro Manila',
    routes: ['Direct P2P Bus to Trece'],
    queueStatus: 'moderate',
    estimatedWait: 'Varies',
    totalTravelTime: '3 hrs',
    routeDetails: 'P2P Bus (inconsistent schedule) > Trece > Jeep/Bus to Indang',
    lastUpdated: new Date(),
    capacity: 50,
    currentQueue: 25
  },
  {
    id: 'alabang',
    name: 'Alabang',
    type: 'bus',
    coordinates: [14.4198, 121.0390],
    address: 'Alabang-Zapote Road, Muntinlupa',
    city: 'Muntinlupa',
    province: 'Metro Manila',
    routes: ['Bus to Alabang → Dasma → Indang'],
    queueStatus: 'light',
    estimatedWait: 15,
    totalTravelTime: '3.5-4 hrs',
    routeDetails: 'Bus to Alabang (1.5-2hrs) > Bus/Jeep to Dasma (1hr) > Jeep/Bus to Indang (1hr)',
    lastUpdated: new Date(),
    capacity: 350,
    currentQueue: 120
  }
];

export const rushHourPatterns = {
  morning: { start: 6, end: 9, multiplier: 2.5 },
  evening: { start: 17, end: 20, multiplier: 3.0 },
  weekend: { multiplier: 0.7 }
};