import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getNavbarContent } from './navbarConfig';

interface DesktopNavbarProps {
  currentUser: any;
  loading: boolean;
  onSignOut: () => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  currentUser,
  loading,
  onSignOut,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { logo, sections, actions } = getNavbarContent(currentUser, loading, onSignOut);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md border-b border-purple-900 rounded-b-xl">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          {logo}
        </div>

        <div className="hidden sm:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors">
              Products <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {sections.map((section) => (
                <div 
                  key={section.title}
                  className="py-2"
                  onMouseEnter={() => setExpandedCategory(section.title)}
                  onMouseLeave={() => setExpandedCategory(null)}
                >
                  <button className="w-full px-4 py-1 text-xs font-semibold text-gray-500 uppercase flex justify-between items-center">
                    {section.title}
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      expandedCategory === section.title ? 'transform rotate-90' : ''
                    }`} />
                  </button>
                  {expandedCategory === section.title && (
                    <div className="mt-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className={`block px-4 py-2 text-sm ${
                            item.waitlist 
                              ? 'text-purple-600 hover:bg-purple-50 hover:text-purple-800' 
                              : 'text-purple-900 hover:bg-purple-50 hover:text-purple-900 font-semibold'
                          }`}
                        >
                          {item.label}
                          {item.waitlist && (
                            <span className="ml-2 text-xs text-purple-500">
                              (Join Waitlist)
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors">
            About
          </Link>

          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
            {actions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                onClick={action.onClick}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
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