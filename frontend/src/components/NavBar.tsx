import { ChevronDown, User, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const userName = "John"; // This would come from your auth system

  const handleCategoryHover = (category: string, isHovering: boolean) => {
    setExpandedCategory(isHovering ? category : null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-900 rounded-lg scroll-mb-10 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-purple-900 hover:text-purple-700 transition-colors">Catalyzator.io</a>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8 rounded-full p-2">
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors">
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <DropdownCategory 
                  title="For Catalyzators" 
                  isExpanded={expandedCategory === 'catalyzators'}
                  onHover={(isHovering) => handleCategoryHover('catalyzators', isHovering)}
                >
                  <DropdownItem href="#catalyzatoros" future>CatalyzatorOS</DropdownItem>
                  <DropdownItem href="#impactview" future>ImpactView</DropdownItem>
                  <DropdownItem href="#grantmatch" future>GrantMatch</DropdownItem>
                  <DropdownItem href="#insightsconnect" future>InsightsConnect</DropdownItem>
                </DropdownCategory>
                <DropdownCategory 
                  title="For Catalyzatees" 
                  isExpanded={expandedCategory === 'catalyzatees'}
                  onHover={(isHovering) => handleCategoryHover('catalyzatees', isHovering)}
                >
                  <DropdownItem href="#pitch-to-grant">Pitch-to-Grant</DropdownItem>
                  <DropdownItem href="#navigator" future>Navigator</DropdownItem>
                  <DropdownItem href="#launchsuite" future>LaunchSuite</DropdownItem>
                  <DropdownItem href="#marketradar" future>MarketRadar</DropdownItem>
                </DropdownCategory>
              </div>
            </div>

            <NavLink href="/about">ABOUT</NavLink>

            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              {isSignedIn ? (
                <div className="flex items-center text-sm font-medium text-purple-900">
                  <User className="h-4 w-4 mr-2" />
                  Hello, {userName}
                </div>
              ) : (
                <button 
                  onClick={() => setIsSignedIn(true)} 
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
  >
    {children}
  </a>
);

const DropdownCategory = ({ title, children, isExpanded, onHover }: { 
  title: string; 
  children: React.ReactNode; 
  isExpanded: boolean; 
  onHover: (isHovering: boolean) => void 
}) => (
  <div 
    className="py-2"
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
  >
    <button 
      className="w-full px-4 py-1 text-xs font-semibold text-gray-500 uppercase flex justify-between items-center"
    >
      {title}
      <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'transform rotate-90' : ''}`} />
    </button>
    {isExpanded && <div className="mt-1">{children}</div>}
  </div>
);

const DropdownItem = ({ href, children, future = false }: { href: string; children: React.ReactNode; future?: boolean }) => (
  <a
    href={href}
    className={`block px-4 py-2 text-sm ${future ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-900'}`}
  >
    {children}
    {future && <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span>}
  </a>
);

export default Navbar;
