import React, { useRef } from 'react'
import styled from 'styled-components'
import { useUser } from '../components/UserContext'
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

const Container=styled.div`
  width:85%;
  margin:0 auto;
  top:20vh;
  height:150px;
  position:relative;
  left:11.5vh;
  background-color:#55555cc9;
  /* border-radius:36px; */
  border-bottom-right-radius:70px;
  border-bottom-left-radius:70px;
  border-top-right-radius:20px;
  border-top-left-radius:20px;
  z-index:0 ;
`
const ProfileWraper=styled.div`
  width:85%;
  margin:0 auto;
  top:6vh;
  height:370px;
  position:absolute;
  left:11vh;
  background-color:#fff;
  z-index: 10;
  border-radius:10px;
  box-shadow: #cac5c5 2px 4px 8px ;
  padding:20px;
`
const ProfilePictureBox=styled.div`
  height:130px;
  background-color:#270c8a;
  border-radius:10px;
  margin: 0 auto;
  display:flex;
  padding:10px;
  align-items:center;
`

const Name=styled.h1`
  color:#fff;
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
`
const Icon=styled.div`
  width:50px;
  height:50px;
  border-radius:15px;
  border:1px solid #079481;
  background-color: #cbe9e5;
  padding:5px;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Private=styled.div`
  height:60px;
  padding:10px;
  margin-top:30px;
  background-color:#f3efef;
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
  const{user}=useUser()
  const ref=useRef(null)
  const onImageClick=()=>{
    ref.current.click();
  }
    return (
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
  )
}
