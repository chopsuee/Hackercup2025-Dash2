'use client';

import dynamic from 'next/dynamic';
import { Terminal } from '@/types';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false
});

interface DynamicMapProps {
  terminals: Terminal[];
  onTerminalSelect: (terminal: Terminal) => void;
  center: [number, number];
  userLocation?: [number, number];
  showRoute?: Terminal | null;
}

export default function DynamicMap(props: DynamicMapProps) {
  return (
    <div className="h-full w-full">
      <MapView {...props} />
    </div>
  );
}