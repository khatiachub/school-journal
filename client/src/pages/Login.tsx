import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { publicRequest } from '../components/requestmethods';
import { useUser } from '../components/UserContext';
import { SyntheticEvent } from 'react'; // Import the SyntheticEvent type


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
  position: fixed;
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
  height:50px;
  border:1px solid #3317ad;
  border-radius:36px;
  margin-top:20px;
`
const Title=styled.h3`
  color:#fff;
  margin-left:50px;
  margin-top:20px;
`
const Form=styled.form`
  width:40%;
  display:flex;
  flex-direction:column;
`
const FormWraper=styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  width:40%;
`
const Container=styled.div`
   display:flex;
   background-color:#101291;
   height:100vh;
`
const TitleLink=styled(Link)`
   color:#fff;
   margin-top:20px;
   margin-left:50px;
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
  const loginUser = async (users:LoginFormValues) => {
    try {
      const res = await publicRequest.post("/signin",users);
      console.log(res.data);
      login(res.data)
      console.log(user);
      
    } catch (err) {
      console.log(err);
    }
  };
  const nav=useNavigate()
  const handleClick=(e:SyntheticEvent)=>{
    e.preventDefault();
    loginUser({email,password});
    nav("/")
  }
  return (
    <Container>
      <FormWraper>
      <Title>შესვლა</Title>
      <Form >
        <Input {...Email} name='email' type='email' placeholder='email'/>
        <Input {...Password} name='password' type='password' placeholder='password'/>
        <Button onClick={(e)=>handleClick(e)}>შესვლა</Button>
      </Form>
      <TitleLink to={'/'}>პაროლის აღდგენა</TitleLink>
      </FormWraper>
      <Image/>
    </Container>
  )
}
