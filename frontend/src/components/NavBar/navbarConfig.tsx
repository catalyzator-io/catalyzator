import { PROTECTED_ROUTES } from '../../constants/routes';
import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProductsByCategory } from '../../constants/products';

interface NavItem {
  label: string;
  href: string;
  icon?: any;
  waitlist?: boolean;
  onClick?: () => void;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavbarContent {
  logo?: React.ReactNode;
  sections: NavSection[];
  actions: NavItem[];
}

export function getNavbarContent(
  currentUser: any | null,
  loading: boolean,
  onSignOut: () => void
): NavbarContent {
  const catalyzateesProducts: NavItem[] = getProductsByCategory('catalyzatee').map(product => ({
    label: product.title,
    href: (product.status === 'active' ? product.route : product.waitlistRoute) || '',
    waitlist: product.status === 'coming_soon'
  }));

  const catalyzatorsProducts: NavItem[] = getProductsByCategory('catalyzator').map(product => ({
    label: product.title,
    href: (product.status === 'active' ? product.route : product.waitlistRoute) || '',
    waitlist: product.status === 'coming_soon'
  }));

  const mainSections: NavSection[] = [
    {
      title: 'For Catalyzatees',
      items: catalyzateesProducts,
    },
    {
      title: 'For Catalyzators',
      items: catalyzatorsProducts,
    },
  ];

  const logo = (
    <Link to="/" className="text-xl font-bold text-purple-900 hover:text-purple-700 transition-colors">
      Catalyzator.io
    </Link>
  );

  const actions: NavItem[] = loading
    ? []
    : currentUser
    ? [
        {
          label: currentUser.displayName || currentUser.email,
          href: PROTECTED_ROUTES.PROFILE,
          icon: User,
        },
        {
          label: 'Sign Out',
          href: '#',
          icon: LogOut,
          onClick: onSignOut,
        },
      ]
    : [
        {
          label: 'Sign In',
          href: '/signin',
          icon: User,
        },
      ];

  return {
    logo,
    sections: mainSections,
    actions,
  };
} 