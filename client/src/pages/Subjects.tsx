import React, { useEffect, useState } from 'react'
import { subjects } from '../components/data'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useUser } from '../components/UserContext';
import { publicRequest, userRequest } from '../components/requestmethods';


const SubjectBox=styled.div`
   width:350px;
   height:170px;
   margin-top:30px;
   border-radius:10px;
   padding:20px;
   margin-left:10px;
   &:nth-child(1){
    background-color:#3190C5;
   }
   &:nth-child(2){
    background-color:#60B7DE;
   }
   &:nth-child(3){
    background-color:#87CEEB;
   }&:nth-child(4){
    background-color:#B0E1F9;
   }&:nth-child(5){
    background-color:#5CD1FA;
   }&:nth-child(6){
    background-color:#01BFFF;
   }&:nth-child(7){
    background-color:#697FBD;
   }
   &:nth-child(8){
    background-color:#697FBD;
   }

   @media screen and (max-width:1400px) {
    margin-left:0px;
  }
  @media screen and (max-width:1318px) {
    width:400px;
  }
  @media screen and (max-width:1081px) {
    width:300px;
  }
  @media screen and (max-width:886px) {
    width:550px;
  }
`
const SubjectsDiv=styled.div`
  display:flex;
  justify-content:space-between;
  width:90.8%;
  flex-wrap:wrap;
  box-sizing:border-box;
  margin-top:10vh;
  @media screen and (max-width:1200px) {
    width:85%;
  }
  @media screen and (max-width:886px) {
    width:100%;
    justify-content:center;
    padding:10px;
  }
`
const ContentDiv=styled.div`
  width:137px;
  height:100vh;
  @media screen and (max-width:768px) {
    display:none;
  }
`
const Container=styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  padding-right:14px;
  box-sizing:border-box;
  @media screen and (min-width:1600px) {
    padding-right:31px;
  }
  @media screen and (max-width:1200px) {
    padding-right:20px;
  }
  @media screen and (max-width:1065px) {
    padding-right:15px;
  }
  @media screen and (max-width:886px) {
    padding-right:0px;
  }
`
const LinkSubject=styled.div`
  text-decoration:none;
  color:#fff;
  font-size:22px;
`
const Text=styled.p`
  color:#fff;
  font-size:14px;
  width:80px;
`
const GradeWraper=styled.div`
  display:flex;
  justify-content:space-between;
  width:90%;
`
const SubjectWrap=styled.div`
  display:flex;
  justify-content:space-between;
`
const Arrow=styled.div`
  width:30px;
  height:30px;
  border-radius:5px;
  display:flex;
  justify-content:center;
  align-items:center;
  color:#fff;
  padding:5px;
  background-color:#bbb2b2;
`
const Teacher=styled.div`
  width:90%;
  border:1px solid #fff;
  border-radius:10px;
  margin-top:15px;
  padding:15px;
`
const TeacherWraper=styled.div`
  width:100%;
  height:50px;
  background-color:#e0dada;
  border-radius:10px;
  margin-top:40px;
  padding:20px;
  color:#fff;
`
const BackArrow=styled.div`
    width:100%;
    margin:0 auto;
    height:50px;
    background-color: #fdfbfb;
    margin-top:30px;
    color:#494747;
    border-radius:10px;
    display:flex;
    align-items:center;
    padding-left:10px;
    box-sizing:border-box;
`

export default function Subjects() {
  
  const getRandomColor = () => {
    let color;
    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (color === '#ffffff'); // Keep generating until a non-white color is obtained
    return color;
  };
    const nav=useNavigate()
    const handleClick=()=>{
        nav('/')
    }
    const[id,setId]=useState([])
  const{user}=useUser()
  console.log(user);
  
  useEffect(()=>{
    async function fetchData(){
        try{
        const response=await userRequest.get('/grade')
        setId(response.data);  
                  
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
  },[])

    const filteredId=id.filter((id:Student)=>(id.privatenumber==user?.privatenumber))
  const filteredSubject=filteredId&&filteredId.map((id)=>(id.subjects.filter((subject)=>(subject.subject===params.sub))))
  console.log(filteredSubject);
  
  return (
    <Container >
      <ContentDiv></ContentDiv>
    <SubjectsDiv>
      {/* <TeacherWraper> */}
      {/* <BackArrow onClick={handleClick}>
            <ArrowBackIosOutlinedIcon/>
            დამრიგებელი:
      </BackArrow> */}
      {/* </TeacherWraper> */}
      {subjects.map((subject,i)=>(
        <SubjectBox key={i} >
          <SubjectWrap>
            <LinkSubject >{subject.subject}</LinkSubject>
            <Link to={`/subjects/${subject.subject}`}>
            <Arrow >
            <ArrowForwardIosOutlinedIcon/>
            </Arrow>
            </Link>
          </SubjectWrap>
            <Teacher>
            <Text>მასწავლებელი:</Text>
            </Teacher>
            <GradeWraper>
            <Text>მიმდინარე სემესტრის შეფასება:
            {filteredSubject&&filteredSubject.map((subject)=>(subject.map((subject:Subject)=>(subject.grades.map((grade)=>(
               <div>
               <p>{grade.grade}9</p>
               </div>
            ))))))}
            </Text>
            <Text>დასწრება:</Text>
            <Text>წლიური შეფასება:</Text>
            </GradeWraper>
        </SubjectBox>
      ))}
    </SubjectsDiv>
    </Container>
  )
}
