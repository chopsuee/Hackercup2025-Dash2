import { Terminal } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getQueueColor } from '@/lib/utils';
import { MapPin, Clock, Navigation, Route } from 'lucide-react';

interface AlternativeTerminalsProps {
  alternatives: Array<Terminal & { distance: number; travelTime: number }>;
  onSelectAlternative: (terminal: Terminal) => void;
  onShowRoute: (terminal: Terminal) => void;
}

export default function AlternativeTerminals({ 
  alternatives, 
  onSelectAlternative, 
  onShowRoute 
}: AlternativeTerminalsProps) {
  if (alternatives.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Route className="w-4 h-4" />
          Alternative Terminals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alternatives.map((terminal) => (
          <div
            key={terminal.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-3 h-3 rounded-full ${getQueueColor(terminal.queueStatus)}`} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{terminal.name}</div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {terminal.distance.toFixed(1)}km
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {terminal.travelTime}m
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Wait: {terminal.estimatedWait}m
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShowRoute(terminal)}
                className="p-2"
              >
                <Navigation className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectAlternative(terminal)}
                className="text-xs px-2"
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}