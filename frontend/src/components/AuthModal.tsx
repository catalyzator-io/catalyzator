import React, { useState } from 'react';
import { Modal, Tabs, Tab, TextField, Button, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import { signUp, signIn, signInWithGoogle, useAuth } from '../auth';
import { FirebaseError } from 'firebase/app';

const AuthModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [tab, setTab] = useState(0); // 0 for login, 1 for signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (tab === 0) {
        await signIn(email, password);
      } else {
        if (!displayName.trim()) throw new Error('Display name is required');
        await signUp(email, password, displayName);
      }
      onClose();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message || 'Authentication failed');
      } else {
        setError(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      setError('Google Sign-In failed');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-content">
        <IconButton 
          onClick={onClose} 
          style={{ position: 'absolute', top: 10, right: 10 }} 
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          {tab === 1 && (
            <TextField
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          )}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {tab === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Divider style={{ margin: '20px 0' }}>Or</Divider>
        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          color="secondary"
          fullWidth
        >
          Continue with Google
        </Button>
      </div>
    </Modal>
  );
};

export default AuthModal;
