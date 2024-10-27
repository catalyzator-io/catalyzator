import { ChevronDown, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const userName = "John"; // This would come from your auth system

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-900 rounded-lg scroll-mb-10 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900">Catalyzator.io</span>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8 rounded-full p-2">
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors">
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <DropdownItem href="#grants">Grant Finder</DropdownItem>
                <DropdownItem href="#ai-writer">AI Grant Writer</DropdownItem>
                <DropdownItem href="#analytics">Analytics Dashboard</DropdownItem>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-purple-900 transition-colors">
                Sectors <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <DropdownItem href="#tech">Technology</DropdownItem>
                <DropdownItem href="#healthcare">Healthcare</DropdownItem>
                <DropdownItem href="#education">Education</DropdownItem>
                <DropdownItem href="#nonprofit">Non-Profit</DropdownItem>
              </div>
            </div>

            <NavLink href="#about">ABOUT</NavLink>
            <NavLink href="#contact">CONTACT</NavLink>

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

const DropdownItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900"
  >
    {children}
  </a>
);

export default Navbar;