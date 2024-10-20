import React, { useState } from 'react';
import { Zap, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)' }}></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <Zap className="mx-auto h-20 w-20 text-yellow-400 animate-pulse mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Catalyzator.io
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-2">
            The Catalyzator for Catalyzators
          </p>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-blue-200">
            Accelerate your company's growth, funding, and partnerships
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex items-center border-b-2 border-blue-300 py-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-blue-200"
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm mt-2 text-blue-200">Get early access to our platform!</p>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;