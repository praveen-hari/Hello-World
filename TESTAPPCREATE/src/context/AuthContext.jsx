import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const mockUser = {
  id: 1,
  name: 'Rahul Sharma',
  email: 'rahul.sharma@gmail.com',
  phone: '+91 98765 43210',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
  address: {
    line1: '42, MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
  },
  orders: [
    { id: 'ORD-1001', date: '2024-01-15', total: 26990, status: 'Delivered', items: 2 },
    { id: 'ORD-1002', date: '2024-02-20', total: 64999, status: 'Shipped', items: 1 },
    { id: 'ORD-1003', date: '2024-03-05', total: 3499, status: 'Processing', items: 3 },
  ],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (email, password) => {
    // BUG #13: Missing form validation — no check for empty/invalid email or password
    setUser(mockUser);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
