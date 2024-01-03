import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useUser } from '../components/UserContext'
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { userRequest } from '../components/requestmethods';



const Container=styled.div`
  width:89.5%;
  margin-top:17vh;
  height:150px;
  background-color:#C1D1DB;
  border-bottom-right-radius:70px;
  border-bottom-left-radius:70px;
  border-top-right-radius:20px;
  border-top-left-radius:20px;
  z-index:0 ;
  padding-top:10vh;
  box-sizing:border-box; 
  @media screen and (max-width:1200px){
    width:85%;
  }
  @media screen and (max-width:900px){
    width:84%;
  }
  @media screen and (max-width:768px){
    width:98%;
  }
  @media screen and (max-width:485px){
    padding:0;
    margin-top:10vh;
  }
`

const ContainerWraper=styled.div`
  width:100%;
  display:flex;
  justify-content:end;
  margin:0 auto;
  padding-right:15px;
  box-sizing:border-box;
  @media screen and (max-width:900px){
    padding-right:10px;
  }
  @media screen and (max-width:768px){
    justify-content:center;
    padding:15px;
  }
  
`
const ProfileWraper=styled.div`
  width:85%;
  margin:0 auto;
  height:410px;
  background-color:#fff;
  z-index: 10;
  border-radius:10px;
  box-shadow: #cac5c5 2px 4px 8px ;
  padding:20px;
  box-sizing:border-box;
  @media screen and (max-width:768px){
    width:93%;
  }
  @media screen and (max-width:485px){
    width:100%;
  }
`
const ProfilePictureBox=styled.div`
  height:130px;
  background-color:#174978;
  border-radius:10px;
  margin: 0 auto;
  display:flex;
  padding:10px;
  align-items:center;
`

const Name=styled.h1`
  color:#fff;
  @media screen and (max-width:485px){
    font-size:19px;
  }
`
const Status=styled.p`
  color:#fff;
  margin-top:10px;
`
const Image=styled.img`
  width:100px;
  height:100px;
  object-fit:cover;
  border-radius:10px;
  margin-left:20px;
  @media screen and (max-width:485px){
    width:60px;
    height:60px;  }
`
const Icon=styled.div`
  width:50px;
  height:50px;
  border-radius:15px;
  border:1px solid #97EBF4;
  background-color: #f3fafc;
  padding:5px;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Private=styled.div`
  height:60px;
  padding:10px;
  margin-top:30px;
  background-color:#edfbff;
  border-radius:10px;
  display:flex;
`
const PrivateNumber=styled.div`
  margin-left:10px;
`
const NumberValue=styled.h3`
 margin-top:10px;
 color:#413e3e;
`
const Number=styled.p`
 color:#c0bcbc;
`





export default function Profile() {
  const{user,login}=useUser()
  const ref = useRef<HTMLInputElement>(null);
  const onImageClick=()=>{
    if (ref.current) {
      ref.current.click();
    }  }
    useEffect(() => {
      async function fetchData(){
        try{
        const response=await userRequest.get(`/find/${user._id}`)
        login(response.data);
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
    },[]); 
    return (
      <ContainerWraper>
    <Container>
      <ProfileWraper>
        <ProfilePictureBox>
          <input style={{display:'none'}} type='file' ref={ref}/>
          {user?.image?'':<Image onClick={onImageClick} src='https://onlineschool.emis.ge/assets/images/pattern.png'/>}
          <div style={{marginLeft:20}}>
            <Name>{user?.name}</Name>
            <Status>{user?.status}</Status>
          </div>
        </ProfilePictureBox>
        <Private>
          <Icon>
            <GppMaybeOutlinedIcon/>
          </Icon>
          <PrivateNumber>
            <Number>პირადი ნომერი</Number>
            <NumberValue>{user?.privatenumber}</NumberValue>
          </PrivateNumber>
        </Private>
        <Private>
          <Icon>
            <MailOutlineOutlinedIcon/>
          </Icon>
          <PrivateNumber>
            <Number>ელ-ფოსტა</Number>
            <NumberValue>{user?.email}</NumberValue>
          </PrivateNumber>
        </Private>
      </ProfileWraper>
    </Container>
    </ContainerWraper>
  )
}
