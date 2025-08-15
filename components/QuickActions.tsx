import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, AlertTriangle, Zap } from 'lucide-react';

interface QuickActionsProps {
  onFindNearest: () => void;
  onShowAlternatives: () => void;
  onEmergencyRide: () => void;
}

export default function QuickActions({ 
  onFindNearest, 
  onShowAlternatives, 
  onEmergencyRide 
}: QuickActionsProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onFindNearest}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-xs">Nearest</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShowAlternatives}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <Navigation className="w-4 h-4" />
            <span className="text-xs">Routes</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onEmergencyRide}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <Zap className="w-4 h-4" />
            <span className="text-xs">Grab Now</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}