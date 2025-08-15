'use client';

import { Terminal } from '@/types';

interface SimpleMapProps {
  terminals: Terminal[];
  onTerminalSelect: (terminal: Terminal) => void;
}

export default function SimpleMap({ terminals, onTerminalSelect }: SimpleMapProps) {
  return (
    <div className="h-full bg-gray-100 p-4">
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🗺️</div>
        <h3 className="text-lg font-semibold mb-4">Map View</h3>
        <p className="text-gray-600 mb-6">Interactive map coming soon</p>
        <div className="space-y-2">
          {terminals.slice(0, 5).map((terminal) => (
            <div
              key={terminal.id}
              className="bg-white p-3 rounded border cursor-pointer hover:bg-gray-50"
              onClick={() => onTerminalSelect(terminal)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    terminal.queueStatus === 'light' ? 'bg-green-500' :
                    terminal.queueStatus === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="font-medium">{terminal.name}</span>
                </div>
                <span className="text-sm text-gray-600">{terminal.estimatedWait}m</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}