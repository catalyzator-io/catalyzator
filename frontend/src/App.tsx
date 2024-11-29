import React from 'react';
import AppRouter from './AppRouter';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: 'green',
              color: '#fff',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: 'red',
              color: '#fff',
            },
          },
        }}
      />
      <AppRouter />
    </>
  );
};

export default App;
