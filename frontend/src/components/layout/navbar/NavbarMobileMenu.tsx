import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { getNavbarContent } from './navbarConfig';
import { scrollToSection } from '../../../utils/scroll';

interface NavbarMobileMenuProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
  isLandingPage?: boolean;
}

export const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({
  isAuthenticated,
  onSignOut,
  isLandingPage = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const { logo, sections, actions, landingPageSections } = getNavbarContent(
    isAuthenticated ? { displayName: 'User' } : null,
    false,
    onSignOut,
    isLandingPage
  );

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-purple-900 rounded-b-xl">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {logo}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-md text-purple-900 hover:text-purple-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden bg-white absolute w-full left-0 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {isLandingPage && !isAuthenticated && landingPageSections && landingPageSections.map((section) => (
            <a
              key={section.label}
              href={section.href}
              onClick={(e) => {
                const success = scrollToSection(section.href.substring(1))(e);
                if (success) {
                  setIsMobileMenuOpen(false);
                }
              }}
              className="block text-sm font-medium text-gray-700 hover:text-crazy-orange py-2"
            >
              {section.label}
            </a>
          ))}

          {(
            <>
              <div className="py-2">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === 'products' ? null : 'products')}
                  className="w-full flex justify-between items-center text-sm font-medium text-gray-700 hover:text-purple-900"
                >
                  Products
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                    expandedCategory === 'products' ? 'rotate-180' : ''
                  }`} />
                </button>
                {expandedCategory === 'products' && (
                  <div className="mt-2 pl-4">
                    {sections.map((section) => (
                      <div key={section.title} className="mb-2">
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                          {section.title}
                        </div>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              className="block py-1 text-sm text-gray-700 hover:text-purple-900"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/about"
                className="block text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </>
          )}

          <div className="pt-2 border-t border-gray-200">
            {actions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                onClick={(e) => {
                  if (action.onClick) {
                    e.preventDefault();
                    action.onClick();
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 py-2"
              >
                {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 