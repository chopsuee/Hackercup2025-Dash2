'use client';

import dynamic from 'next/dynamic';
import { Terminal } from '@/types';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface MapProps {
  terminals: Terminal[];
  onTerminalSelect: (terminal: Terminal) => void;
}

export default function Map({ terminals, onTerminalSelect }: MapProps) {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={11}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {terminals.map((terminal) => (
          <Marker key={terminal.id} position={terminal.coordinates}>
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    terminal.queueStatus === 'light' ? 'bg-green-500' :
                    terminal.queueStatus === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <h3 className="font-semibold text-sm">{terminal.name}</h3>
                </div>
                <p className="text-xs text-gray-600 mb-2">{terminal.city}</p>
                <div className="text-xs mb-2">Wait: {terminal.estimatedWait}m</div>
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
      </MapContainer>
    </div>
  );
}