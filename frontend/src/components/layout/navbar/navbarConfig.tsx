import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProductsByCategory } from '../../../constants/products';

interface NavItem {
  label: string;
  href: string;
  icon?: any;
  onClick?: () => void;
  isSection?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavbarContent {
  logo?: React.ReactNode;
  sections: NavSection[];
  actions: NavItem[];
  landingPageSections?: NavItem[];
}

export function getNavbarContent(
  currentUser: any | null,
  loading: boolean,
  onSignOut: () => void,
  isLandingPage: boolean = false
): NavbarContent {
  const innovatorProducts: NavItem[] = getProductsByCategory('innovator').map(product => ({
    label: product.title,
    href: product.route,
  }));

  const catalystProducts: NavItem[] = getProductsByCategory('catalyst').map(product => ({
    label: product.title,
    href: product.route,
  }));

  const landingPageSections: NavItem[] = isLandingPage && !currentUser ? [
    {
      label: 'Features',
      href: '#features',
      isSection: true,
    },
    {
      label: 'Contact',
      href: '#contact',
      isSection: true,
    },
  ] : [];

  const mainSections: NavSection[] = [
    {
      title: 'For Catalysts',
      items: catalystProducts,
    },
    {
      title: 'For Innovators',
      items: innovatorProducts,
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
          href: '/profile',
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
    landingPageSections
  };
} 