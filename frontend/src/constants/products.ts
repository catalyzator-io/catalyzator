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
    icon: Mic,
    category: 'innovator',
    route: '/pitch-to-grant'
  },
  {
    id: 'compass',
    title: 'Compass',
    description: 'Smart grant recommendation engine powered by Tnufa data',
    icon: Compass,
    category: 'innovator',
    route: '/compass'
  },
  {
    id: 'fundmatch',
    title: 'FundMatch',
    description: 'Intelligent matching platform connecting startups and angels',
    icon: Handshake,
    category: 'catalyst',
    route: '/fundmatch'
  }
];

export const getProductById = (id: ProductId): Product | undefined => 
  PRODUCTS.find(p => p.id === id);

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  PRODUCTS.filter(p => p.category === category);