
import type { Settings } from './types';

export const DEFAULT_SETTINGS: Settings = {
  opacity: 20,
  fontColor: '#FFFFFF',
  panelColor: '#FFFFFF',
  background: 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=1500&auto=format&fit=crop',
  fontFamily: 'Roboto',
};

export const BACKGROUND_OPTIONS = [
  { name: 'Cosmic', url: 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?q=80&w=1500&auto=format&fit=crop' },
  { name: 'Mountain', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1500&auto=format&fit=crop' },
  { name: 'Forest', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1500&auto=format&fit=crop' },
  { name: 'Beach', url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1500&auto=format&fit=crop' },
  { name: 'Black', url: '#000000' },
  { name: 'White', url: '#FFFFFF' },
];

export const FONT_OPTIONS = [
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Raleway',
  'Poppins',
  'Nunito',
  'Merriweather',
  'Playfair Display',
];
