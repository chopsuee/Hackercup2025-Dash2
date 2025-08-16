import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WelcomeScreenProps {
  onDestinationSet: (destination: string) => void;
}

export default function WelcomeScreen({ onDestinationSet }: WelcomeScreenProps) {
  const [destination, setDestination] = useState('');

  const popularDestinations = [
    'Indang, Cavite',
    'Bacoor city, Cavite',
    'BGC',
    'Alabang',
  
  ];

  const handleSubmit = () => {
    if (destination.trim()) {
      onDestinationSet(destination.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center p-6">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl">🚌</div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to PILAPINAS</h1>
          <p className="text-gray-600">Your smart commuting companion</p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Where are you headed?
            </h2>
          </div>

          <div className="space-y-3">
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination..."
              className="text-center text-lg py-3"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            
            <Button 
              onClick={handleSubmit}
              disabled={!destination.trim()}
              className="w-full py-3 text-lg"
            >
              Find Routes 🗺️
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500 text-center">Popular destinations:</p>
            <div className="grid grid-cols-2 gap-2">
              {popularDestinations.map((dest) => (
                <Button
                  key={dest}
                  variant="outline"
                  size="sm"
                  onClick={() => setDestination(dest)}
                  className="text-sm"
                >
                  {dest}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          <p>Real-time queue status • Smart route suggestions</p>
        </div>
      </div>
    </div>
  );
}