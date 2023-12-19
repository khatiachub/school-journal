import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'



export default function Root() {
const loc=useLocation()
console.log(loc.pathname);

  return(
  <div style={{paddingBottom:60}}>
    {loc.pathname!=='/register'&&loc.pathname!=='/login'?<Header/>:''}
   
     <Outlet/>
    </div>
  )
}