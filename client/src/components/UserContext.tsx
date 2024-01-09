import React, { createContext, useContext, useEffect, useState } from 'react';




interface User {
  _id: string;
  username: string;
  accessToken:string;
  confirmpassword:string;
  email:string
  lastname:string;
  name:string;
  privatenumber:string;
  status:string;
  verified:boolean;
  image:string;
}
interface UserContextType {
  user: User |null;
  login: (userData: User) => void;
  logout: () => void;
  studentGrade: (grade: any) => void; 
  studentGrades: any; 
  token:string;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User|null>(null);
  const[studentGrades,setStudentGrades]=useState({})
  const[token,setToken]=useState('')


  
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
  useEffect(() => {
    // const storedUser = JSON.parse(localStorage.getItem('token')||'null');
    const storedUser=localStorage.getItem('token')

    if (storedUser) {
      setToken(storedUser);
    }
  }, []);


  const login = (userData:User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userData.accessToken)
    localStorage.setItem('token', JSON.stringify(userData.accessToken));
  };
  
  const studentGrade=(grade:any)=>{
    setStudentGrades(grade)
    localStorage.setItem('id', JSON.stringify(studentGrades));
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout,studentGrade,studentGrades,token}}>
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
