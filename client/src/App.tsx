
import Journal from './components/Journal'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Studentroom from './components/Studentroom'
import Root from './components/Root'
import styled, { createGlobalStyle } from 'styled-components'
import Calendars from './pages/Calendar';
import Subjects from './pages/Subjects';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Subject from './pages/Subject';
import Home from './pages/Home';



const GlobalStyle = createGlobalStyle`
  * {
    /* box-sizing: border-box; */
    margin: 0;
    padding: 0;
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
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Root/>}>
       <Route index  element={<Home/>}/>
       <Route path="/student/:id" element={<Studentroom/>}/>
       <Route path='/calendar' element={<Calendars/>}/>
       <Route path='/subjects' element={<Subjects/>}/>
       <Route path='/subjects/:sub' element={<Subject/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/profile/:id' element={<Profile/>}/>
       <Route path='/studentslist'  element={<Journal/>}/>
       </Route>
    </Routes>
    </BrowserRouter>    
    </BodyWrapper>
  )
}

export default App
