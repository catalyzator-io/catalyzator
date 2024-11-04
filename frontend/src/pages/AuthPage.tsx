import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn, signUp, signInWithGoogle, useAuth } from '../auth';
import { checkUserExists } from '../firebase/common_api';
import { addNewUserToFirestore, updateLastLogin } from '../firebase/user_actions_api';
import { FirebaseError } from 'firebase/app';
import NavBar from '../components/NavBar';

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (!isLogin && !displayName.trim()) {
      setError('Display name is required');
      return;
    }
  
    try {
      if (isLogin) {
        const userCredential = await signIn(email, password);
        if (userCredential) {
          await updateLastLogin(userCredential.uid);
        }
      } else {
        const userCredential = await signUp(email, password, displayName);
 
        if (userCredential) {
          // Add new user to Firestore
          await addNewUserToFirestore(userCredential.uid, {
            full_name: displayName,
            email: userCredential.email || email,
          });
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to complete the request. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithGoogle();
      if (userCredential) {
        const { uid, displayName, email } = userCredential;
        // Check if user exists using the separated function
        const userExists = await checkUserExists(uid);
        if (!userExists) {
          // User doesn't exist in Firestore, create new document
          await addNewUserToFirestore(uid, {
            full_name: displayName || '',
            email: email || '',
          });
        } else {
          // User exists, just update last login
          await updateLastLogin(uid);
        }
        
        // Additional success handling (e.g., navigation, state updates)
      }
    } catch (error) {
      setError(error.message || 'Failed to sign in with Google. Please try again.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#470447] py-12 px-4 sm:px-6 lg:px-8">
      <NavBar />
      <div className="max-w-md w-full space-y-8">
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

        <button
          onClick={handleGoogleSignIn}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#470447] text-gray-300">Or continue with email</span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
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
            <br></br>
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
            <br></br>
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
