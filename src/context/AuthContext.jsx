import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser({
              ...currentUser, // This includes all the user data from Firebase, including photoURL
              photoURL: currentUser.photoURL || 'default-photo-url.jpg', // Optional fallback to default
            });
          } else {
            setUser(null); // Handle case when no user is logged in
          }
          setLoading(false);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
      })
      .catch((error) => {
        console.error('Error setting persistence:', error.message);
      });
  }, []);

  // Register a new user (sign-up)
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in an existing user (email/password)
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const googleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error('Google login error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Log out the current user
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null); // Explicitly clear user after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update user's profile information
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // Context value to be provided to children components
  const authInfo = {
    user,
    setUser, // You may not need this in your components if you don't need to manually update `user`
    createNewUser,
    userLogin,
    googleLogin,
    logout,
    loading,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook to use AuthContext in other components
export const useAuth = () => useContext(AuthContext);
