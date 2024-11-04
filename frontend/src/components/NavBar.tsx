import { ChevronDown, User, ChevronRight, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth, signOutUser } from '../auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { currentUser, loading } = useAuth();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryHover = (category: string, isHovering: boolean) => {
    setExpandedCategory(isHovering ? category : null);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success("See you next time!")
      setIsMobileMenuOpen(false);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        const protectedPaths = ['/profile', '/onboarding'];
        if (protectedPaths.some(path => location.pathname.startsWith(path))) {
          navigate('/signin', { 
            replace: true,
            state: { from: location.pathname }
          });
        }
      }
    }
  }, [currentUser, loading, navigate, location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-menu');
      if (nav && !nav.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-900 rounded-b-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-purple-900 hover:text-purple-700 transition-colors">
              Catalyzator.io
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-purple-900 hover:text-purple-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-8">
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
                    <Link 
                      to="/signin"
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`sm:hidden bg-white absolute w-full left-0 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          <div className="py-2">
            <button
              onClick={() => setExpandedCategory(expandedCategory === 'mobile-products' ? null : 'mobile-products')}
              className="w-full flex justify-between items-center text-sm font-medium text-gray-700 hover:text-purple-900"
            >
              Products
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                expandedCategory === 'mobile-products' ? 'rotate-180' : ''
              }`} />
            </button>
            {expandedCategory === 'mobile-products' && (
              <div className="mt-2 pl-4">
                <div className="mb-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">For Catalyzatees</div>
                  <div className="space-y-1">
                    <MobileMenuLink href="/onboarding">Pitch-to-Grant</MobileMenuLink>
                    <MobileMenuLink href="#navigator" future>Navigator</MobileMenuLink>
                    <MobileMenuLink href="#launchsuite" future>LaunchSuite</MobileMenuLink>
                    <MobileMenuLink href="#marketradar" future>MarketRadar</MobileMenuLink>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">For Catalyzators</div>
                  <div className="space-y-1">
                    <MobileMenuLink href="#catalyzatoros" future>CatalyzatorOS</MobileMenuLink>
                    <MobileMenuLink href="#impactview" future>ImpactView</MobileMenuLink>
                    <MobileMenuLink href="#grantmatch" future>GrantMatch</MobileMenuLink>
                    <MobileMenuLink href="#insightsconnect" future>InsightsConnect</MobileMenuLink>
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink href="/about">About</NavLink>

          <div className="pt-2 border-t border-gray-200">
            {!loading && (
              <>
                {currentUser ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center text-sm font-medium text-purple-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {currentUser.displayName || currentUser.email}
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/signin"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                )}
              </>
            )}
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

const MobileMenuLink = ({ href, children, future = false }: { 
  href: string; 
  children: React.ReactNode; 
  future?: boolean 
}) => (
  <a
    href={href}
    className={`block py-1 text-sm ${
      future ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-purple-900'
    }`}
  >
    {children}
    {future && <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span>}
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

const DropdownItem = ({ href, children, future = false }: { 
  href: string; 
  children: React.ReactNode; 
  future?: boolean 
}) => (
  <a
    href={href}
    className={`block px-4 py-2 text-sm ${
      future ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-900'
    }`}
  >
    {children}
    {future && <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span>}
  </a>
);

export default Navbar;