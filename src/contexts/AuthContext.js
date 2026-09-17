import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('customer');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      setRole(user.role || 'customer');
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  const login = (user) => {
    const normalizedUser = {
      username: user.username,
      password: user.password || '',
      role: user.role || 'customer',
    };

    setIsLoggedIn(true);
    setUsername(normalizedUser.username);
    setRole(normalizedUser.role);
    setIsAdmin(normalizedUser.role === 'admin');
    localStorage.setItem('user', JSON.stringify(normalizedUser));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setRole('customer');
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, role, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
