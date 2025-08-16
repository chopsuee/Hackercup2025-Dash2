import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Terminal } from '@/types';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

interface RouteMapProps {
  origin: string;
  destination: string;
  terminals: Terminal[];
  primaryRoute: [number, number][];
  alternativeRoutes: Array<{
    name: string;
    coordinates: [number, number][];
    color: string;
    travelTime: string;
  }>;
  onTerminalSelect: (terminal: Terminal) => void;
}

export default function RouteMap({ 
  origin, 
  destination, 
  terminals, 
  primaryRoute, 
  alternativeRoutes,
  onTerminalSelect 
}: RouteMapProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDE5LjQwMzYgMTkuNDAzNiAyNSAxMi41IDI1QzUuNTk2NDQgMjUgMCAxOS40MDM2IDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiMzMzc0RkYiLz4KPHBhdGggZD0iTTEyLjUgNDFMMTIuNSAyNSIgc3Ryb2tlPSIjMzM3NEZGIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTIuNSIgY3k9IjEyLjUiIHI9IjciIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
        iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDE5LjQwMzYgMTkuNDAzNiAyNSAxMi41IDI1QzUuNTk2NDQgMjUgMCAxOS40MDM2IDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiMzMzc0RkYiLz4KPHBhdGggZD0iTTEyLjUgNDFMMTIuNSAyNSIgc3Ryb2tlPSIjMzM3NEZGIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTIuNSIgY3k9IjEyLjUiIHI9IjciIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
        shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjIwLjUiIGN5PSIzNy41IiByeD0iMTYiIHJ5PSIzLjUiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4K'
      });
    }
  }, []);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[14.5500, 121.0000]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Primary Route */}
        <Polyline
          positions={primaryRoute}
          color="#3b82f6"
          weight={6}
          opacity={0.8}
          smoothFactor={1}
        />
        
        {/* Alternative Routes */}
        {alternativeRoutes.map((route, index) => (
          <Polyline
            key={index}
            positions={route.coordinates}
            color={route.color}
            weight={4}
            opacity={0.6}
            dashArray="10, 10"
            smoothFactor={1}
          />
        ))}
        
        {/* Terminal Markers */}
        {terminals.map((terminal) => (
          <Marker key={terminal.id} position={terminal.coordinates}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-4 rounded-full ${
                    terminal.queueStatus === 'light' ? 'bg-green-500' :
                    terminal.queueStatus === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <h3 className="font-semibold text-sm">{terminal.name}</h3>
                </div>
                <div className="space-y-1 text-xs">
                  <div>Queue: {typeof terminal.estimatedWait === 'string' ? terminal.estimatedWait : `${terminal.estimatedWait}m`}</div>
                  <div className="font-medium">{terminal.totalTravelTime}</div>
                  <div className="text-gray-600">{terminal.routeDetails}</div>
                </div>
                <button
                  onClick={() => onTerminalSelect(terminal)}
                  className="w-full bg-blue-500 text-white text-xs py-1 px-2 rounded mt-2"
                >
                  Select Route
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Route Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-50">
        <h4 className="font-semibold text-sm mb-2">Routes</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500"></div>
            <span>Primary Route</span>
          </div>
          {alternativeRoutes.map((route, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-4 h-1`} style={{ backgroundColor: route.color }}></div>
              <span>{route.name} ({route.travelTime})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}