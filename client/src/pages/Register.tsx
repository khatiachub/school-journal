import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { publicRequest } from '../components/requestmethods';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Image = styled.div`
  width: 60%;
  min-height:100vh;
  background:url("https://onlineschool.emis.ge/assets/svg_icons/art-board.svg#Layer_1");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: end;
  background-position:left;
  @media screen and (max-width:1024px) {
    display:none
  }
`
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
  color:#fff;
  font-size:20px;
  height:50px;
  border:1px solid #5e94fa;
  border-radius:36px;
  margin-top:20px;
  background-color:#5e94fa;
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
  /* width:100%; */
  display:flex;
  flex-direction:column;
  margin-top:20px;
`
const FormWraper=styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  width:45%;
  margin-left:70px;
  min-height:100vh;
  box-sizing:border-box;
  padding:10px;
  padding-bottom:50px;
  @media screen and (max-width:1172px) {
    width:250px;
    margin-left:130px;
  }
  @media screen and (max-width:1024px) {
    margin-left:0px;
  }
`
const Container=styled.div`
   display:flex;
   justify-content:space-between;
   background-color:#003A6B;
   min-height:100vh;
   width:100%;
   position: relative;
   @media screen and (max-width:1024px) {
    justify-content:center;
  }
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

const InputWraper=styled.div`
  display:flex;
  justify-content:space-between;
  @media screen and (max-width:1172px) {
    flex-direction:column;
  }
  @media screen and (max-width:1024px) {
    flex-direction:row;
  }
  @media screen and (max-width:510px) {
    flex-direction:column;
  }
`
const SuccessBox=styled.div`
  max-width:500px;
  width:100%;
  height:340px;
  background-color:#1CA3DE;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  border-radius:10px;
  display:flex;
  justify-content:Center;
  align-items:center;
  padding:10px;
  box-sizing:border-box;
`
const Text=styled.p`
  max-width:500px;
  width:100%;
  text-align:center;
  color:#fff;
  font-size:25px;
  line-height:2;
`


export default function Register() {
  const { register, handleSubmit,watch,getValues, reset, formState: { errors } } = useForm();
  const[success,setSuccess]=useState(false)

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
          setSuccess(true)
        } catch (err) {
          console.log(err);
        }
      };
      registerUser();       
  }
  const nav=useNavigate();
  useEffect(()=>{
    if(success){
      const timeoutId = setTimeout(() => {
        nav('/login'); 
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  },[success])
  
  return (
    <Container>
      <FormWraper>
      <Title>რეგისტრაცია</Title>
      <Form onSubmit={handleSubmit(handleClick)}>
        <InputWraper>
       <div style={{width:"240px",marginTop:25,paddingRight:10}}>
        <Label>სახელი</Label>
        <Input {...Name} 
        name='name' type='text'/>
        </div>
       <div style={{width:"240px",marginTop:25}}>
       <Label>გვარი</Label>
        <Input {...Lastname} 
        name='lastname'  type='text'/>
       </div>
       </InputWraper>
       <InputWraper>     
          <div style={{width:"240px",marginTop:25,paddingRight:10}}>
          <Label>მეილი</Label>
          <Input {...Email} 
          name='email' type='email'/>
          </div>
          <div style={{width:"240px",marginTop:25}}>
          <Label >პირადი ნომერი</Label>
          <Input {...Privatenumber} 
          name='privatenumber' type='number'/>
          </div>
          </InputWraper>   
          <InputWraper>
          <div style={{width:"240px",marginTop:25,paddingRight:10}}>
          <Label>პაროლი</Label>
          <Input {...Password} 
          name='password' type='password'/>
          </div>
          <div style={{width:"240px",marginTop:25}}>
          <Label>გაიმეორეთ პაროლი</Label>
          <Input {...Confirmpassword} 
          name='confirmpassword' type='password'/>
          </div>
          </InputWraper>          
       <div style={{display:'flex',justifyContent:'start'}}>
         <RadioWraper>
            <Label>მასწავლებელი</Label>
            <Radio {...Status} 
            name='status' value='მასწავლებელი' type='radio'/>
        </RadioWraper>
        <RadioWraper style={{marginLeft:10}}>
            <Label>მოსწავლე</Label>
            <Radio {...Status} 
            name='status' value='მოსწავლე' type='radio'/>
        </RadioWraper>
       </div>

        <Button  type='submit'>შესვლა</Button>
      </Form>
      </FormWraper>
      <Image/>
      {success?
      <SuccessBox>
        <Text>თქვენ წარმატებით გაიარეთ რეგისტრაცია, ვერიფიკაციის ლინკი გამოგზავნილია თქვენს იმეილზე</Text>
      </SuccessBox>
      :''}
    </Container>
  )
}
