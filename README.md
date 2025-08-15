# PILAPINAS - Mobile-First PWA

A mobile-first Progressive Web App (PWA) for Philippine commuters to check real-time terminal queue status and find alternative transport options.

## Features

- **Real-time Queue Status**: Visual indicators (green/yellow/red) for terminal queue levels
- **Interactive Maps**: Leaflet.js + OpenStreetMap integration for terminal locations
- **Alternative Transport**: Integration with ride-hailing apps (Grab, Angkas, etc.)
- **Mobile-First Design**: Responsive layout optimized for mobile devices
- **PWA Support**: Offline functionality and app-like experience
- **Quick Login**: Guest access or simple user registration
- **Rush Hour Patterns**: Automatic queue updates based on time patterns

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Maps**: Leaflet.js + react-leaflet + OpenStreetMap
- **UI**: shadcn/ui components with Tailwind CSS
- **PWA**: next-pwa for offline support
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Components

- **MapView**: Interactive map with terminal markers
- **TerminalCard**: List view terminal information
- **TerminalDetails**: Detailed terminal info with queue updates
- **LoginDialog**: Quick user authentication
- **Alternative Transport**: Deep links to ride-hailing apps

## Queue Status System

- **Green (Light)**: < 15 minutes wait
- **Yellow (Moderate)**: 15-30 minutes wait  
- **Red (Heavy)**: > 30 minutes wait

## Mobile Features

- Touch-optimized interface
- Geolocation support
- Offline functionality
- App-like experience when installed
- Push notifications (future enhancement)

## Build for Production

```bash
npm run build
npm start
```

The app will be available as a PWA that can be installed on mobile devices.