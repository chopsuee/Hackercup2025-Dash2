import { Terminal, AlternativeTransport } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAlternatives } from '@/data/alternatives';
import { Lightbulb, ExternalLink, Phone, MapPin, Clock } from 'lucide-react';

interface SmartSuggestionsProps {
  userLocation: [number, number];
  nearbyTerminals: Array<Terminal & { distance: number; travelTime: number }>;
  onSelectTerminal: (terminal: Terminal) => void;
}

export default function SmartSuggestions({ 
  userLocation, 
  nearbyTerminals, 
  onSelectTerminal 
}: SmartSuggestionsProps) {
  const hasOvercrowded = nearbyTerminals.some(t => t.queueStatus === 'heavy');
  const alternatives = getAlternatives('Your location', 'Destination');
  
  if (!hasOvercrowded) return null;

  const bestAlternatives = nearbyTerminals
    .filter(t => t.queueStatus !== 'heavy')
    .slice(0, 2);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-blue-700 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Alternative Terminals */}
        {bestAlternatives.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-700 mb-2">Try these terminals instead:</div>
            <div className="space-y-2">
              {bestAlternatives.map((terminal) => (
                <div
                  key={terminal.id}
                  className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-gray-50"
                  onClick={() => onSelectTerminal(terminal)}
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{terminal.name}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {terminal.distance.toFixed(1)}km
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {terminal.estimatedWait}m wait
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Go
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ride-hailing Options */}
        <div>
          <div className="text-xs font-medium text-gray-700 mb-2">Or book a ride:</div>
          <div className="grid grid-cols-2 gap-2">
            {alternatives.slice(0, 4).map((alt) => (
              <Button
                key={alt.type}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (alt.type === 'habal') {
                    window.location.href = alt.deepLink;
                  } else {
                    window.open(alt.deepLink, '_blank');
                  }
                }}
                className="flex flex-col h-auto py-2 text-xs"
              >
                <div className="font-medium">{alt.name}</div>
                <div className="text-xs text-gray-600">{alt.estimatedCost}</div>
                {alt.type === 'habal' ? (
                  <Phone className="w-3 h-3 mt-1" />
                ) : (
                  <ExternalLink className="w-3 h-3 mt-1" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}