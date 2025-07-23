import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setAuthState({
            user: parsedUser,
            token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          console.error("Error parsing user data", error);
          logout();
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = (apiResponse) => {
    localStorage.setItem('token', apiResponse.access_token);
    localStorage.setItem('userData', JSON.stringify(apiResponse.user));
    
    setAuthState({
      user: apiResponse.user,
      token: apiResponse.access_token,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {!authState.isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};