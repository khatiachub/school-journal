import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../components/requestmethods'
import { useNavigate, useParams } from 'react-router-dom'


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
export default function RecoverPassword() {
    const[value,setValues]=useState({
        password:'',
        confirmpassword:''
    })
    const handleChange=(e)=>{
        setValues({...value,[e.target.name]:e.target.value})
    }
    const params=useParams()
    const{id}=params
    const nav=useNavigate()
    const TOKEN=params.token

    
    const handleClick=()=>{
        const recover= async () => {
            try {
              const res = await axios({
                method: 'put',
                url: `http://localhost:5002/${id}`,
                data: value,
                headers: { token: `Bearer ${TOKEN}`}
              });
                nav("/login")
                
            } catch (err) {
              console.log(err);
            }
          };
          recover();
    }
  return (
    <Container>
        <Input onChange={(e)=>handleChange(e)} type='password' placeholder='password' name='password'/>
        <Input onChange={(e)=>handleChange(e)} type='password' placeholder='confirm password' name='confirmpassword'/>
        <Button onClick={handleClick}>გაგზავნა</Button>
    </Container>
  )
}
