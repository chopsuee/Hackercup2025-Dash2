export interface Terminal {
  id: string;
  name: string;
  type: 'bus' | 'jeepney' | 'train' | 'ferry';
  coordinates: [number, number];
  address: string;
  city: string;
  province: string;
  routes: string[];
  queueStatus: 'light' | 'moderate' | 'heavy';
  estimatedWait: number | string;
  totalTravelTime?: string;
  routeDetails?: string;
  lastUpdated: Date;
  capacity: number;
  currentQueue: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  isGuest: boolean;
}

export interface AlternativeTransport {
  type: 'grab' | 'angkas' | 'joyride' | 'habal';
  name: string;
  estimatedCost: string;
  estimatedTime: string;
  deepLink: string;
}