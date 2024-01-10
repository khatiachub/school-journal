import Journal from './components/Journal'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Studentroom from './components/Studentroom'
import Root from './components/Root'
import styled, { createGlobalStyle } from 'styled-components'
import Calendars from './pages/Calendar';
import Subjects from './pages/Subjects';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Subject from './pages/Subject';
import VerifyEmail from './components/VerifyEmail';
import RecoverPassword from './pages/RecoverPassword';
import UpdatePassword from './pages/UpdatePassword';
import ChangePassword from './pages/ChangePassword';


const GlobalStyle = createGlobalStyle`
  * {
    /* box-sizing: border-box; */
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans Georgian', sans-serif;
  }
`
const BodyWrapper = styled.body`
  /* background-color: #262626;
	min-height: 100vh;
	font-family: sans-serif; */
`;


function App() {
  return (
    <BodyWrapper>
    <GlobalStyle />
    <Router>
    <Routes>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/:id/verify/:token'  element={<VerifyEmail/>}/>
       <Route path='/recoverpassword/:id/:token'  element={<RecoverPassword/>}/>
       <Route path='/recoverpassword'  element={<UpdatePassword/>}/>

       <Route path='/' element={<Root/>}>
       <Route index element={<Journal/>}/>
       <Route path="/student/:id" element={<Studentroom/>}/>
       <Route path='/calendar' element={<Calendars/>}/>
       <Route path='/subjects' element={<Subjects/>}/>
       <Route path='/subjects/:sub' element={<Subject/>}/>
       <Route path='/profile/:id' element={<Profile/>}/>
       {/* <Route path='/studentslist'  element={<Journal/>}/> */}
       <Route path='/parameters/changepassword'  element={<ChangePassword/>}/>
       </Route>
    </Routes>
    </Router>    
    </BodyWrapper>
  )
}

export default App
