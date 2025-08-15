import { AlternativeTransport } from '@/types';

export const getAlternatives = (from: string, to: string): AlternativeTransport[] => [
  {
    type: 'grab',
    name: 'Grab',
    estimatedCost: '₱150-300',
    estimatedTime: '15-30 min',
    deepLink: `grab://open?screen=booking&pickup=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`
  },
  {
    type: 'angkas',
    name: 'Angkas',
    estimatedCost: '₱80-150',
    estimatedTime: '10-20 min',
    deepLink: `angkas://book?pickup=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`
  },
  {
    type: 'joyride',
    name: 'JoyRide',
    estimatedCost: '₱100-200',
    estimatedTime: '12-25 min',
    deepLink: `joyride://book?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
  },
  {
    type: 'habal',
    name: 'Habal-habal',
    estimatedCost: '₱50-100',
    estimatedTime: '20-40 min',
    deepLink: `tel:+639123456789`
  }
];