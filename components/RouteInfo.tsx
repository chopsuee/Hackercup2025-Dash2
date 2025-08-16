import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const Navigation = () => <span>🧭</span>;
const X = () => <span>✕</span>;
const Clock = () => <span>⏰</span>;
const MapPin = () => <span>📍</span>;
import { Terminal } from '@/types';
import { formatTime } from '@/lib/utils';

interface RouteInfoProps {
  destination: Terminal;
  distance: number;
  travelTime: number;
  onClose: () => void;
}

export default function RouteInfo({ destination, distance, travelTime, onClose }: RouteInfoProps) {
  return (
    <div className="absolute top-4 left-4 right-4 z-40">
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation />
              <div>
                <div className="font-medium text-sm">{destination.name}</div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin />
                    {distance.toFixed(1)}km
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock />
                    {formatTime(travelTime)}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}