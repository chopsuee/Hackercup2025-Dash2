'use client';

import { useState, useEffect } from 'react';
import { Terminal, User } from '@/types';
import { philippineTerminals, rushHourPatterns } from '@/data/terminals';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Map from '@/components/Map';
import TerminalCard from '@/components/TerminalCard';
import TerminalDetails from '@/components/TerminalDetails';
import LoginDialog from '@/components/LoginDialog';
import RouteInfo from '@/components/RouteInfo';
import { StatusDashboard, SmartSuggestions, QuickActions } from '@/components/SimpleComponents';
import RouteInput from '@/components/RouteInput';
import WelcomeScreen from '@/components/WelcomeScreen';
import RouteMap from '@/components/RouteMap';
import { calculateDistance, estimateTravelTime, findNearestAlternatives } from '@/lib/routing';
// Simple SVG icons to replace lucide-react
const MapPin = () => <span>📍</span>;
const List = () => <span>📋</span>;
const UserIcon = () => <span>👤</span>;
const LogOut = () => <span>🚪</span>;
const Search = () => <span>🔍</span>;
const TrendingUp = () => <span>📈</span>;
const HomeIcon = () => <span>🏠</span>;

export default function App() {
  const [terminals, setTerminals] = useState<Terminal[]>(philippineTerminals);
  const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'dashboard' | 'list' | 'map'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number]>([14.5995, 120.9842]);
  const [showRoute, setShowRoute] = useState<Terminal | null>(null);
  const [currentRoute, setCurrentRoute] = useState({ from: 'De La Salle-Taft', to: 'Indang, Cavite' });
  const [showWelcome, setShowWelcome] = useState(true);
  const [destination, setDestination] = useState('');

  // Get user location (simulated for De La Salle-Taft)
  useEffect(() => {
    // Simulate De La Salle-Taft location
    setUserLocation([14.5649, 120.9934]); // De La Salle-Taft coordinates
    
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Keep De La Salle-Taft as default
        }
      );
    }
  }, []);

  // Simulate real-time queue updates
  useEffect(() => {
    const updateQueues = () => {
      const now = new Date();
      const hour = now.getHours();
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;
      
      setTerminals(prevTerminals =>
        prevTerminals.map(terminal => {
          // Force PITX to be overcrowded for demo
          if (terminal.id === 'pitx') {
            return {
              ...terminal,
              currentQueue: 650,
              estimatedWait: 90,
              queueStatus: 'heavy' as const,
              lastUpdated: new Date()
            };
          }
          
          let multiplier = 1;
          
          if (isWeekend) {
            multiplier = rushHourPatterns.weekend.multiplier;
          } else if (hour >= rushHourPatterns.morning.start && hour <= rushHourPatterns.morning.end) {
            multiplier = rushHourPatterns.morning.multiplier;
          } else if (hour >= rushHourPatterns.evening.start && hour <= rushHourPatterns.evening.end) {
            multiplier = rushHourPatterns.evening.multiplier;
          }
          
          const baseQueue = Math.floor(terminal.capacity * 0.3);
          const newQueue = Math.min(Math.floor(baseQueue * multiplier), terminal.capacity);
          const newWait = Math.floor((newQueue / terminal.capacity) * 60);
          
          let status: 'light' | 'moderate' | 'heavy' = 'light';
          if (newWait > 30) status = 'heavy';
          else if (newWait > 15) status = 'moderate';
          
          return {
            ...terminal,
            currentQueue: newQueue,
            estimatedWait: newWait,
            queueStatus: status,
            lastUpdated: new Date()
          };
        })
      );
    };

    updateQueues();
    const interval = setInterval(updateQueues, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedTerminal(null);
  };

  const handleTerminalSelect = (terminal: Terminal) => {
    setSelectedTerminal(terminal);
    setShowRoute(null);
  };

  const handleShowRoute = (terminal: Terminal) => {
    setShowRoute(terminal);
  };

  const handleSelectAlternative = (terminal: Terminal) => {
    setSelectedTerminal(terminal);
    setShowRoute(null);
  };

  const handleFindNearest = () => {
    const nearest = terminals[0];
    if (nearest) {
      setSelectedTerminal(nearest);
      setViewMode('map');
    }
  };

  const handleShowAlternatives = () => {
    setViewMode('map');
  };

  const handleEmergencyRide = () => {
    if (typeof window !== 'undefined') {
      const pickup = encodeURIComponent(currentRoute.from);
      const destination = encodeURIComponent(currentRoute.to);
      window.open(`grab://open?pickup=${pickup}&destination=${destination}`, '_blank');
    }
  };

  const handleRouteSet = (from: string, to: string) => {
    setCurrentRoute({ from, to });
  };

  const handleDestinationSet = (dest: string) => {
    setDestination(dest);
    setCurrentRoute({ from: 'PITX', to: dest });
    setShowWelcome(false);
    setViewMode('map');
  };

  // Mock route data for PITX to Vito Cruz
  const primaryRoute: [number, number][] = [
    [14.4796, 120.9962], // PITX
    [14.5649, 120.9934]  // Vito Cruz
  ];

  const alternativeRoutes = [
    {
      name: 'LRT-1 Route',
      coordinates: [[14.4796, 120.9962], [14.5085, 120.9937], [14.5649, 120.9934]] as [number, number][],
      color: '#10b981',
      travelTime: '45 min'
    },
    {
      name: 'Bus Route',
      coordinates: [[14.4796, 120.9962], [14.5378, 121.0014], [14.5649, 120.9934]] as [number, number][],
      color: '#f59e0b',
      travelTime: '1 hr 15 min'
    }
  ];

  const handleQueueUpdate = (status: 'light' | 'moderate' | 'heavy') => {
    if (!currentUser) {
      setShowLoginDialog(true);
      return;
    }

    if (!selectedTerminal) return;

    setTerminals(prevTerminals =>
      prevTerminals.map(terminal => {
        if (terminal.id === selectedTerminal.id) {
          const estimatedWait = status === 'light' ? Math.floor(Math.random() * 15) : 
                              status === 'moderate' ? 15 + Math.floor(Math.random() * 15) :
                              30 + Math.floor(Math.random() * 30);
          
          return {
            ...terminal,
            queueStatus: status,
            estimatedWait,
            lastUpdated: new Date()
          };
        }
        return terminal;
      })
    );
  };

  const filteredTerminals = terminals.filter(terminal =>
    terminal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    terminal.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    terminal.routes.some(route => route.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const queueCounts = {
    light: terminals.filter(t => t.queueStatus === 'light').length,
    moderate: terminals.filter(t => t.queueStatus === 'moderate').length,
    heavy: terminals.filter(t => t.queueStatus === 'heavy').length
  };

  if (showWelcome) {
    return <WelcomeScreen onDestinationSet={handleDestinationSet} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white text-lg">
                📍
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">PILAPINAS</h1>
                <p className="text-xs text-gray-500">
                  {viewMode === 'dashboard' ? `${currentRoute.from} → ${currentRoute.to}` : 
                   viewMode === 'map' ? 'Map View' : 'Terminal List'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Button
                  variant={viewMode === 'dashboard' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('dashboard')}
                >
                  <HomeIcon />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <MapPin />
                </Button>
              </div>
              
              {currentUser ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut />
                </Button>
              ) : (
                <Button size="sm" onClick={() => setShowLoginDialog(true)}>
                  <UserIcon />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="h-[calc(100vh-80px)]">
        {viewMode === 'dashboard' ? (
          <div className="p-4 space-y-4 overflow-y-auto">
            <RouteInput
              onRouteSet={handleRouteSet}
              currentRoute={currentRoute}
            />
            <QuickActions
              onFindNearest={handleFindNearest}
              onShowAlternatives={handleShowAlternatives}
              onEmergencyRide={handleEmergencyRide}
            />
            <StatusDashboard
              terminals={terminals.slice(0, 6).map((t, index) => ({ 
                ...t, 
                distance: t.id === 'pitx' ? 2.1 : (index + 1) * 1.5, 
                travelTime: t.id === 'pitx' ? 8 : (index + 1) * 5
              }))}
              onSelectTerminal={handleTerminalSelect}
              onShowRoute={handleShowRoute}
              userLocation={userLocation}
            />
            <SmartSuggestions
              userLocation={userLocation}
              nearbyTerminals={terminals.slice(0, 3).map((t, index) => ({ 
                ...t, 
                distance: (index + 1) * 1.5, 
                travelTime: (index + 1) * 5 
              }))}
              onSelectTerminal={handleTerminalSelect}
              currentRoute={currentRoute}
            />
          </div>
        ) : viewMode === 'map' ? (
          <div className="relative h-full z-0">
            <RouteMap
              origin={currentRoute.from}
              destination={currentRoute.to}
              terminals={filteredTerminals}
              primaryRoute={primaryRoute}
              alternativeRoutes={alternativeRoutes}
              onTerminalSelect={handleTerminalSelect}
            />
            
            {/* Route Info Overlay */}
            {showRoute && (
              <RouteInfo
                destination={showRoute}
                distance={calculateDistance(
                  userLocation[0], userLocation[1],
                  showRoute.coordinates[0], showRoute.coordinates[1]
                )}
                travelTime={estimateTravelTime(
                  calculateDistance(
                    userLocation[0], userLocation[1],
                    showRoute.coordinates[0], showRoute.coordinates[1]
                  )
                )}
                onClose={() => setShowRoute(null)}
              />
            )}
            
            {/* Search Overlay */}
            <div className="absolute top-4 left-4 right-4 z-50">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search terminals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Queue Status Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-50">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm font-medium">{queueCounts.light}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-sm font-medium">{queueCounts.moderate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-sm font-medium">{queueCounts.heavy}</span>
                    </div>
                  </div>
                  {queueCounts.heavy > 0 && (
                    <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
                      <TrendingUp />
                      Alert
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Search */}
            <div className="p-4 bg-white border-b">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search terminals, cities, or routes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
              </div>
            </div>

            {/* Queue Status */}
            <div className="p-4 bg-white border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">{queueCounts.light} Light</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-sm font-medium">{queueCounts.moderate} Moderate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm font-medium">{queueCounts.heavy} Heavy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredTerminals.map((terminal) => (
                <TerminalCard
                  key={terminal.id}
                  terminal={terminal}
                  onClick={() => handleTerminalSelect(terminal)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Terminal Details Modal */}
      {selectedTerminal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Terminal Details</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTerminal(null)}
              >
                Close
              </Button>
            </div>
            <div className="p-4">
              <TerminalDetails
                terminal={selectedTerminal}
                onUpdateQueue={handleQueueUpdate}
                userLocation={userLocation}
                allTerminals={terminals}
                onSelectAlternative={handleSelectAlternative}
                onShowRoute={handleShowRoute}
              />
            </div>
          </div>
        </div>
      )}

      {/* Login Dialog */}
      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}