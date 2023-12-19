import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[studentGrades,setStudentGrades]=useState({})

  useEffect(() => {
    // Check localStorage for saved user information during initialization
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  useEffect(() => {
    // Check localStorage for saved user information during initialization
    const storedUser = JSON.parse(localStorage.getItem('id'));
    if (storedUser) {
      setStudentGrades(storedUser);
    }
  }, []);
  const login = (userData) => {
    // Assume that your server returns user data upon successful login
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const studentGrade=(grade)=>{
    setStudentGrades(grade)
    localStorage.setItem('id', JSON.stringify(studentGrades));
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout,studentGrade,studentGrades }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
