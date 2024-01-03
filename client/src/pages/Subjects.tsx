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
`
const SubjectsDiv=styled.div`
  display:flex;
  justify-content:space-between;
  width:95%;
  flex-wrap:wrap;
  margin:0 auto;
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
  
  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
    <SubjectsDiv>
      {/* <TeacherWraper> */}
      <BackArrow onClick={handleClick}>
            <ArrowBackIosOutlinedIcon/>
            დამრიგებელი:
      </BackArrow>
      {/* </TeacherWraper> */}
      {subjects.map((subject,i)=>(
        <SubjectBox key={i} style={{backgroundColor:getRandomColor()}}>
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
  )
}
