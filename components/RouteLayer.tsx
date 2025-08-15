'use client';

import { useEffect } from 'react';
import { Polyline, useMap } from 'react-leaflet';
import { getRouteCoordinates } from '@/lib/routing';

interface RouteLayerProps {
  start: [number, number];
  end: [number, number];
  color?: string;
  onRouteCalculated?: (coordinates: [number, number][]) => void;
}

export default function RouteLayer({ start, end, color = '#3b82f6', onRouteCalculated }: RouteLayerProps) {
  const map = useMap();

  useEffect(() => {
    let mounted = true;

    const calculateRoute = async () => {
      try {
        const coordinates = await getRouteCoordinates(start, end);
        if (mounted) {
          onRouteCalculated?.(coordinates);
          // Fit map to show the route
          const bounds = coordinates.reduce((bounds, coord) => bounds.extend(coord), 
            L.latLngBounds([start, end]));
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      } catch (error) {
        console.error('Route calculation failed:', error);
      }
    };

    calculateRoute();

    return () => {
      mounted = false;
    };
  }, [start, end, map, onRouteCalculated]);

  return (
    <Polyline
      positions={[start, end]}
      color={color}
      weight={4}
      opacity={0.7}
    />
  );
}