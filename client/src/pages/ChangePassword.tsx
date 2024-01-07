import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../components/requestmethods'
import { useUser } from '../components/UserContext'
import { useNavigate } from 'react-router-dom'


const Container=styled.div`
  width:100%;
  height:100vh;
  background-color:#003A6B;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  position: relative;
  position:fixed;
  top:0;
  left:0;
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
    margin-top:20px;
`
const Wraper=styled.div`
  width:400px;
  height:250px;
  background-color:#5e94fa;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  border-radius:20px;
  display:flex;
  align-items:center;
  padding:10px;
  box-sizing:border-box;
  justify-content:center;
`
const Text=styled.p`
  font-size:22px;
  text-align:center;
  color:#fff;
`
export default function ChangePassword() {
    const[userpassword,setUser]=useState({
        password:'',
        newPassword:'',
        confirmNewpassword:''
    })
    const{user}=useUser()
    const[success,setSuccess]=useState(false)
    const handleClick=()=>{
        async function fetchData(){
            try{
            const response=await userRequest.put(`/changepassword/${user?._id}`,userpassword)
            console.log(response.data);
            setSuccess(true)
            // window.location.reload()
            } catch(error){
              console.error('Error fetching data:', error);
            };
          }
            fetchData();
    }
    const handleChange=(e)=>{
        setUser({...userpassword,[e.target.name]:e.target.value})
    }
    const nav=useNavigate()
    useEffect(()=>{
        if(success){
            const timeoutId = setTimeout(() => {
              nav('/'); 
            }, 3000);
            return () => clearTimeout(timeoutId);
          }
    },[success])
  return (
    <Container>
        <Label>შეიყვანეთ ამჟამინდელი პაროლი</Label>
        <Input name='password' onChange={(e)=>handleChange(e)}/>
        <Label>შეიყვანეთ ახალი პაროლი</Label>
        <Input name='newPassword' onChange={(e)=>handleChange(e)}/>
        <Label>გაიმეორეთ ახალი პაროლი</Label>
        <Input name='confirmNewpassword' onChange={(e)=>handleChange(e)}/>
        <Button onClick={handleClick}>შეცვლა</Button>
        {success?
        <Wraper>
            <Text>პაროლი წარმატებით განახლდა</Text>
        </Wraper>
        :''}
    </Container>
  )
}
