import React, { useState } from 'react'
import styled from 'styled-components'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link,useNavigate } from 'react-router-dom';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useUser } from './UserContext';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// rgb(59 130 246 / .5)

interface Props {
  state: boolean;
}

const HeaderWraper=styled.div`
   width:90%;
   height:60px;
   border-radius:7px;
   background-color:#f7f6f6;  
   display:flex;
   align-items:center;
   justify-content:space-between;
   margin-left:10px;
   @media screen and (max-width:1200px){
    width:85%;
  }
   @media screen and (max-width:768px){
    position:absolute;
    transition:0.5s;
    width:100%;
    margin-left:0;
    border-radius:0;
    z-index: 1000000;
  }
`

const FlexBox=styled.div`
  display:flex;
  align-items:center;
  width:210px;
  justify-content:space-between;
  margin-left:10px;
`
const Burger=styled.div`
   width:40px;
   height:40px;
   border-radius:8px;
   border:1px solid #a7a3a3;
   display:flex;
   justify-content:center;
   align-items:center;
  
`
const Image=styled.img`
  width:40px;
  height:40px;
  object-fit:contain;
  @media screen and (max-width:768px){
    display:none;
  }
`
const School=styled.p`
 width:80px;
 @media screen and (max-width:768px){
    display:none;
  }
  
`
const Notific=styled.div`
   width:40px;
   height:40px;
   border-radius:8px;
   background-color: #a7a3a3;
   display:flex;
   justify-content:center;
   align-items:center;
`
const SchoolNumber=styled.p`
  font-size:14px;
  @media screen and (max-width:1024px){
    display:none;
  }
 
`
const UserBox=styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
`
const SchoolBox=styled.div`
   display:flex;
   justify-content:space-between;
   align-items:center;
   border-right:5px solid #1930b3;
   padding:10px;
   height:30px;
   width:350px;
   @media screen and (max-width:1024px){
    width:40px;
    border:none;
  }
`
const UserWraper=styled.div`
  display:flex;
  padding:10px;
  justify-content:space-between;
  align-items:center;
  width:210px;
  @media screen and (max-width:1024px){
    width:50px;
  }
`
const ProfileImage=styled.img`
  width:40px;
  height:40px;
  object-fit:cover;
  border-radius:10px;
`
const Accordeon=styled.div`
  width:40px;
   height:40px;
   border-radius:8px;
   border:1px solid #ccc9c9;
   display:flex;
   justify-content:center;
   align-items:center;
   @media screen and (max-width:1024px){
    display:none;
  }
`
const User=styled.p`
  @media screen and (max-width:1024px){
    display:none;
  }
`
const Navbar=styled.div<Props>`
  width:75px;
  height:500px;
  border-radius:10px;
  background-color:#174978;
  padding:15px;
  /* position:fixed;
  top:30px;
  left:20px; */
  @media screen and (max-width:768px){
    width: ${(props) => (props.state?'100%': '75px')};
    transform: ${(props) => (props.state ? 'translateX(0px)' : 'translateX(-500px)')};
    transition:0.5s;
    height:100vh;
    padding:0px;
    border-radius:0;
    padding:0px 40px 0px 40px;
    margin-top:60px;
  }
`
const NavbarMenu=styled.div`
  display:none;
  @media screen and (max-width:768px){
    display:block;
  }
`
const NavSchoolNumber=styled.p`
  font-size:14px;
  color:#fff;
`
const NavWraper=styled.div`
  width:90%;
  height:30px;
  border-radius:4px;
  border:1px solid #a09b9b;
  padding:10px;
  margin-top:50px;
`
const NavImage=styled.img`
  width:40px;
  height:40px;
  object-fit:contain;
`
const NavSchool=styled.p`
  width:80px;
  text-align:center;
  margin-top:10px;
  color:#fff;
`
const Wraper=styled(Link)`
  text-decoration:none;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top:30px;
  @media screen and (max-width:768px){
    flex-direction:row;
    align-items:center;
    justify-content:start;
    margin-top:50px;
  }
`
const Text=styled.p`
  color:#fff;
  margin-top:10px;
  font-size:14px;
  @media screen and (max-width:768px){
    margin-top:0px;
    margin-left:20px;
  }
`

const HeaderBox=styled.div`
  display:flex;
  width:100%;
  justify-content:space-around;
  position:fixed;
  top:0;
  height:60px;
  z-index:100;
  padding-top:20px;
  background-color:#fff;
  padding-left:10px;
  padding-right:10px;
  box-sizing:border-box;
  @media screen and (max-width:768px){
    justify-content:center;
    padding:0;
  }
`
const HeaderProfile=styled.div`
   position:fixed;
   right:30px;
   top:100px;
   width:230px;
   height:150px;
   background-color:#fff;
   border:1px solid #a59c9c;
   border-radius:20px;
   padding:20px;
   z-index: 2000;
`
const ProfileWraper=styled.div`
  margin-top:20px;
