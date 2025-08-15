import { Terminal } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { getQueueColor, formatTime } from '@/lib/utils';
const MapPin = () => <span>📍</span>;
const Clock = () => <span>⏰</span>;
const Users = () => <span>👥</span>;

interface TerminalCardProps {
  terminal: Terminal;
  onClick: () => void;
}

export default function TerminalCard({ terminal, onClick }: TerminalCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-4 h-4 rounded-full ${getQueueColor(terminal.queueStatus)}`} />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{terminal.name}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin />
                <span className="truncate">{terminal.city}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-bold">
              <Clock />
              {formatTime(terminal.estimatedWait)}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Users />
              {terminal.currentQueue}/{terminal.capacity}
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {terminal.routes.slice(0, 2).map((route) => (
            <span
              key={route}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {route}
            </span>
          ))}
          {terminal.routes.length > 2 && (
            <span className="text-xs text-gray-500">
              +{terminal.routes.length - 2} more
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}