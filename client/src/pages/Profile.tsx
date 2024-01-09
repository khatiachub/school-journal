import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useUser } from '../components/UserContext'
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { userRequest } from '../components/requestmethods';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


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
  height:auto;
  background-color:#fff;
  z-index: 10;
  border-radius:10px;
  position: relative;
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
  min-height:200px;
  background-color:#174978;
  border-radius:10px;
  margin: 0 auto;
  display:flex;
  padding:10px 10px 10px 30px;
  align-items:center;
  @media screen and (max-width:500px){
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding-left:0px;
  }
`

const Name=styled.h2`
  color:#fff;
  @media screen and (max-width:485px){
    font-size:17px;
  }
`
const Status=styled.p`
  color:#fff;
  margin-top:10px;
`
const Image=styled.img`
  width:120px;
  height:120px;
  object-fit:contain;
  border-radius:20px;
  @media screen and (max-width:500px){
    margin-top:20px;
  }
  @media screen and (max-width:485px){
    width:70px;
    height:80px;  }
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
@media screen and (max-width:485px) {
  font-size:14px;
}
`
const Number=styled.p`
 color:#c0bcbc;
`

const DeleteWindow=styled.div`
  max-width:400px;
  width:100%;
  min-height:200px;
  background-color:#fff;
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  border-radius:10px;
  color:#262626;
  text-align:Center;
  padding:30px;
  box-sizing:border-box;
  box-shadow: #cac5c5 2px 4px 8px ;
  top:30px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
`
const DeleteWraper=styled.div`
  margin-left:20px;
  @media screen and (max-width:500px){
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-left:0px;
  }
`
const Button=styled.button`
  min-width:100px;
  min-height:30px;
  color:#fff;
  padding:10px;
  background-color:#0790E8;
  border:none;
  border-radius:5px;
  display:flex;
  justify-content:center;
  align-items:Center;
  margin-top:10px;
  @media screen and (max-width:500px){
    margin-top:20px;
  }
`
const Buttons=styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;

`
const Close=styled.div`
`
const Text=styled.p`
  
`
const ImageWraper=styled.div`
 display:flex;
 flex-direction:column;
 @media screen and (max-width:500px){
    align-items:center;
  }
`
const NameWraper=styled.div`
@media screen and (max-width:500px){
    display:none;
}
`
const NameWraperResponsive=styled.div`
  display:none;
  @media screen and (max-width:500px){
    display:block;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:20px;
  }
`

interface Profile{
  name:string;
  lastname:string;
  email:string;
  privatenumber:number;
  status:string;
  image:string;
  verified:boolean
}
export default function Profile() {
  const{user}=useUser()
  const[userProfile,setUserProfile]=useState<Profile>({} as Profile)
  const ref = useRef<HTMLInputElement>(null);
  const onImageClick=()=>{
    if (ref.current) {
      ref.current.click();
    }  
  }
    
console.log(userProfile);

    useEffect(() => {
      async function getData() {
        try {
          if (user) {  // Check if user is defined
            const response = await userRequest.get(`/find/${user._id}`);
            setUserProfile(response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      getData();
    }, [user]); 
    
    const[image,setImage]=useState("")
    const uploadImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const files = e.target.files;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          setImage(reader.result as string);
        };
      }
    }
     
    const handleUpload=()=>{
      const formData = new FormData();
      formData.append('image', image);
      async function fetchData(){
        try{
        const response=await userRequest.put(`/${user?._id}`,formData,
        {
           headers:{Accept: "application/json, text/plain, */*",
           "Content-Type": "application/x-www-form-urlencoded"}
        }
        )
        console.log(response.data);
        window.location.reload()
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
    }
    
    const handleDelete=()=>{
      async function fetchData(){
        try{
        const response=await userRequest.delete(`/${user?._id}/image`)
        console.log(response.data);
        window.location.reload()
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
    }

    const[deleteUser,setDeleteUser]=useState(false)
    const deleteProfile=()=>{
      async function fetchData(){
        try{
        const response=await userRequest.delete(`/${user?._id}`)
        console.log(response.data);
        window.location.reload()
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
    }
    

    return (
      <ContainerWraper>
    <Container>
      <ProfileWraper>
        <ProfilePictureBox>
          <NameWraperResponsive>
            <Name>{userProfile?.name} {userProfile?.lastname}</Name>
            <Status>{userProfile?.status}</Status>
          </NameWraperResponsive>
          <ImageWraper >
          <input style={{display:'none'}} type='file' ref={ref} onChange={uploadImage} name='image'accept="image/*" />
          <Image onClick={onImageClick} src={image?image:userProfile?.image?userProfile?.image:'https://onlineschool.emis.ge/assets/images/pattern.png'}/>
          <Button  onClick={handleUpload}>ატვირთვა</Button>
          </ImageWraper>
          <DeleteWraper >
            <NameWraper>
                <Name>{userProfile?.name} {userProfile?.lastname}</Name>
                <Status>{userProfile?.status}</Status>
            </NameWraper>
            <Button onClick={handleDelete}>პროფილის სურათის წაშლა</Button>
            <Button style={{marginTop:'18px'}} onClick={()=>setDeleteUser(true)}>ანგარიშის წაშლა</Button>
            {deleteUser?
            <>
            <DeleteWindow>
              <Buttons>
              <Text style={{color:'#525151'}}>ნამდვილად გსურთ ანგარიშის წაშლა?</Text>
              <Close style={{color:'#525151'}} onClick={()=>setDeleteUser(false)}>
              <CloseOutlinedIcon/>
              </Close>
              </Buttons>
            <Buttons>
            <Button onClick={deleteProfile}>დიახ</Button>
            <Button onClick={()=>setDeleteUser(false)}>გაუქმება</Button>
            </Buttons>
            </DeleteWindow>
            </>
            :''
            }
          </DeleteWraper>
        </ProfilePictureBox>
        <Private>
          <Icon>
            <GppMaybeOutlinedIcon/>
          </Icon>
          <PrivateNumber>
            <Number>პირადი ნომერი</Number>
            <NumberValue>{userProfile?.privatenumber}</NumberValue>
          </PrivateNumber>
        </Private>
        <Private>
          <Icon>
            <MailOutlineOutlinedIcon/>
          </Icon>
          <PrivateNumber>
            <Number>ელ-ფოსტა</Number>
            <NumberValue>{userProfile?.email}</NumberValue>
          </PrivateNumber>
        </Private>
      </ProfileWraper>
    </Container>
    </ContainerWraper>
  )
}
