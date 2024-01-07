// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,  useNavigate, useParams } from 'react-router-dom'
import { userRequest } from './requestmethods'
import styled from 'styled-components'
import { useUser } from './UserContext'
import failicon from '../images/failure.svg'

const SuccessVerify=styled.div`
  width:100%;
  height:100vh;
  border-radius:5px;
  background-color:#1CA3DE;
  position:absolute;
  top:0;
  left:0;
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction:column;
  color:#fff;
  font-size:30px;
`
const Img=styled.img`
    width:100px;
    height:100px;
    object-fit:cover;
    margin-top:20px;
`


export default function VerifyEmail() {
    const{user}=useUser()
    const params=useParams()
    const[success,setSuccess]=useState(false)
    const nav=useNavigate()
    useEffect(()=>{
        if(success){
            const timeoutId = setTimeout(() => {
                nav('/login'); 
              }, 3000);
              return () => clearTimeout(timeoutId);
        }else{
            return
        }
      
       },[success])
    console.log(user);
    
    
    useEffect(()=>{
        const VerifyEmailUrl=async()=>{
            try{
                const url=`/${params.id}/verify/${params.token}`
                const{data}=await userRequest.get(url)
                setSuccess(true)
            }catch(error){
                 console.log(error);
                 
            }
        }
        VerifyEmailUrl()
    },[params])
  return (
    <>
        {success?
        <SuccessVerify>
            <p>
            Email verified successfully
            </p>
            <Img src='https://www.svgrepo.com/show/13650/success.svg'/>
        </SuccessVerify>
        :
        <SuccessVerify>
            <p>Error</p>
            <Img src={failicon}/>
        </SuccessVerify>
        }
    </>
  )
}