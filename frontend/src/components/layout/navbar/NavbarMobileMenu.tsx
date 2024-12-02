import React, { useState, useEffect } from 'react';
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
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  
  // Add viewport width listener
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { logo, sections, actions, landingPageSections } = getNavbarContent(
    isAuthenticated ? { displayName: 'User' } : null,
    false,
    onSignOut,
    isLandingPage
  );

  return (
    <div className="mobile-nav-container">
      {/* Fixed navbar header */}
      <div className="mobile-nav-header border-b border-purple-900/10 z-50">
        <div className="h-16 mobile-nav-padding">
          <div className="flex justify-between items-center h-full">
            {/* Logo - with responsive sizing */}
            <div className="flex-shrink-0 flex items-center">
              <div className="max-w-[180px] sm:max-w-[200px] overflow-hidden">
                {logo}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-purple-900 hover:text-purple-700 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`mobile-nav-content transition-all duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ 
          maxHeight: isMobileMenuOpen ? `calc(100vh - 4rem)` : '0',
          overflow: isMobileMenuOpen ? 'auto' : 'hidden'
        }}
      >
        <div className="mobile-nav-padding py-4">
          {/* Landing page sections */}
          {isLandingPage && !isAuthenticated && landingPageSections && (
            <div className="py-2 border-b border-purple-100">
              {landingPageSections.map((section) => (
                <a
                  key={section.label}
                  href={section.href}
                  onClick={(e) => {
                    const success = scrollToSection(section.href.substring(1))(e);
                    if (success) {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="block w-full px-3 py-2 text-sm sm:text-base font-medium text-gray-700 hover:text-crazy-orange hover:bg-purple-50 rounded-lg"
                >
                  {section.label}
                </a>
              ))}
            </div>
          )}

          {/* Products section */}
          <div className="py-2">
            <button
              onClick={() => setExpandedCategory(expandedCategory === 'products' ? null : 'products')}
              className="w-full flex justify-between items-center px-3 py-2 text-sm sm:text-base font-medium text-gray-700 hover:text-purple-900 hover:bg-purple-50 rounded-lg"
            >
              Products
              <ChevronDown className={`ml-1 h-4 w-4 sm:h-5 sm:w-5 transition-transform ${
                expandedCategory === 'products' ? 'rotate-180' : ''
              }`} />
            </button>
            
            {expandedCategory === 'products' && (
              <div className="mt-2 space-y-1 px-3">
                {sections.map((section) => (
                  <div key={section.title} className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">
                      {section.title}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block w-full px-3 py-2 text-sm sm:text-base text-gray-700 hover:text-purple-900 hover:bg-purple-50 rounded-lg"
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

          {/* Actions */}
          <div className="pt-4 border-t border-purple-100">
            <div className="space-y-1 px-3">
              {actions?.map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    action.onClick?.();
                  }}
                  className="w-full text-left px-3 py-2 text-sm sm:text-base font-medium text-gray-700 hover:text-purple-900 hover:bg-purple-50 rounded-lg"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}; 