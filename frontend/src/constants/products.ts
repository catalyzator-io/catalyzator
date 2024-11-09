import { Product } from '../types/product';
import { 
  Target, 
  FileText, 
  BarChart3, 
  Terminal, 
  Search, 
  Users, 
  MessageSquare,
  Lightbulb 
} from 'lucide-react';

export const PRODUCTS: Product[] = [
  {
    id: 'pitch-to-grant',
    title: 'Pitch to Grant',
    description: 'Transform your spoken story into winning grant applications',
    icon: MessageSquare,
    category: 'catalyzatee',
    status: 'active',
    route: '/pitch-to-grant'
  },
  {
    id: 'navigator',
    title: 'Navigator',
    description: 'Find your perfect funding path',
    icon: Target,
    category: 'catalyzatee',
    status: 'coming_soon',
    waitlistRoute: '/waitlist/navigator'
  },
  {
    id: 'launch-suite',
    title: 'LaunchSuite',
    description: 'Complete startup toolkit from pitch to documentation',
    icon: FileText,
    category: 'catalyzatee',
    status: 'coming_soon',
    waitlistRoute: '/waitlist/launch-suite'
  },
  {
    id: 'market-radar',
    title: 'MarketRadar',
    description: 'Real-time market intelligence and analysis',
    icon: BarChart3,
    category: 'catalyzatee',
    status: 'coming_soon',
    waitlistRoute: '/waitlist/market-radar'
  },
  {
    id: 'catalyzator-os',
    title: 'CatalyzatorOS',
    description: 'Streamline your entire workflow',
    icon: Terminal,
    category: 'catalyzator',
    status: 'coming_soon',
    waitlistRoute: '/waitlist/catalyzator-os'
  },
  {
    id: 'impact-view',
    title: 'ImpactView',
    description: 'Track portfolio performance in real-time',
    icon: Search,
    category: 'catalyzator',
    status: 'coming_soon',
    waitlistRoute: '/waitlist/impact-view'
  },
  {
    id: 'grant-match',
    title: 'GrantMatch',
    description: 'Connect with promising ventures instantly',
    icon: Users,
    category: 'catalyzator',
    status: 'coming_soon',
    waitlistRoute: '/waitlist/grant-match'
  },
  {
    id: 'insights-connect',
    title: 'InsightsConnect',
    description: 'Data-driven decision making tools',
    icon: Lightbulb,
    category: 'catalyzator',
    status: 'coming_soon',
    waitlistRoute: '/waitlist/insights-connect'
  }
];

export const getProductById = (id: string): Product | undefined => 
  PRODUCTS.find(p => p.id === id);

export const getProductsByCategory = (category: string): Product[] =>
  PRODUCTS.filter(p => p.category === category);