'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Terminal } from '@/types';
import { getQueueColor } from '@/lib/utils';
import { calculateDistance } from '@/lib/routing';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  terminals: Terminal[];
  onTerminalSelect: (terminal: Terminal) => void;
  center: [number, number];
  userLocation?: [number, number];
  showRoute?: Terminal | null;
}

export default function MapView({ terminals, onTerminalSelect, center, userLocation, showRoute }: MapViewProps) {
  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      

      
      {/* Terminals */}
      {terminals.map((terminal) => (
        <Marker
          key={terminal.id}
          position={terminal.coordinates}
          eventHandlers={{
            click: () => onTerminalSelect(terminal),
          }}
        >
          <Popup>
            <div className="p-2">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${getQueueColor(terminal.queueStatus)}`} />
                <h3 className="font-semibold text-sm">{terminal.name}</h3>
              </div>
              <p className="text-xs text-gray-600 mb-2">{terminal.city}</p>
              <div className="text-xs mb-2">
                Wait: {terminal.estimatedWait}m
              </div>
              <button
                onClick={() => onTerminalSelect(terminal)}
                className="w-full bg-blue-500 text-white text-xs py-1 px-2 rounded"
              >
                Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* Route line */}
      {showRoute && userLocation && (
        <Polyline
          positions={[userLocation, showRoute.coordinates]}
          color="#3b82f6"
          weight={4}
          opacity={0.7}
        />
      )}
    </MapContainer>
  );
}