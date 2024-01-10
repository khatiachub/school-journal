import  { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import menu from '../images/menu (1).svg'
import { Link,useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { userRequest } from './requestmethods';
import emis from '../images/emiss.svg'
import logoutIcon from '../images/log-out.svg'
import home from '../images/home.svg'
import userIcon from '../images/user.svg'
import loginIcon from '../images/log-in (1).svg'
import calendar from '../images/calendar.svg'
import arrowdown from '../images/arrow-down.svg'
import arrowup from '../images/arrow-up.svg'
import settings from '../images/settings.svg'
import closeIcon from '../images/x (1).svg'
import userIcon2 from '../images/user (2).svg'

interface Props {
  state: boolean;
}

const HeaderWraper=styled.div`
   width:90%;
   height:70px;
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
  align-items:start;
  width:210px;
  justify-content:space-between;
  margin-left:10px;
`
const Burger=styled.div`
  display:none;
@media screen and (max-width:768px) {
   width:40px;
   height:40px;
   border-radius:8px;
   border:1px solid #a7a3a3;
   display:flex;
   justify-content:center;
   align-items:center;
}
`
const Image=styled.img`
  width:80px;
  height:80px;
  object-fit:contain;
  @media screen and (max-width:768px){
    display:none;
  }
`
const School=styled.p`
 width:80px;
 color:#262626;
 @media screen and (max-width:768px){
    display:none;
  }
  
`

const SchoolNumber=styled.p`
  font-size:14px;
  @media screen and (max-width:1024px){
    display:none;
  }
 
`
const UserBox=styled.div`
   display:flex;
   justify-content:space-between;
   align-items:center;
   width:560px;
`
const SchoolBox=styled.div`
   display:flex;
   justify-content:space-between;
   align-items:center;
   border-right:5px solid #6EB1D6;
   padding:10px;
   height:20px;
   width:290px;
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
  max-width:210px;
  width:100%;
  box-sizing:border-box;
  @media screen and (max-width:1024px){
    width:70px;
  }
  @media screen and (max-width:485px){
    width:60px;
    padding:0px;
  }
`
const ProfileImage=styled.img`
  width:40px;
  height:40px;
  object-fit:contain;
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
  height:400px;
  border-radius:10px;
  background-color:#174978;
  padding:0px 15px 15px 15px;
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
  margin-top:5px;
`
const NavWraper=styled.div`
  width:90%;
  height:50px;
  border-radius:4px;
  border:1px solid #a09b9b;
  padding:10px;
  margin-top:50px;
`
const NavImage=styled.img`
  width:60px;
  height:60px;
  object-fit:cover;
`
const NavSchool=styled.p`
  width:80px;
  text-align:center;
  margin-top:10px;
  color:#fff;
  margin-left:20px;
`
const Wraper=styled(Link)`
  text-decoration:none;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top:40px;
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
  font-size:12px;
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
   @media screen and (max-width:1024px){
    width:100%;
    left:0;
    right:0;
    height:100vh;
    border:none;
  }
`
const Close=styled.div`
  position:absolute;
  right:15px;
  color:#ccc6c6;
  top:10px;
  @media screen and (max-width:1024px){
    right:60px;
    font-size:25px;
    font-weight:bold;
  }
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
const ref = useRef<HTMLButtonElement | null>(null);
const changeArrow=()=>{
  setArrow(!arrow)
  ref.current?.click()
}
const{user,logout}=useUser()
const nav=useNavigate();
const logOut=()=>{
  logout()
  nav("/login")
  window.location.reload();
}
const[userImage,setUserImage]=useState('')
useEffect(() => {
  async function getData() {
    try {
      if (user) {  // Check if user is defined
        const response = await userRequest.get(`/find/${user._id}`);
        setUserImage(response.data.image);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  getData();
}, [user]); 
  return (
    <>
    <HeaderBox>
      <Navbar state={state}>
       {state?
        <NavbarMenu>
        <Wraper to={'/'}>
            <NavImage src={emis}/>
            <NavSchool>ონლაინ სკოლა</NavSchool>
        </Wraper>
        <NavWraper>
        <NavSchoolNumber>სსიპ - ქალაქ თბილისის №55 საჯარო სკოლა</NavSchoolNumber>
        </NavWraper>
        </NavbarMenu>
        :''}
         <Wraper to={`/`}>
         <img src={home}/>
         <Text>მთავარი</Text>
       </Wraper>
        <Wraper to={'/register'}>
          <img src={userIcon}/>
          <Text>რეგისტრაცია</Text>
        </Wraper>
        {!user?
        <>
        <Wraper to={'/login'}>
        <img src={loginIcon}/>
          <Text>შესვლა</Text>
        </Wraper>
        </>
        :''}
        <Wraper to={'/calendar'}>
        <img src={calendar}/>
          <Text>კალენდარი</Text>
        </Wraper>
        <Wraper to={`/profile/${user?._id}`}>
        <img src={userIcon}/>
          <Text>პროფილი</Text>
        </Wraper>
        
      </Navbar>
      <HeaderWraper >
        <FlexBox>
          <Burger  onClick={handleClick}>
            <img src={menu}/>
          </Burger>
          <Link style={{display:'flex',textDecoration:'none',width:170,justifyContent:'space-around',fontSize:14}} to={'/'}>
          <Image  src={emis}/>
          <School style={{marginTop:20}}>ონლაინ სკოლა</School>
          </Link>
        </FlexBox>
        <UserBox>
          <SchoolBox>
            <SchoolNumber>სსიპ - ქალაქ თბილისის №55 საჯარო სკოლა</SchoolNumber>
          </SchoolBox>
          <UserWraper>
            <ProfileImage onClick={changeArrow}  src={userImage?userImage:'https://onlineschool.emis.ge/assets/images/pattern.png'}/>
            <div style={{display:'flex',flexDirection:'column'}}>
            {user?.status==='მასწავლებელი'?
            <User style={{fontSize:12}}>მასწავლებელი</User>:
            <User>მოსწავლე</User>
            }
            <Span >{user?.name}</Span>
            </div>
            <Accordeon  onClick={changeArrow}>
              {arrow?
              <img src={arrowdown}/>:<img src={arrowup}/>
              }
            </Accordeon>
              {arrow?
              <HeaderProfile>
                <Close onClick={changeArrow}>
                <img src={closeIcon}/>
                </Close>
                <ProfileWraper>
                  <ProfileLink to={`/profile/${user?._id}`}>
                  <img src={userIcon2}/>
                  <Info>პირადი ინფორმაცია</Info>
                  </ProfileLink>
                </ProfileWraper>
                <ProfileWraper>
                  <ProfileLink to={'/parameters/changepassword'}>
                    <img src={settings}/>
                  <Info>პარამეტრები</Info>
                  </ProfileLink>
                </ProfileWraper>
                <ProfileWraper onClick={logOut}>
                  <ProfileLink to={''}>
                    <img src={logoutIcon}/>
                  <Info>სისტემიდან გასვლა</Info>
                  </ProfileLink>
                  </ProfileWraper>
              </HeaderProfile>:''}
          </UserWraper>
        </UserBox>
      </HeaderWraper>
      </HeaderBox>
      </>
  )
}
