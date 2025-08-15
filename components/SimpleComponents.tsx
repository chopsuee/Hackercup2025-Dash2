// Lightweight replacements for complex components

export const StatusDashboard = ({ terminals, onSelectTerminal }: any) => (
  <div className="bg-white rounded-lg border p-4 space-y-3">
    <h3 className="font-semibold">Terminal Status</h3>
    <div className="grid grid-cols-3 gap-4 text-center text-sm">
      <div>
        <div className="text-lg font-bold text-green-600">
          {terminals.filter((t: any) => t.queueStatus === 'light').length}
        </div>
        <div className="text-xs text-gray-600">Available</div>
      </div>
      <div>
        <div className="text-lg font-bold text-yellow-600">
          {terminals.filter((t: any) => t.queueStatus === 'moderate').length}
        </div>
        <div className="text-xs text-gray-600">Moderate</div>
      </div>
      <div>
        <div className="text-lg font-bold text-red-600">
          {terminals.filter((t: any) => t.queueStatus === 'heavy').length}
        </div>
        <div className="text-xs text-gray-600">Heavy</div>
      </div>
    </div>
    <div className="space-y-2">
      {terminals.slice(0, 3).map((terminal: any) => (
        <div
          key={terminal.id}
          className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-50"
          onClick={() => onSelectTerminal(terminal)}
        >
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              terminal.queueStatus === 'light' ? 'bg-green-500' :
              terminal.queueStatus === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-sm font-medium">{terminal.name}</span>
          </div>
          <span className="text-xs text-gray-600">{terminal.estimatedWait}m</span>
        </div>
      ))}
    </div>
  </div>
);

export const SmartSuggestions = ({ nearbyTerminals, onSelectTerminal }: any) => {
  const hasHeavy = nearbyTerminals.some((t: any) => t.queueStatus === 'heavy');
  if (!hasHeavy) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-700 mb-2">💡 Try These Instead</h3>
      <div className="space-y-2">
        {nearbyTerminals.filter((t: any) => t.queueStatus !== 'heavy').slice(0, 2).map((terminal: any) => (
          <div
            key={terminal.id}
            className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer"
            onClick={() => onSelectTerminal(terminal)}
          >
            <span className="text-sm">{terminal.name}</span>
            <span className="text-xs text-gray-600">{terminal.estimatedWait}m</span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => window.open('grab://open', '_blank')}
          className="bg-green-500 text-white text-xs py-2 px-3 rounded"
        >
          🚗 Grab
        </button>
        <button
          onClick={() => window.open('angkas://book', '_blank')}
          className="bg-orange-500 text-white text-xs py-2 px-3 rounded"
        >
          🏍️ Angkas
        </button>
      </div>
    </div>
  );
};

export const QuickActions = ({ onFindNearest, onShowAlternatives, onEmergencyRide }: any) => (
  <div className="bg-white rounded-lg border p-4">
    <div className="grid grid-cols-3 gap-2">
      <button
        onClick={onFindNearest}
        className="flex flex-col items-center py-3 border rounded hover:bg-gray-50"
      >
        <span className="text-lg">📍</span>
        <span className="text-xs mt-1">Nearest</span>
      </button>
      <button
        onClick={onShowAlternatives}
        className="flex flex-col items-center py-3 border rounded hover:bg-gray-50"
      >
        <span className="text-lg">🗺️</span>
        <span className="text-xs mt-1">Map</span>
      </button>
      <button
        onClick={onEmergencyRide}
        className="flex flex-col items-center py-3 bg-red-500 text-white rounded"
      >
        <span className="text-lg">⚡</span>
        <span className="text-xs mt-1">Grab</span>
      </button>
    </div>
  </div>
);