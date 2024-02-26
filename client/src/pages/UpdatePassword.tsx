import React, { useState } from 'react'
import styled from 'styled-components'
import { publicRequest } from '../components/requestmethods'


const Container=styled.div`
  width:100%;
  height:100vh;
  background-color:#003A6B;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const Input=styled.input`
    width:300px;
    height:60px;
    border-radius:10px;
    outline:none;
    border:none;
    margin-top:30px;
`
const Button=styled.button`
    margin-top:20px;
    width:300px;
    height:40px;
    border-radius:10px;
    border:none;
    background-color:#5e94fa;
    color:#fff;
`
const Label=styled.label`
   color:#fff;
`
export default function UpdatePassword() {
    const[email,setEmail]=useState<string>()
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }
    const handleClick=()=>{
        async function fetchData(){
            try{
            await publicRequest.post('/sendemail',{email:email})
            window.location.reload()
            } catch(error){
              console.error('Error fetching data:', error);
            };
          }
            fetchData();
    }
    
  return (
    <Container>        
        <Label>შეიყვანეთ თქვენი იმეილი</Label>
        <Input onChange={(e)=>handleChange(e)} type='email' name='email'/>
        <Button onClick={handleClick}>გაგზავნა</Button>
    </Container>
  )
}