`
const Info=styled.p`
  margin-left:30px;
  font-weight:bold;
  color:#262626;
`
const ProfileLink=styled(Link)`
  text-decoration:none;
  display:flex;
`
const Span=styled.span`
  font-weight:400;
  @media screen and (max-width:1024px){
    display:none;
  }
`

export default function Header() {
  const[state,setState]=useState<boolean>(false)
  const handleClick=()=>{
    setState(!state)    
  }
const[arrow,setArrow]=useState(false)
const changeArrow=()=>{
  setArrow(!arrow)
}
const{user,logout}=useUser()
const nav=useNavigate();
const logOut=()=>{
  logout()
  nav("/login")
  window.location.reload();
}

  return (
    <>
    <HeaderBox state={state} onClick={handleClick}>
      <Navbar state={state}>
       {state?
        <NavbarMenu>
        <Wraper to={'/'}>
            <NavImage src={'https://onlineschool.emis.ge/assets/svg_icons/brand.svg'}/>
            <NavSchool>ონლაინ სკოლა</NavSchool>
        </Wraper>
        <NavWraper>
        <NavSchoolNumber>სსიპ - ქალაქ თბილისის №55 საჯარო სკოლა</NavSchoolNumber>
        </NavWraper>
        </NavbarMenu>
        :''}
        <Wraper to={'/register'}>
          <Person2OutlinedIcon style={{color:'#fff'}}/>
          <Text>რეგისტრაცია</Text>
        </Wraper>
        {!user?
        <>
        <Wraper to={'/login'}>
          <LoginOutlinedIcon style={{color:'#fff'}}/>
          <Text>შესვლა</Text>
        </Wraper>
        </>
        :''}
        <Wraper to={'/calendar'}>
          <CalendarTodayOutlinedIcon style={{color:'#fff'}}/>
          <Text>კალენდარი</Text>
        </Wraper>
        {user?.status==='მოსწავლე'?
        <Wraper to={'/subjects'}>
          <SubjectOutlinedIcon style={{color:'#fff'}}/>
          <Text>საგნები</Text>
        </Wraper>:''}
        <Wraper to={`/profile/${user?._id}`}>
          <AccountCircleOutlinedIcon style={{color:'#fff'}}/>
          <Text>პროფილი</Text>
        </Wraper>
        {user?.status==='მასწავლებელი'?
         <Wraper to={`/studentslist`}>
         <AccountCircleOutlinedIcon style={{color:'#fff'}}/>
         <Text>მოსწავლე</Text>
       </Wraper>
        :''}
      </Navbar>
      {/* </HeaderBox> */}

      <HeaderWraper state={state}>
        <FlexBox>
          <Burger onClick={handleClick}>
            <MenuOutlinedIcon/>
          </Burger>
          <Link style={{display:'flex',textDecoration:'none',width:150,justifyContent:'space-between'}} to={'/'}>
          <Image src={'https://onlineschool.emis.ge/assets/svg_icons/brand.svg'}/>
          <School>ონლაინ სკოლა</School>
          </Link>
        </FlexBox>
        <UserBox>
          <SchoolBox>
            <Notific>
              <NotificationsNoneOutlinedIcon/>
            </Notific>
            <SchoolNumber>სსიპ - ქალაქ თბილისის №55 საჯარო სკოლა</SchoolNumber>
          </SchoolBox>
          <UserWraper>
            <ProfileImage  src='https://onlineschool.emis.ge/assets/images/pattern.png'/>
            <div style={{display:'flex',flexDirection:'column'}}>
            {user?.status==='მასწავლებელი'?
            <User style={{fontSize:12}}>მასწავლებელი</User>:
            <User>მოსწავლე</User>
            
            }
            <Span >{user?.name}</Span>
            </div>
            <Accordeon onClick={changeArrow}>
              {arrow?<KeyboardArrowDownOutlinedIcon/>:<KeyboardArrowUpOutlinedIcon/>}
              {arrow?
              <HeaderProfile>
                <ProfileWraper>
                  <ProfileLink to={`/profile/${user?._id}`}>
                  <AccountBoxOutlinedIcon style={{color:"#bbb3b3"}}/>
                  <Info>პირადი ინფორმაცია</Info>
                  </ProfileLink>
                </ProfileWraper>
                <ProfileWraper>
                  <ProfileLink to={'/parameters/changepassword'}>
                  <ManageAccountsOutlinedIcon style={{color:"#bbb3b3"}}/>
                  <Info>პარამეტრები</Info>
                  </ProfileLink>
                </ProfileWraper>
                <ProfileWraper onClick={logOut}>
                  <ProfileLink to={''}>
                  <LogoutOutlinedIcon style={{color:"#bbb3b3"}}/>                  
                  <Info>სისტემიდან გასვლა</Info>
                  </ProfileLink>
                  </ProfileWraper>
              </HeaderProfile>:''}
            </Accordeon>
          </UserWraper>
        </UserBox>
      </HeaderWraper>
      </HeaderBox>
      </>
  )
}
