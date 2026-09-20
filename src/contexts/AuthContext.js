import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ==============================
  // ĐỌC USER TỪ LOCALSTORAGE
  // ==============================
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);

        if (parsedUser?.username) {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error('Không thể đọc user:', error);
      localStorage.removeItem('user');
    }
  }, []);

  // ==============================
  // LOGIN
  // ==============================
  const login = (userData) => {
    const normalizedUser = {
      username: userData.username,
      role: userData.role || 'customer',
    };

    localStorage.setItem(
      'user',
      JSON.stringify(normalizedUser)
    );

    setUser(normalizedUser);
  };

  // ==============================
  // LOGOUT
  // ==============================
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // ==============================
  // THÔNG TIN USER
  // ==============================
  const isLoggedIn = Boolean(user);

  const username = user?.username || '';

  const role = user?.role || 'customer';

  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        username,
        role,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};