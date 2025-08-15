import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RouteInputProps {
  onRouteSet: (from: string, to: string) => void;
  currentRoute?: { from: string; to: string };
}

export default function RouteInput({ onRouteSet, currentRoute }: RouteInputProps) {
  const [from, setFrom] = useState(currentRoute?.from || 'De La Salle-Taft');
  const [to, setTo] = useState(currentRoute?.to || 'Indang, Cavite');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    onRouteSet(from, to);
    setIsEditing(false);
  };

  const popularRoutes = [
    { from: 'De La Salle-Taft', to: 'Indang, Cavite' },
    { from: 'Makati CBD', to: 'Tagaytay' },
    { from: 'BGC', to: 'Batangas' },
    { from: 'Ortigas', to: 'Antipolo' }
  ];

  if (!isEditing) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Your Route</h3>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Change
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{from}</span>
          <span className="text-gray-400">→</span>
          <span className="font-medium">{to}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h3 className="font-semibold text-sm">Set Your Route</h3>
      
      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-600">From</label>
          <Input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Current location"
            className="text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600">To</label>
          <Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Destination"
            className="text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-600">Popular routes:</p>
        <div className="grid grid-cols-1 gap-1">
          {popularRoutes.map((route, index) => (
            <button
              key={index}
              onClick={() => {
                setFrom(route.from);
                setTo(route.to);
              }}
              className="text-left text-xs p-2 border rounded hover:bg-gray-50"
            >
              {route.from} → {route.to}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={handleSubmit} className="flex-1">
          Find Routes
        </Button>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}