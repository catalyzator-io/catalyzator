import { ChevronDown, User, ChevronRight, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth, signOutUser } from '../auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, loading } = useAuth();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryHover = (category: string, isHovering: boolean) => {
    setExpandedCategory(isHovering ? category : null);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      // After signing out, redirect to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        // If user is not authenticated and trying to access protected route
        const protectedPaths = ['/profile', '/onboarding'];
        if (protectedPaths.some(path => location.pathname.startsWith(path))) {
          navigate('/login', { 
            replace: true,
            state: { from: location.pathname }
          });
        }
      }
    }
  }, [currentUser, loading, navigate, location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-900 rounded-b-xl scroll-mb-10 mb-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* add Logo with link to home page */}
            <Link to="/" className="text-xl font-bold text-purple-900 hover:text-purple-700 transition-colors">Catalyzator.io</Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8 rounded-full p-2">
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors">
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <DropdownCategory 
                  title="For Catalyzatees" 
                  isExpanded={expandedCategory === 'catalyzatees'}
                  onHover={(isHovering) => handleCategoryHover('catalyzatees', isHovering)}
                >
                  <DropdownItem href="/onboarding">Pitch-to-Grant</DropdownItem>
                  <DropdownItem href="#navigator" future>Navigator</DropdownItem>
                  <DropdownItem href="#launchsuite" future>LaunchSuite</DropdownItem>
                  <DropdownItem href="#marketradar" future>MarketRadar</DropdownItem>
                </DropdownCategory>
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
              </div>
            </div>

            <NavLink href="/about">About</NavLink>

            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
              {!loading && (
                <>
                  {currentUser ? (
                    <div className="flex items-center space-x-4">
                      <Link to="/profile" className="flex items-center text-sm font-medium text-purple-900">
                        <User className="h-4 w-4 mr-2" />
                        {currentUser.displayName || currentUser.email}
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link 
                        to="/login"
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                      <Link 
                        to="/signup"
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </>
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
