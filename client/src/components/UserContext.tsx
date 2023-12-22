import React, { createContext, useContext, useEffect, useState } from 'react';




interface User {
  _id: string;
  username: string;
  accesstoken:string;
  confirmpassword:string;
  email:string
  lastname:string;
  name:string;
  privatenumber:string;
  status:string;
  verified:boolean;
  image:string
}
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  studentGrade: (grade: any) => void; 
  studentGrades: any; 
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const[studentGrades,setStudentGrades]=useState({})

  useEffect(() => {
    // Check localStorage for saved user information during initialization
    const storedUser = JSON.parse(localStorage.getItem('user')||'null');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  useEffect(() => {
    // Check localStorage for saved user information during initialization
    const storedUser = JSON.parse(localStorage.getItem('id')||'null');
    if (storedUser) {
      setStudentGrades(storedUser);
    }
  }, []);
  const login = (userData:User) => {
    // Assume that your server returns user data upon successful login
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const studentGrade=(grade:any)=>{
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
