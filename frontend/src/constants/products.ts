import { Product, ProductCategory, ProductId } from '../types/product';
import { 
  Mic, 
  Compass, 
  Handshake,
} from 'lucide-react';

export const PRODUCTS: Product[] = [
  {
    id: 'pitch-to-grant',
    title: 'Pitch to Grant',
    description: 'Transform spoken pitches into professional grant applications',
    category: 'innovator',
    metadata: {
      route: '/pitch-to-grant',
      icon: Mic
    }
  },
  {
    id: 'compass',
    title: 'Compass',
    description: 'Smart grant recommendation engine powered by Tnufa data',
    category: 'innovator',
    metadata: {
      route: '/compass',
      icon: Compass
    }
  },
  {
    id: 'fundmatch',
    title: 'FundMatch',
    description: 'Intelligent matching platform connecting startups and angels',
    category: 'catalyst',
    metadata: {
      route: '/fundmatch',
      icon: Handshake
    }
  }
];

export const getProductById = (id: ProductId): Product | undefined => 
  PRODUCTS.find(p => p.id === id);

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  PRODUCTS.filter(p => p.category === category);