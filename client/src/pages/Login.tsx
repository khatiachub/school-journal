import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { publicRequest } from '../components/requestmethods';
import { useUser } from '../components/UserContext';
import { SyntheticEvent, useEffect } from 'react'; // Import the SyntheticEvent type


const Image = styled.div`
  width: 60%;
  min-height:100vh;
  background:url("https://onlineschool.emis.ge/assets/svg_icons/art-board.svg#Layer_1");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: end;
  background-position:left;
  @media screen and (max-width:920px) {
    display:none
  }
`;
const Input=styled.input`
  width:300px;
  height:50px;
  outline:none;
  border:1px solid #3317ad;
  border-radius:36px;
  margin-top:30px;
`
const Button=styled.button`
  width:300px;
  margin-top:20px;
  color:#fff;
  font-size:20px;
  height:50px;
  border:1px solid #5e94fa;
  border-radius:36px;
  margin-top:20px;
  background-color:#5e94fa;
`
const Title=styled.h3`
  color:#fff;
  margin-top:20px;
`
const Form=styled.form`
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const FormWraper=styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  width:40%;  
  min-height:100vh;
  @media screen and (max-width:920px) {
    width:100%;
  }`
const Container=styled.div`
   display:flex;
   background-color:#003A6B;
   min-height:100vh;
   width:100%;
   @media screen and (max-width:920px) {
    justify-content:center;
  }
`
const TitleLink=styled(Link)`
   color:#fff;
   margin-top:20px;
`
export default function Login() {
  const { register, handleSubmit,watch,getValues, reset, formState: { errors } } = useForm();
  const{login,user}=useUser()
  const email=watch("email") as string
  const password=watch("password") as string
  
  const Email=register('email',{required:true})
  const Password=register('password',{required:true})
  interface LoginFormValues {
    email: string;
    password: string;
  }
  
  const nav=useNavigate()
  const loginUser = async (users:LoginFormValues) => {
    try {
      const res = await publicRequest.post("/signin",users);
      console.log(res.data);
      login(res.data)
      nav("/")
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick=()=>{
    loginUser({email,password});
    
  }


  
  return (
    <Container>
      <FormWraper>
      <Title>შესვლა</Title>
      <Form onSubmit={handleSubmit(handleClick)}>
        <Input {...Email} name='email' type='email' placeholder='email'/>
        <Input {...Password} name='password' type='password' placeholder='password'/>
        <Button type='submit'>შესვლა</Button>
      </Form>
      <TitleLink to={'/recoverpassword'}>პაროლის აღდგენა</TitleLink>
      <TitleLink to={'/register'}>არ გაქვს ანგარიში? დარეგისტრირდი</TitleLink>
      </FormWraper>
      <Image/>
    </Container>
  )
}
