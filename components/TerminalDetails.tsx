import { Terminal, AlternativeTransport } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getQueueColor, formatTime } from '@/lib/utils';
import { getAlternatives } from '@/data/alternatives';
const MapPin = () => <span>📍</span>;
const Clock = () => <span>⏰</span>;
const Users = () => <span>👥</span>;
const ExternalLink = () => <span>🔗</span>;
const Phone = () => <span>📱</span>;

interface TerminalDetailsProps {
  terminal: Terminal;
  onUpdateQueue: (status: 'light' | 'moderate' | 'heavy') => void;
  userLocation?: [number, number];
  allTerminals?: Terminal[];
  onSelectAlternative?: (terminal: Terminal) => void;
  onShowRoute?: (terminal: Terminal) => void;
}

export default function TerminalDetails({ 
  terminal, 
  onUpdateQueue, 
  userLocation, 
  allTerminals = [], 
  onSelectAlternative,
  onShowRoute 
}: TerminalDetailsProps) {
  const alternatives = getAlternatives(terminal.address, 'Your destination');
  const nearbyTerminals: any[] = [];

  const handleAlternativeClick = (alternative: AlternativeTransport) => {
    if (typeof window !== 'undefined') {
      if (alternative.type === 'habal') {
        window.location.href = alternative.deepLink;
      } else {
        window.open(alternative.deepLink, '_blank');
      }
    }
  };

  const showAlternativeTerminals = false;

  return (
    <div className="space-y-4">
      {/* Terminal Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${getQueueColor(terminal.queueStatus)}`} />
            {terminal.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin />
            {terminal.address}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Clock />
              <div>
                <div className="text-sm font-semibold">{formatTime(terminal.estimatedWait)}</div>
                <div className="text-xs text-gray-500">Est. wait</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users />
              <div>
                <div className="text-sm font-semibold">{terminal.currentQueue}/{terminal.capacity}</div>
                <div className="text-xs text-gray-500">Queue</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Routes:</div>
            <div className="flex flex-wrap gap-1">
              {terminal.routes.map((route) => (
                <span
                  key={route}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {route}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Update */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Update Queue Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQueue('light')}
              className="flex flex-col h-auto py-2"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full mb-1" />
              <span className="text-xs">Light</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQueue('moderate')}
              className="flex flex-col h-auto py-2"
            >
              <div className="w-3 h-3 bg-yellow-500 rounded-full mb-1" />
              <span className="text-xs">Moderate</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQueue('heavy')}
              className="flex flex-col h-auto py-2"
            >
              <div className="w-3 h-3 bg-red-500 rounded-full mb-1" />
              <span className="text-xs">Heavy</span>
            </Button>
          </div>
        </CardContent>
      </Card>



      {/* Alternative Transport */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Alternative Transport</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {alternatives.map((alt) => (
            <div
              key={alt.type}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleAlternativeClick(alt)}
            >
              <div className="flex-1">
                <div className="font-medium text-sm">{alt.name}</div>
                <div className="text-xs text-gray-600">
                  {alt.estimatedCost} • {alt.estimatedTime}
                </div>
              </div>
              {alt.type === 'habal' ? (
                <Phone />
              ) : (
                <ExternalLink />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}