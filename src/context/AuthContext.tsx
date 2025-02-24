// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    console.log('Checking session...');
    axios.get('http://localhost:5000/api/auth/check-session', { 
        withCredentials: true 
    })
      .then(response => {
        if (response.data.user) {
          console.log('Session validated:', response.data.user);
          setUser(response.data.user);
        } else {
          console.warn('No user found in session response');
          setUser(null);
        }
      })
      .catch((error) => {
        console.error('Session Check Failed:', error.response?.data || error.message);
        setUser(null);
      });
  }, []);

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { 
        withCredentials: true 
      });
      setUser(null);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout Error:', error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
