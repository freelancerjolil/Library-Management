import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../axios/axiosInstance';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create a new user (Register)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  // Sign in an existing user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  // Sign in using Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user); // Properly set the user object in state
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign out the current user
  const logout = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setLoading(false);
      setUser(null);
    });
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('State captured:', currentUser?.email);

      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios
          .post('/jwt', user, { withCredentials: true })
          .then((res) => console.log('Login token:', res.data))
          .finally(() => setLoading(false));
      } else {
        axios
          .post(
            '/logout',
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => console.log('Logout:', res.data))
          .finally(() => setLoading(false));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// Hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);
