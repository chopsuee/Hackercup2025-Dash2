'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
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
    <div className="h-full w-full">
      <MapContainer
        center={[14.5500, 121.0000]}
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