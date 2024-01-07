import { Outlet, useLocation, useNavigate ,Navigate} from 'react-router-dom'
import Header from './Header'
import styled from 'styled-components';
import { useUser } from './UserContext';
import { useEffect, useState } from 'react';



const Wraper=styled.div`
`

export default function Root() {
  const{user,logout}=useUser()
  const loc=useLocation()
  const useAuth=()=>{
    const user=localStorage.getItem('user')
    if(user){
      return true
    } else {
      return false
    }
  }
  const auth=useAuth();
  const nav=useNavigate()


  
  return(
    auth?
    <Wraper style={{paddingBottom:loc.pathname!=='/register'&&loc.pathname!=='/login'?'60px':'0px'}}>
    {loc.pathname!=='/register'&&loc.pathname!=='/login'&&loc.pathname!=='/calendar'&&loc.pathname!=='/subjects'?<Header/>:''}
    <Outlet/>
    </Wraper>
    :<Navigate to="/login"/>
  )
}