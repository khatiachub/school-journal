import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { publicRequest } from '../components/requestmethods';





const Image = styled.div`
  width: 60%;
  min-height:100vh;
  background:url("https://onlineschool.emis.ge/assets/svg_icons/art-board.svg#Layer_1");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: end;
  background-position:right;
  right:0;
  /* position: fixed; */
`;
const Input=styled.input`
  width:240px;
  height:50px;
  outline:none;
  border:1px solid #3317ad;
  border-radius:36px;
  margin-top:10px;
`
const Button=styled.button`
  width:240px;
  height:50px;
  border:1px solid #3317ad;
  border-radius:36px;
  margin-top:20px;
`
const Radio=styled.input`
  margin-top:10px;
  margin-left:5px;
`
const Title=styled.h3`
  color:#fff;
  margin-top:10px;
`
const Form=styled.form`
  width:100%;
  display:flex;
  flex-direction:column;
  margin-top:20px;
`
const FormWraper=styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  width:40%;
  margin-left:70px;
`
const Container=styled.div`
   display:flex;
   background-color:#101291;
   min-height:100vh;
`
const Label=styled.label`
  color:#fff;
  margin-left:10px;
`
const RadioWraper=styled.div`
  display:flex;
  align-items:baseline;
  margin-top:10px;
`
export default function Register() {
  const { register, handleSubmit,watch,getValues, reset, formState: { errors } } = useForm();

  const name=watch('name')
  const lastname=watch('lastname')
  const email=watch("email")
  const password=watch('password')
  const confirmpassword=watch('confirmpassword')
  const privatenumber=watch('privatenumber')
  const status=watch('status')
  
  const Name=register("name",{required:true})
  const Lastname=register("lastname",{required:true})
  const Email=register("email",{required:true})
  const Privatenumber=register("privatenumber",{required:true})
  const Password=register("password",{required:true})
  const Confirmpassword=register("confirmpassword",{required:true})
  const Status=register("status",{required:true})
  
  const handleClick=()=>{
    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmpassword', confirmpassword);
    formData.append('privatenumber', privatenumber);
    formData.append('status', status);
      const registerUser = async () => {
        try {
          const res = await publicRequest.post("/signup",formData);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      registerUser();       
  }
  
  
  return (
    <Container>
      <FormWraper>
      <Title>რეგისტრაცია</Title>
      <Form onSubmit={handleSubmit(handleClick)}>
       <div style={{display:'flex',justifyContent:'space-between'}}>
       <div style={{width:"240px",marginTop:20}}>
        <Label>სახელი</Label>
        <Input {...Name} 
        // onChange={(e)=>handleChange(e)} 
        name='name' type='text'/>
        </div>
       <div style={{width:"240px",marginTop:20}}>
       <Label>გვარი</Label>
        <Input {...Lastname} 
        // onChange={(e)=>handleChange(e)} 
        name='lastname'  type='text'/>
       </div>
       </div>
        
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{width:"240px",marginTop:20}}>
          <Label>მეილი</Label>
          <Input {...Email} 
          // onChange={(e)=>handleChange(e)} 
          name='email' type='email'/>
          </div>
          <div style={{width:"240px",marginTop:20}}>
          <Label >პირადი ნომერი</Label>
          <Input {...Privatenumber} 
          // onChange={(e)=>handleChange(e)} 
          name='privatenumber' type='number'/>
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{width:"240px",marginTop:20}}>
          <Label>პაროლი</Label>
          <Input {...Password} 
          // onChange={(e)=>handleChange(e)} 
          name='password' type='password'/>
          </div>
          <div style={{width:"240px",marginTop:20}}>
          <Label>გაიმეორეთ პაროლი</Label>
          <Input {...Confirmpassword} 
          // onChange={(e)=>handleChange(e)}
          name='confirmpassword' type='password'/>
          </div>
        </div>
       
       <div style={{display:'flex',justifyContent:'start'}}>
         <RadioWraper>
            <Label>მასწავლებელი</Label>
            <Radio {...Status} 
            // onChange={(e)=>handleChange(e)} 
            name='status' value='მასწავლებელი' type='radio'/>
        </RadioWraper>
        <RadioWraper style={{marginLeft:10}}>
            <Label>მოსწავლე</Label>
            <Radio {...Status} 
            // onChange={(e)=>handleChange(e)} 
            name='status' value='მოსწავლე' type='radio'/>
        </RadioWraper>
       </div>

        <Button  type='submit'>შესვლა</Button>
      </Form>
      </FormWraper>
      <Image/>
    </Container>
  )
}
