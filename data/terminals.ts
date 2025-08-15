import { Terminal } from '@/types';

export const philippineTerminals: Terminal[] = [
  {
    id: 'edsa-cubao',
    name: 'EDSA-Cubao Terminal',
    type: 'bus',
    coordinates: [14.6217, 121.0512],
    address: 'EDSA corner New York Street, Cubao',
    city: 'Quezon City',
    province: 'Metro Manila',
    routes: ['North Luzon', 'Baguio', 'Pangasinan'],
    queueStatus: 'moderate',
    estimatedWait: 25,
    lastUpdated: new Date(),
    capacity: 500,
    currentQueue: 180
  },
  {
    id: 'pitx',
    name: 'PITX',
    type: 'bus',
    coordinates: [14.4796, 120.9962],
    address: 'Dr. A. Santos Avenue, Parañaque',
    city: 'Parañaque',
    province: 'Metro Manila',
    routes: ['CALABARZON', 'Batangas', 'Laguna'],
    queueStatus: 'heavy',
    estimatedWait: 45,
    lastUpdated: new Date(),
    capacity: 800,
    currentQueue: 650
  },
  {
    id: 'mrt-north',
    name: 'MRT North Avenue',
    type: 'train',
    coordinates: [14.6563, 121.0321],
    address: 'North Avenue, Quezon City',
    city: 'Quezon City',
    province: 'Metro Manila',
    routes: ['MRT Line 3'],
    queueStatus: 'light',
    estimatedWait: 5,
    lastUpdated: new Date(),
    capacity: 1000,
    currentQueue: 150
  },
  {
    id: 'lrt-baclaran',
    name: 'LRT Baclaran',
    type: 'train',
    coordinates: [14.5085, 120.9937],
    address: 'Roxas Boulevard, Parañaque',
    city: 'Parañaque',
    province: 'Metro Manila',
    routes: ['LRT Line 1'],
    queueStatus: 'moderate',
    estimatedWait: 15,
    lastUpdated: new Date(),
    capacity: 800,
    currentQueue: 320
  }
];

export const rushHourPatterns = {
  morning: { start: 6, end: 9, multiplier: 2.5 },
  evening: { start: 17, end: 20, multiplier: 3.0 },
  weekend: { multiplier: 0.7 }
};