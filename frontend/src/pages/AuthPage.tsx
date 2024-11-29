import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { dal } from '../utils/dal/dal';
import NavBar from '../components/layout/NavBar';
import { User as FirebaseUser } from 'firebase/auth';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const from = (location.state as { from?: string })?.from || '/';

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.displayName) {
        navigate('/onboarding', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [currentUser, navigate, from]);

  // const handleAuthSuccess = async (firebaseUser: FirebaseUser) => {
  //   try {
  //     // Create or update user data in Firestore
  //     await dal.user.createUser({
  //       id: firebaseUser.uid,
  //       email: firebaseUser.email || email,
  //       profile: {
  //         full_name: firebaseUser.displayName || displayName,
  //         photo_url: firebaseUser.photoURL || undefined
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error creating user data:', error);
  //     throw error;
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && !displayName.trim()) {
      setError('Display name is required');
      return;
    }

    try {
      if (isLogin) {
        // Sign in
        const firebaseUser = await dal.auth.signIn(email, password);
        // await handleAuthSuccess(firebaseUser);
      } else {
        // Sign up
        const firebaseUser = await dal.auth.signUp(email, password, displayName);
        // await handleAuthSuccess(firebaseUser);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to complete the request. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const firebaseUser = await dal.auth.signInWithGoogle();
      // await handleAuthSuccess(firebaseUser);
    } catch (error) {
      setError((error as Error).message || 'Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#470447] py-12 px-4 sm:px-6 lg:px-8">
      <NavBar />
      <div className="max-w-md w-full space-y-8">
        {/* Title Section */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="text-center mt-2 text-sm text-gray-300">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-purple-300 hover:text-purple-100"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#470447] text-gray-300">Or continue with email</span>
          </div>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            {/* Display Name Field (Sign Up only) */}
            {!isLogin && (
              <div>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required={!isLogin}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Your Full Name"
                />
              </div>
            )}
            <br />
            {/* Email Field */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <br />
            {/* Password Field */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                minLength={6}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
