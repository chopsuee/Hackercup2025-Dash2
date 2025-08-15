import { Terminal } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getQueueColor } from '@/lib/utils';
import { MapPin, Clock, AlertTriangle, CheckCircle, Navigation } from 'lucide-react';

interface StatusDashboardProps {
  terminals: Array<Terminal & { distance: number; travelTime: number }>;
  onSelectTerminal: (terminal: Terminal) => void;
  onShowRoute: (terminal: Terminal) => void;
}

export default function StatusDashboard({ terminals, onSelectTerminal, onShowRoute }: StatusDashboardProps) {
  const available = terminals.filter(t => t.queueStatus === 'light');
  const moderate = terminals.filter(t => t.queueStatus === 'moderate');
  const overcrowded = terminals.filter(t => t.queueStatus === 'heavy');

  return (
    <div className="space-y-4">
      {/* Status Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Terminal Status Near You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">{available.length}</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">{moderate.length}</div>
              <div className="text-xs text-gray-600">Moderate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">{overcrowded.length}</div>
              <div className="text-xs text-gray-600">Overcrowded</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Terminals */}
      {available.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-600">✓ Available Now</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {available.slice(0, 3).map((terminal) => (
              <TerminalRow
                key={terminal.id}
                terminal={terminal}
                onSelect={onSelectTerminal}
                onRoute={onShowRoute}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Overcrowded Alert */}
      {overcrowded.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Overcrowded - Consider Alternatives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {overcrowded.map((terminal) => (
              <TerminalRow
                key={terminal.id}
                terminal={terminal}
                onSelect={onSelectTerminal}
                onRoute={onShowRoute}
                showAlert
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TerminalRow({ 
  terminal, 
  onSelect, 
  onRoute, 
  showAlert = false 
}: { 
  terminal: Terminal & { distance: number; travelTime: number };
  onSelect: (terminal: Terminal) => void;
  onRoute: (terminal: Terminal) => void;
  showAlert?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
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
              {terminal.travelTime}m travel
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {terminal.estimatedWait}m wait
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRoute(terminal)}
          className="p-2"
        >
          <Navigation className="w-3 h-3" />
        </Button>
        <Button
          variant={showAlert ? "destructive" : "outline"}
          size="sm"
          onClick={() => onSelect(terminal)}
          className="text-xs px-2"
        >
          {showAlert ? "Avoid" : "Go"}
        </Button>
      </div>
    </div>
  );
}