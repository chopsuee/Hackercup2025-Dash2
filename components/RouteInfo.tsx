import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, X, Clock, MapPin } from 'lucide-react';
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
              <Navigation className="w-4 h-4 text-blue-500" />
              <div>
                <div className="font-medium text-sm">{destination.name}</div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {distance.toFixed(1)}km
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(travelTime)}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}