// Lightweight replacements for complex components

export const StatusDashboard = ({ terminals, onSelectTerminal, userLocation }: any) => {
  const nearbyTerminals = terminals.filter((t: any) => t.distance < 10).sort((a: any, b: any) => a.distance - b.distance);
  const pitx = terminals.find((t: any) => t.id === 'pitx');
  const isPitxOvercrowded = pitx?.queueStatus === 'heavy';
  
  return (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Nearest Terminals</h3>
        <span className="text-xs text-gray-500">📍 De La Salle-Taft</span>
      </div>
      
      {isPitxOvercrowded && (
        <div className="bg-red-50 border border-red-200 rounded p-2">
          <div className="flex items-center gap-2 text-red-700">
            <span>⚠️</span>
            <span className="text-sm font-medium">PITX is overcrowded</span>
          </div>
          <p className="text-xs text-red-600 mt-1">Consider alternatives below</p>
        </div>
      )}
      
      <div className="space-y-2">
        {nearbyTerminals.slice(0, 4).map((terminal: any) => (
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
              <div>
                <span className="text-sm font-medium">{terminal.name}</span>
                <div className="text-xs text-gray-500">{terminal.distance.toFixed(1)}km • {terminal.travelTime}min</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium">{terminal.estimatedWait}m wait</div>
              <div className="text-xs text-gray-500">
                {terminal.routes.includes('Cavite') || terminal.routes.includes('CALABARZON') ? '✓ To Cavite' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SmartSuggestions = ({ nearbyTerminals, onSelectTerminal, currentRoute }: any) => {
  const pitx = nearbyTerminals.find((t: any) => t.id === 'pitx');
  const isPitxOvercrowded = pitx?.queueStatus === 'heavy';
  const alternatives = nearbyTerminals.filter((t: any) => t.queueStatus !== 'heavy' && t.id !== 'pitx');
  
  if (!isPitxOvercrowded && alternatives.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-700 mb-2">🚌 Alternative Routes to {currentRoute?.to || 'Your Destination'}</h3>
      
      {alternatives.length > 0 ? (
        <div className="space-y-2 mb-3">
          {alternatives.slice(0, 2).map((terminal: any) => (
            <div
              key={terminal.id}
              className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectTerminal(terminal)}
            >
              <div>
                <div className="text-sm font-medium">{terminal.name}</div>
                <div className="text-xs text-gray-600">{terminal.distance.toFixed(1)}km • {terminal.travelTime}min away</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-green-600">{terminal.estimatedWait}m wait</div>
                <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded mt-1">Get Directions</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
          <p className="text-sm text-yellow-700">⚠️ All nearby terminals are busy</p>
        </div>
      )}
      
      <div className="border-t pt-3">
        <p className="text-xs text-gray-600 mb-2">Direct ride to {currentRoute?.to || 'destination'}:</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                const pickup = encodeURIComponent(currentRoute?.from || 'Current Location');
                const destination = encodeURIComponent(currentRoute?.to || 'Destination');
                window.open(`grab://open?pickup=${pickup}&destination=${destination}`, '_blank');
              }
            }}
            className="bg-green-500 text-white text-xs py-2 px-3 rounded flex items-center justify-center gap-1"
          >
            🚗 Grab<br/>₱800-1200
          </button>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                const pickup = encodeURIComponent(currentRoute?.from || 'Current Location');
                const destination = encodeURIComponent(currentRoute?.to || 'Destination');
                window.open(`angkas://book?pickup=${pickup}&destination=${destination}`, '_blank');
              }
            }}
            className="bg-orange-500 text-white text-xs py-2 px-3 rounded flex items-center justify-center gap-1"
          >
            🏍️ Angkas<br/>₱400-600
          </button>
        </div>
      </div>
    </div>
  );
};

export const QuickActions = ({ onFindNearest, onShowAlternatives, onEmergencyRide }: any) => (
  <div className="bg-white rounded-lg border p-4">
    <div className="mb-2">
      <h3 className="text-sm font-semibold text-gray-700">🚌 Find Your Route</h3>
      <p className="text-xs text-gray-500">Choose the best transport option</p>
    </div>
    <div className="grid grid-cols-3 gap-2">
      <button
        onClick={onFindNearest}
        className="flex flex-col items-center py-3 border rounded hover:bg-gray-50"
      >
        <span className="text-lg">🚌</span>
        <span className="text-xs mt-1">Terminals</span>
      </button>
      <button
        onClick={onShowAlternatives}
        className="flex flex-col items-center py-3 border rounded hover:bg-gray-50"
      >
        <span className="text-lg">🗺️</span>
        <span className="text-xs mt-1">Map View</span>
      </button>
      <button
        onClick={onEmergencyRide}
        className="flex flex-col items-center py-3 bg-green-500 text-white rounded"
      >
        <span className="text-lg">🚗</span>
        <span className="text-xs mt-1">Direct Ride</span>
      </button>
    </div>
  </div>
);