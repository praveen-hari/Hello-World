import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const defaultUser = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '9876543210',
  address: '12 MG Road, Bengaluru, Karnataka 560001',
  role: 'admin',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  const updateUser = (data) => setUser({ ...user, ...data });

  return <AuthContext.Provider value={{ user, updateUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
