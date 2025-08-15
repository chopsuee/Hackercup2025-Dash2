import { Terminal } from '@/types';

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function estimateTravelTime(distance: number, mode: 'walking' | 'driving' = 'driving'): number {
  const speed = mode === 'walking' ? 5 : 30; // km/h
  return Math.round((distance / speed) * 60); // minutes
}

export function findNearestAlternatives(
  userLat: number, 
  userLon: number, 
  terminals: Terminal[], 
  excludeId?: string
): Array<Terminal & { distance: number; travelTime: number }> {
  return terminals
    .filter(t => t.id !== excludeId)
    .map(terminal => {
      const distance = calculateDistance(userLat, userLon, terminal.coordinates[0], terminal.coordinates[1]);
      const travelTime = estimateTravelTime(distance);
      return { ...terminal, distance, travelTime };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);
}

export async function getRouteCoordinates(
  start: [number, number], 
  end: [number, number]
): Promise<[number, number][]> {
  // Return straight line for now to avoid API issues
  return [start, end];
}