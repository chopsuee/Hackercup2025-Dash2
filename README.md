# PILAPINAS - Real-time Terminal Queue Status

A mobile-first Progressive Web App (PWA) for Philippine commuters to check real-time terminal queue status and find alternative transport options.

## Features

- **Real-time Terminal Status**: View queue status (light/moderate/heavy) for major terminals
- **Route Planning**: Set origin and destination with popular route presets
- **Smart Suggestions**: Alternative routes when terminals are overcrowded
- **Interactive Map**: View terminals on an interactive map with Leaflet
- **Ride-hailing Integration**: Direct links to Grab, Angkas, and other transport apps
- **Mobile-first Design**: Optimized for mobile devices with responsive UI

## Use Case Flow

### Primary Scenario: PITX to Vito Cruz

1. **Welcome Screen**: User opens app and sees "Where are you headed?"
2. **Destination Input**: User enters "Vito Cruz" as destination
3. **Route Plotting**: App uses Leaflet.js + OpenStreetMap to plot primary route from PITX
4. **Queue Status Check**: System checks real-time queue status for terminals along route
5. **Smart Suggestions**: If main terminal shows heavy queue (red), app suggests alternatives:
   - LRT-1 Route (45 min travel time)
   - Bus Route (1 hr 15 min travel time)
   - Third-party hailing options (Grab, Angkas)
6. **Interactive Map**: All routes displayed with estimated times and queue conditions

### Alternative Demo: De La Salle-Taft to Indang, Cavite

The app also demonstrates a commuter traveling at 5:30 PM with 4 route options:

1. **PITX** (Heavy - 1.5-2 hrs queue, 3-4 hrs total)
2. **Baclaran** (Moderate - 20m queue, 2.5 hrs total)  
3. **P2P Bus to Trece** (Moderate - varies, 3 hrs total)
4. **Alabang** (Light - 15m queue, 3.5-4 hrs total)

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DraftPilapinas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library (replaced with emoji icons for performance)

### Mapping
- **Leaflet** - Interactive maps
- **React Leaflet** - React components for Leaflet

### Utilities
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes
- **class-variance-authority** - Component variants

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Map.tsx           # Interactive map
│   ├── RouteInput.tsx    # Route selection
│   └── SimpleComponents.tsx # Dashboard components
├── data/                 # Static data
│   ├── terminals.ts      # Terminal information
│   └── alternatives.ts   # Transport alternatives
├── lib/                  # Utilities
│   ├── utils.ts         # Helper functions
│   └── routing.ts       # Route calculations
├── types/               # TypeScript definitions
└── public/             # Static assets
```

## Key Components

### StatusDashboard
Displays nearby terminals with queue status, distances, and travel times.

### SmartSuggestions  
Shows alternative routes when primary terminals are overcrowded, including ride-hailing options.

### RouteInput
Allows users to set origin and destination with popular route presets.

### Map
Interactive Leaflet map showing terminal locations with custom markers.

### WelcomeScreen
Greets users with "Where are you headed?" and destination input with popular options.

### RouteMap
Displays primary and alternative routes on Leaflet map with real-time queue status and travel times.

## Data Sources

- **Terminal Data**: Simulated real-time queue status with rush hour patterns
- **Route Information**: Detailed multi-modal transport routes (PITX to Vito Cruz, Metro Manila to Cavite)
- **Alternative Transport**: Integration with major ride-hailing services
- **Mapping**: OpenStreetMap tiles via Leaflet.js for route visualization

## Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interface
- PWA capabilities for app-like experience
- Optimized for Filipino commuter workflows

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile devices
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Development Tools & AI Assistance

This project was developed with assistance from AI tools:

- **Claude (Anthropic)** - Code generation, debugging, and architectural guidance
- **ChatGPT (OpenAI)** - Problem-solving and implementation suggestions

## Acknowledgments

### Open Source Libraries
- **OpenStreetMap** - Map tiles and data
- **Leaflet** - Open-source mapping library
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js** - React framework by Vercel

### AI Development Assistance
- **Claude by Anthropic** - AI assistant for code development
- **ChatGPT by OpenAI** - AI assistant for technical guidance

---

Built for Filipino commuters to make public transportation more efficient and accessible.